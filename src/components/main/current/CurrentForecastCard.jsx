import React from "react";

const CurrentForecastCard = ({ label, value, loading }) => {
  return (
    <div
      className={`p-4 w-full bg-primary rounded-lg flex flex-col justify-between gap-3 ${
        loading && "animate-pulse"
      }`}
    >
      <p className="text-gray-400 font-semibold text-xs">{label}</p>
      <p className="text-xl font-light">{!loading && value ? value : "-"}</p>
    </div>
  );
};

export default CurrentForecastCard;
