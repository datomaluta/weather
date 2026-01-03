import { useEffect, useState } from "react";
import useUserLocation from "../../hooks/useUserLocation";
import { getFormatDateLong } from "../../utils/dates";
import { weatherIconMap } from "../../data/weatherCodes";
import { useUnit } from "../../context/UnitContext";
import Search from "./search/Search";
import { groupHourlyByDay } from "../../utils/groupHourlyByDays";
import Heading from "../Heading/Heading";
import Error from "../ui/Error";
import CurrentStats from "./current/CurrentStats";
import DailyForecast from "./daily/DailyForecast";
import Hourly from "./hourly/Hourly";
import Today from "./today/Today";
import TodayLoader from "./today/TodayLoader";
import Loader from "../ui/Loader";

const Main = () => {
  const {
    coords,
    loading: locationLoading,
    error: locationError,
  } = useUserLocation();
  const { unit } = useUnit();

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [place, setPlace] = useState();
  const [loading, setLoading] = useState(false);
  const [chosenSearchedLocation, setChosenSearchedLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!coords) return;
      try {
        setLoading(true);
        setError(false);

        const latitude = chosenSearchedLocation?.lat ?? coords.lat;
        const longitude = chosenSearchedLocation?.lon ?? coords.lon;

        const unitParams =
          unit === "imperial"
            ? "&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch"
            : "&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm";

        const [weatherRes, placeRes] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=7&timezone=auto${unitParams}`
          ),
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          ),
        ]);

        const weatherData = await weatherRes.json();
        const placeData = await placeRes.json();

        const dailyForecast = weatherData?.daily?.time.map((date, index) => ({
          date,
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[index]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[index]),
          icon:
            weatherIconMap[weatherData.daily.weathercode[index]] ?? "unknown",
        }));

        const hourlyByDay = groupHourlyByDay(weatherData.hourly);

        setData({
          current: {
            currentTemperature: Math.round(weatherData.current.temperature_2m),
            feelsLike: Math.round(weatherData.current.apparent_temperature),
            windSpeed: Math.round(weatherData.current.wind_speed_10m),
            windSpeedUnit: weatherData.current_units.wind_speed_10m,
            precipitation: Math.round(weatherData.current.precipitation),
            precipitationUnit: weatherData.current_units.precipitation,
            humidity: weatherData.current.relative_humidity_2m,
            date: getFormatDateLong(weatherData.current.time),
            icon: weatherIconMap[weatherData.current.weathercode] ?? "unknown",
          },
          daily: dailyForecast,
          hourly: hourlyByDay,
        });

        setPlace({
          city: placeData?.address?.city,
          country: placeData?.address?.country,
        });
      } catch (error) {
        console.log(error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coords, unit, chosenSearchedLocation]);

  const handleChooseLocation = (location) => {
    setChosenSearchedLocation(location);
  };

  const isInitialLoading = locationLoading;
  const isFetchingData = loading;
  const hasError = !!error || !!locationError;

  return (
    <div>
      {/* ERROR */}
      {hasError && <Error />}

      {/* HEADER + SEARCH (only when no error) */}
      {!hasError && (
        <>
          <Heading />
          <Search onLocationChoose={handleChooseLocation} />
        </>
      )}

      {/* LOCATION LOADING */}
      {isInitialLoading && <Loader />}

      {/* MAIN CONTENT */}
      {!hasError && !isInitialLoading && (
        <div className="flex flex-col sm:flex-row mt-6 gap-6 max-w-325 mx-auto">
          {/* LEFT */}
          <div className="sm:w-[70%] w-full">
            {/* TODAY CARD */}
            {isFetchingData ? (
              <TodayLoader />
            ) : (
              <Today data={data} place={place} />
            )}

            {/* CURRENT STATS */}
            <CurrentStats data={data} loading={isFetchingData} />

            {/* DAILY */}
            <DailyForecast data={data} loading={isFetchingData} />
          </div>

          {/* RIGHT — HOURLY */}
          <Hourly data={data} loading={isFetchingData} />
        </div>
      )}
    </div>
  );
};

export default Main;
