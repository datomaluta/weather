import React from "react";
import CurrentForecastCard from "./CurrentForecastCard";

const CurrentStats = ({ data, loading }) => {
  return (
    <div className="sm:flex grid grid-cols-2 mt-8 gap-5">
      <CurrentForecastCard
        label="Feels Like"
        value={`${data?.current.feelsLike}°`}
        loading={loading}
      />
      <CurrentForecastCard
        label="Humidity"
        value={data?.current.humidity}
        loading={loading}
      />
      <CurrentForecastCard
        label="Wind"
        value={`${data?.current.windSpeed} ${data?.current.windSpeedUnit}`}
        loading={loading}
      />
      <CurrentForecastCard
        label="Precipitation"
        value={`${data?.current.precipitation} ${data?.current.precipitationUnit}`}
        loading={loading}
      />
    </div>
  );
};

export default CurrentStats;
