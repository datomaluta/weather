import React, { useEffect, useState } from "react";
import iconDropdown from "../../../assets/images/icon-dropdown.svg";
import { getDayName } from "../../../utils/dates";
import iconCheckmark from "../../../assets/images/icon-checkmark.svg";
import HourlyForecastCard from "./HourlyForecastCard";

const Hourly = ({ data, loading }) => {
  const [hourlyDropdownIsOpen, setHourlyDropdownIsOpen] = useState(false);
  const [chosenDayForHourly, setChosenDayForHourly] = useState();

  // set first day for hourly forecast
  useEffect(() => {
    if (data?.daily) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChosenDayForHourly(data?.daily[0]?.date);
    }
  }, [data?.daily]);

  return (
    <div className="bg-primary rounded-lg p-3 flex-1">
      <div className="flex justify-between items-center">
        <p>Hourly Forecast</p>
        <div className="relative">
          <button
            className="bg-secondary px-4 py-2 rounded-lg flex items-center gap-3 cursor-pointer"
            onClick={() =>
              setHourlyDropdownIsOpen((currentState) => !currentState)
            }
          >
            {chosenDayForHourly ? getDayName(chosenDayForHourly, "long") : "-"}
            <img
              src={iconDropdown}
              alt="dropdown"
              className={`${
                hourlyDropdownIsOpen ? "rotate-180" : ""
              } transition-all`}
            />
          </button>
          {hourlyDropdownIsOpen && (
            <div className="bg-secondary absolute shadow-2xl top-0 translate-y-11.25 right-0 w-50 rounded-lg  flex flex-col items-start gap-2 p-2">
              {data?.daily?.map((item, index) => {
                const isActive = item.date === chosenDayForHourly;
                return (
                  <button
                    key={index}
                    className={`${
                      isActive ? "bg-primary" : ""
                    } w-full text-left p-2 rounded-lg hover:bg-primary transition-all duration-300 cursor-pointer flex justify-between items-center`}
                    onClick={() => setChosenDayForHourly(item.date)}
                  >
                    {getDayName(item.date, "long")}
                    {isActive && <img src={iconCheckmark} alt="check" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 max-h-132.5 overflow-y-auto mt-4">
        {Array.from({ length: 24 })?.map((_, index) => (
          <HourlyForecastCard
            key={index}
            data={data?.hourly?.[chosenDayForHourly]?.[index]}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default Hourly;
