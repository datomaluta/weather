import { useEffect, useState } from "react";
import useUserLocation from "../../hooks/useUserLocation";
import { getFormatDateLong } from "../../utils/dates";
import { weatherIconMap } from "../../data/weatherCodes";
import { useUnit } from "../../context/UnitContext";
import Search from "./search/Search";
import { groupHourlyByDay } from "../../utils/groupHourlyByDays";
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
    status: locationStatus,
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
        setError(
          " We couldn't connect to the server (API error). Please try again in a few moments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coords, unit, chosenSearchedLocation]);

  const handleChooseLocation = (location) => {
    setChosenSearchedLocation(location);
  };

  const locationLoading = locationStatus === "loading";
  const locationReady = locationStatus === "success";
  const locationFailed = locationStatus === "error";

  const apiLoading = loading;
  const apiFailed = !!error;

  const hasBlockingError = locationFailed || apiFailed;

  return (
    <div>
      {/* LOCATION LOADING (nothing else renders) */}
      {locationLoading && <Loader />}

      {/* LOCATION / API ERROR (nothing else renders) */}
      {hasBlockingError && <Error message={error ?? locationError} />}

      {/*  MAIN APP (ONLY after location success) */}
      {locationReady && !hasBlockingError && (
        <>
          {/* HEADER + SEARCH */}
          <h1 className="text-4xl sm:text-5xl font-bold font-bricolage mx-auto mt-16 sm:mt-12 flex justify-center text-center">
            How&apos;s the sky looking today?
          </h1>

          <Search onLocationChoose={handleChooseLocation} />

          {/* CONTENT */}
          <div className="flex flex-col sm:flex-row mt-6 gap-6 max-w-325 mx-auto">
            {/* LEFT */}
            <div className="sm:w-[70%] w-full">
              {/* TODAY */}
              {apiLoading || !data ? (
                <TodayLoader />
              ) : (
                <Today data={data} place={place} />
              )}

              {/* CURRENT STATS */}
              <CurrentStats data={data} loading={apiLoading || !data} />

              {/* DAILY */}
              <DailyForecast data={data} loading={apiLoading || !data} />
            </div>

            {/* RIGHT */}
            <Hourly data={data} loading={apiLoading || !data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
