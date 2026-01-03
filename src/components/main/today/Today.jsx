import React from "react";
import { weatherIcons } from "../../../data/weatherCodes";

const Today = ({ data, place }) => {
  return (
    <div className="bg-black p-8 sm:bg-[url(/src/assets/images/bg-today-large.svg)] bg-[url(/src/assets/images/bg-today-small.svg)] bg-cover bg-no-repeat bg-center h-71.5 flex sm:justify-between justify-evenly items-center rounded-xl flex-col sm:flex-row">
      <div>
        <p className="text-2xl font-bold">
          {place?.city}
          {place?.city && ","} {place?.country}
        </p>
        <p className="text-gray-300 mt-2">{data?.current?.date}</p>
      </div>

      <div className="flex items-center gap-4">
        <img
          src={weatherIcons[data?.current?.icon]}
          alt="weathericon"
          className="h-24"
        />
        <p className="text-7xl italic font-bold">
          {data?.current?.currentTemperature}°
        </p>
      </div>
    </div>
  );
};

export default Today;
