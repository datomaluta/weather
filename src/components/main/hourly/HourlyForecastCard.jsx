
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
            <div className="h-8 flex justify-center">
              <img
                src={weatherIcons[data.icon]}
                alt="icon"
                className="h-full w-fit"
              />
            </div>
            <p>{formatToAmPm(data.time)}</p>
          </div>
          <p>{data.temp}°</p>
        </>
      ) : (
        <p className="h-8"></p>
      )}
    </div>
  );
};

export default HourlyForecastCard;
