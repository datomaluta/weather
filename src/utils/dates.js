export function getFormatDateLong(date) {
  const newDate = new Date(date);
  const options = {
    weekday: "long", // Tuesday
    month: "short", // Aug
    day: "numeric", // 5
    year: "numeric", // 2025
  };

  return newDate.toLocaleDateString("en-US", options);
}

export function getDayName(dateString, format = "short") {
  return new Date(dateString).toLocaleDateString("en-US", { weekday: format });
}

export function formatToAmPm(time24) {
  const [hourStr] = time24.split(":");
  let hour = Number(hourStr);

  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if (hour === 0) hour = 12;

  return `${hour} ${period}`;
}
