import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
  appendEl,
} from "./components.js";
import { convertTimeToHours } from "./utils.js";

// Get the 8 hour interval from the current time of selected date
function getEightHourForecast() {
  const selectedDate = new Date();
  const hour = convertTimeToHours(selectedDate);
  const start = hour + 1;
  const end = hour + 8;
  return { start, end };
}

// Create the hourly cards for selected date in a 8 hour interval (starting from the next hour)
function renderHourlyCards(dayWeatherCard, weatherData) {
  const hours = getEightHourForecast();
  const forecastArr = weatherData.forecast.forecastday;
  let dayWeatherCardIndex = parseInt(dayWeatherCard.dataset.index);
  let dayWeatherCardIndexUpdated = false;
  for (let i = hours.start; i <= hours.end; i++) {
    let hour = i;
    // If hour is more than 24, dayWeatherIndex will increase by 1 and hours will become hour % 24(for the next day)
    if (i >= 24) {
      hour = hour % 24;
      if (!dayWeatherCardIndexUpdated) {
        dayWeatherCardIndexUpdated = true;
        dayWeatherCardIndex++;
      }
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

function renderDayWeatherCards(weatherData, parsedData) {
  const dayWeatherCards = [];
  const forecastArr = weatherData.forecast.forecastday;
  forecastArr.forEach((forecastDay) => {
    const dayWeatherCard = createDayWeatherCard(
      forecastDay.date,
      null,
      null,
      parsedData.condition.icon,
      forecastDay.day.mintemp_f,
      forecastDay.day.mintemp_c,
      forecastDay.day.maxtemp_f,
      forecastDay.day.maxtemp_c
    );
    dayWeatherCard.createCard();
    dayWeatherCards.push(dayWeatherCard);
  });
}

function clearForecastContainer() {
  const forecastContainer = document.querySelector(".forecast-container");
  forecastContainer.innerHTML = "";
}

export { renderDayWeatherCards, renderHourlyCards, clearForecastContainer };
