import { createContext, useContext, useState, useEffect } from "react";

const UnitContext = createContext(null);

export const UnitProvider = ({ children }) => {
  const [unit, setUnit] = useState("metric"); // "metric" | "imperial"

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  // OPTIONAL: persist unit
  useEffect(() => {
    const savedUnit = localStorage.getItem("unit");
    if (savedUnit) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUnit(savedUnit);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("unit", unit);
  }, [unit]);

  return (
    <UnitContext.Provider value={{ unit, toggleUnit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error("useUnit must be used inside UnitProvider");
  }
  return context;
};
