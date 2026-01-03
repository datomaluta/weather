import React from "react";
import DailyForecastCard from "./DailyForecastCard";

const DailyForecast = ({ data, loading }) => {
  return (
    <div className="mt-6">
      <p className="mb-2">Daily Forecast</p>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 7 }).map((_, index) => (
          <DailyForecastCard
            key={index}
            dailyData={data?.daily[index]}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
