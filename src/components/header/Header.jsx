import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import iconUnits from "../../assets/images/icon-units.svg";
import iconDropdown from "../../assets/images/icon-dropdown.svg";
import UnitToggle from "./UnitToggle";
import { useUnit } from "../../context/UnitContext";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { unit, toggleUnit } = useUnit();

  return (
    <header className="max-w-[1300px] w-full flex mx-auto items-center justify-between bg-midnight">
      <div>
        <img src={logo} alt="logo" className="w-36 sm:w-auto" />
      </div>
      <div
        className="relative"
        onClick={() => setIsDropdownOpen((currentState) => !currentState)}
      >
        <button className="bg-primary px-4 py-2 rounded-lg flex items-center gap-3 cursor-pointer ">
          <img
            src={iconUnits}
            alt="iconUnits"
            className={`${
              isDropdownOpen ? "rotate-180" : ""
            } transition-all duration-700`}
          />
          Units
          <img
            src={iconDropdown}
            alt="dropdown"
            className={`${isDropdownOpen ? "rotate-180" : ""} transition-all`}
          />
        </button>
        {isDropdownOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-primary absolute top-0 translate-y-[50px] right-0 w-[250px] rounded-lg p-2 z-10"
          >
            <button
              className="px-2 py-2 cursor-pointer hover:bg-secondary w-full rounded-lg text-left transition-all focus:outline-gray-400 focus:outline"
              onClick={() => toggleUnit()}
            >
              Switch to {unit === "metric" ? "Imperial" : "Metric"}
            </button>

            <UnitToggle
              label={"Temperature"}
              unit={unit}
              unitLabelFirst={"Celsius (°C)"}
              unitLabelSecond={"Fahrenheit (°F)"}
            />

            <UnitToggle
              label={"Wind Speed"}
              unit={unit}
              unitLabelFirst={"km/h"}
              unitLabelSecond={"mph"}
            />

            <UnitToggle
              label={"Precipitation"}
              unit={unit}
              unitLabelFirst={"Milimeters (mm)"}
              unitLabelSecond={"Inches (in)"}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
