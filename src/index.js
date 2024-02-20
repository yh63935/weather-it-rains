import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";
// import { renderDayWeatherCards } from "./renderCards.js";
import { convertAmPm } from "./utils.js";

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

getEightHourForecast();

// Create the hourly cards for each day in a 8 hour interval (starting from the next hour)
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

async function initialize() {
  // renderDayWeatherCards();
  const weatherData = await getWeatherData();
  const parsedData = parseWeatherData(weatherData);

  const forecastArr = weatherData.forecast.forecastday;
  // const card1 = createCurrentWeatherCard(
  //   parsedData.time,
  //   parsedData.currentTemp.far,
  //   parsedData.currentTemp.cels,
  //   parsedData.condition.icon,
  //   parsedData.location,
  //   parsedData.condition.text,
  //   parsedData.feelsLike.far,
  //   parsedData.feelsLike.cels,
  //   parsedData.humidity,
  //   forecastArr[0].day.daily_chance_of_rain,
  //   parsedData.wind.mi,
  //   parsedData.wind.km
  // );
  // card1.createCard();

  const dayCard = createDayWeatherCard(
    forecastArr[0].date,
    null,
    null,
    parsedData.condition.icon,
    forecastArr[0].day.mintemp_f,
    forecastArr[0].day.mintemp_c,
    forecastArr[0].day.maxtemp_f,
    forecastArr[0].day.maxtemp_c
  );
  dayCard.createCard();
  createHourlyCards(dayCard, weatherData);

  // const hourCard = createHourlyWeatherCard(
  //   forecastArr[0].hour[0].time,
  //   forecastArr[0].hour[0].temp_f,
  //   forecastArr[0].hour[0].temp_c,
  //   forecastArr[0].hour[0].condition.icon
  // );
  // hourCard.createCard();
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    card1.toggleImperialMetric();
    dayCard.toggleImperialMetric();
    hourCard.toggleImperialMetric();
  });
}

initialize();

// Will need to replace with indexes after
// Replace with the variables for day (accept variable in case they decide to upgrade to paid weather with extra days)

for (let i = 0; i < forecastArr.length; i++) {
  const forecastDay = forecastArr[i];
  console.log(forecastDay.day.maxtemp_c);
  console.log(forecastDay.day.maxtemp_f);
  console.log(forecastDay.day.mintemp_c);
  console.log(forecastDay.day.mintemp_f);

  console.log(forecastDay.day.daily_chance_of_rain);
  console.log(forecastDay.day.daily_chance_of_snow);

  console.log(forecastDay.day.condition.text);
  console.log(forecastDay.day.condition.icon);
  console.log("hours arr" + forecastDay.hour.length);
}

for (let j = 0; j < forecastArr[0].hour.length; j++) {
  console.log(j, forecastArr[0].hour[j].temp_c);
  console.log(j, forecastArr[0].hour[j].temp_f);
  console.log(j, forecastArr[0].hour[j].is_day);
}
