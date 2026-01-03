import { weatherIconMap } from "../data/weatherCodes";

/**
 * Groups hourly forecast data by day
 * @param {Object} hourly - hourly forecast data from Open-Meteo API
 * @returns {Object} - an object where each key is a date (YYYY-MM-DD) and the value is an array of hourly forecast objects
 * @example
 * const hourlyForecast = {
 *   time: ["2022-07-25T09:00", "2022-07-25T10:00", ...],
 *   temperature_2m: [22, 23, ...],
 *   weathercode: [0, 1, ...],
 * }
 * const groupedHourly = groupHourlyByDay(hourlyForecast);
 * console.log(groupedHourly);
 * // Output:
 * // {
 * //   "2022-07-25": [
 * //     { time: "09:00", temp: 22, weatherCode: 0, icon: "sunny" },
 * //     { time: "10:00", temp: 23, weatherCode: 1, icon: "partly-cloudy" },
 * //     ...
 * //   ]
 * // }
 */
export const groupHourlyByDay = (hourly) => {
  return hourly.time.reduce((acc, time, index) => {
    const day = time.split("T")[0]; // YYYY-MM-DD

    if (!acc[day]) acc[day] = [];

    acc[day].push({
      time: time.split("T")[1], // HH:mm
      temp: Math.round(hourly.temperature_2m[index]),
      weatherCode: hourly.weathercode[index],
      icon: weatherIconMap[hourly.weathercode[index]] ?? "unknown",
    });

    return acc;
  }, {});
};
