import { createHourlyWeatherCard } from "./components.js";
// Convert the hours of a date to am or pm
function convertAmPm(time, withMinutes) {
  const formattedHrsMin = withMinutes
    ? time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : time.toLocaleTimeString([], { hour: "numeric" });
  return formattedHrsMin;
}
// Determine appropriate labels for imperial/metric system
function determineImperialMetricLabel(label) {
  switch (label) {
    case "f":
      return "°F";
    case "c":
      return "°C";
    case "mi":
      return "mi/h";
    case "km":
      return "km/h";
  }
}
// Add appropriate labels to elements displayed
function addLabel(unit, label) {
  if (determineImperialMetricLabel(label)) {
    label = determineImperialMetricLabel(label);
  }
  return `${unit} ${label}`;
}

// Convert time to hours
function convertTimeToHours(time) {
  const hour = new Date(time).getHours();
  return hour;
}

// Get the 8 hour interval from the current time of selected date
function getEightHourForecast() {
  const selectedDate = new Date();
  const hour = convertTimeToHours(selectedDate);
  console.log("hour", hour);
  const start = hour + 1;
  const end = hour + 8;
  console.log("start", start);
  console.log("end", end);
  return { start, end };
}

// Create the hourly cards for selected date in a 8 hour interval (starting from the next hour)
function createHourlyCards(dayWeatherCard, weatherData) {
  const hours = getEightHourForecast();
  const forecastArr = weatherData.forecast.forecastday;
  let dayWeatherCardIndex = parseInt(
    dayWeatherCard.cardContainer.dataset.index
  );
  console.log(dayWeatherCardIndex);
  let dayWeatherCardIndexUpdated = false;
  for (let i = hours.start; i <= hours.end; i++) {
    let hour = i;
    console.log("hour of the day:", hour);
    // If hour is more than 24, dayWeatherIndex will increase by 1 and hours will become hour % 24(for the next day)
    if (i >= 24) {
      hour = hour % 24;
      console.log("hour of the day if greater than 24:", hour);
      if (!dayWeatherCardIndexUpdated) {
        dayWeatherCardIndexUpdated = true;
        dayWeatherCardIndex++;
      }
      console.log(
        "dayWeatherCardIndex if greater than 24: ",
        dayWeatherCardIndex
      );
    }
    const hourlyWeatherCard = createHourlyWeatherCard(
      forecastArr[dayWeatherCardIndex].hour[hour].time,
      forecastArr[dayWeatherCardIndex].hour[hour].temp_f,
      forecastArr[dayWeatherCardIndex].hour[hour].temp_c,
      forecastArr[dayWeatherCardIndex].hour[hour].condition.icon
    );
    hourlyWeatherCard.createCard();
  }
}

export { convertAmPm, addLabel, createHourlyCards };
