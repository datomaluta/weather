import React from "react";
import iconLoading from "../../../assets/images/icon-loading.svg";

const TodayLoader = () => {
  return (
    <div className="h-71.5 bg-primary flex justify-center items-center flex-col gap-2 rounded-xl animate-pulse">
      <img src={iconLoading} alt="loading" className="animate-spin h-6" />
      <p className="text-md">Loading weather...</p>
    </div>
  );
};

export default TodayLoader;
