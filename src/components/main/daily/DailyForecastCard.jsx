import React from "react";
import { getDayName } from "../../../utils/dates";
import { weatherIcons } from "../../../data/weatherCodes";

const DailyForecastCard = ({ dailyData, loading }) => {
  return (
    <div
      className={`bg-primary p-3 flex flex-col gap-2 rounded-lg items-center   ${
        loading && "h-36.5 animate-pulse"
      }`}
    >
      {dailyData && !loading && (
        <>
          <p>{getDayName(dailyData.date)}</p>
          <div className="h-16 flex justify-center">
            <img
              src={weatherIcons[dailyData.icon]}
              alt="icon"
              className="object-contain h-full"
            />
          </div>
          <div className="flex justify-between w-full">
            <p>{dailyData.maxTemp}°</p>
            <p>{dailyData.minTemp}°</p>
          </div>
        </>
      )}
    </div>
  );
};

export default DailyForecastCard;
