import iconCheckmark from "../../assets/images/icon-checkmark.svg";
const UnitToggle = ({ label, unit, unitLabelFirst, unitLabelSecond }) => {
  return (
    <div className="flex flex-col mt-3 border-b pb-3 border-gray-600 last:pb-0 last:border-none">
      <p className="text-gray-400 text-sm font-semibold px-3 mb-1">{label}</p>
      <p
        className={`${
          unit === "metric" ? "bg-[#2f2f49]" : ""
        } p-2 transition-all flex items-center justify-between rounded-lg`}
      >
        <span>{unitLabelFirst}</span>
        {unit === "metric" && <img src={iconCheckmark} alt="check" />}
      </p>
      <p
        className={`${
          unit === "imperial" ? "bg-[#2f2f49]" : ""
        } p-2 transition-all flex items-center justify-between rounded-lg`}
      >
        <span>{unitLabelSecond}</span>
        {unit === "imperial" && <img src={iconCheckmark} alt="check" />}
      </p>
    </div>
  );
};

export default UnitToggle;
