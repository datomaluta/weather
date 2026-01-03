import { formatToAmPm } from "../../../utils/dates";
import { weatherIcons } from "../../../data/weatherCodes";

const HourlyForecastCard = ({ data, loading }) => {
  return (
    <div
      className={`bg-secondary rounded-lg flex justify-between p-2 items-center ${
        loading && "animate-pulse"
      }`}
    >
      {data && !loading ? (
        <>
          <div className="flex items-center gap-1">
            <div className="h-8 w-8">
              <img
                src={weatherIcons[data.icon]}
                alt="icon"
                className="h-full w-full object-contain"
              />
            </div>
            <p>{formatToAmPm(data.time)}</p>
          </div>
          <p className="shrink-0">{data.temp}°</p>
        </>
      ) : (
        <p className="h-8"></p>
      )}
    </div>
  );
};

export default HourlyForecastCard;
