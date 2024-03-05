import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";
import { convertTimeToHours, clearContainer } from "./utils.js";

const dayWeatherCards = [];
const hourlyWeatherCards = [];

// Get the 8 hour interval from the current time of selected date
function getEightHourForecast() {
  const selectedDate = new Date();
  const hour = convertTimeToHours(selectedDate);
  const start = hour + 1;
  const end = hour + 8;
  return { start, end };
}

// Render current weather card
function renderCurrentWeatherCard(forecastArr, parsedData) {
  // Create current weather card
  const currentWeatherCard = createCurrentWeatherCard(
    parsedData.time,
    parsedData.currentTemp.far,
    parsedData.currentTemp.cels,
    parsedData.condition.icon,
    parsedData.location,
    parsedData.condition.text,
    parsedData.feelsLike.far,
    parsedData.feelsLike.cels,
    parsedData.humidity,
    forecastArr[0].day.daily_chance_of_rain,
    parsedData.wind.mi,
    parsedData.wind.km
  );
  currentWeatherCard.createCard();
  return currentWeatherCard;
}

// Render the hourly cards for selected date in a 8 hour interval (starting from the next hour from today)
function renderHourlyWeatherCards(dayWeatherCard, forecastArr) {
  const hours = getEightHourForecast();
  let dayWeatherCardIndex = parseInt(dayWeatherCard.dataset.index);
  let dayWeatherCardIndexUpdated = false;
  for (let i = hours.start; i <= hours.end; i++) {
    let hour = i;
    // If hour is more than 24, dayWeatherIndex will increase by 1 and hours will become hour % 24(for the next day)
    if (i >= 24) {
      hour = hour % 24;
      // Check if dayWeatherCardIndex was updated and if the data for the next day for that index exists in forecastARr
      if (
        !dayWeatherCardIndexUpdated &&
        dayWeatherCardIndex < forecastArr.length - 1
      ) {
        dayWeatherCardIndexUpdated = true;
        dayWeatherCardIndex++;
      }
    }
    console.log("DayWeatherCardIndex", dayWeatherCardIndex);
    const hourlyWeatherCard = createHourlyWeatherCard(
      forecastArr[dayWeatherCardIndex].hour[hour].time,
      forecastArr[dayWeatherCardIndex].hour[hour].temp_f,
      forecastArr[dayWeatherCardIndex].hour[hour].temp_c,
      forecastArr[dayWeatherCardIndex].hour[hour].condition.icon
    );
    hourlyWeatherCards.push(hourlyWeatherCard);
    hourlyWeatherCard.createCard();
  }
}

// Render day weather cards
function renderDayWeatherCards(forecastArr, parsedData) {
  forecastArr.forEach((forecastDay, index) => {
    const dayWeatherCard = createDayWeatherCard(
      forecastDay.date,
      null,
      null,
      parsedData.condition.icon,
      forecastDay.day.mintemp_f,
      forecastDay.day.mintemp_c,
      forecastDay.day.maxtemp_f,
      forecastDay.day.maxtemp_c,
      index,
      forecastArr
    );
    dayWeatherCard.createCard();
    dayWeatherCards.push(dayWeatherCard);
  });
  return dayWeatherCards;
}

// Return dayWeatherCards array
function getDayWeatherCards() {
  return dayWeatherCards;
}

// Return hourlyWeatherCards array
function getHourlyWeatherCards() {
  return hourlyWeatherCards;
}

// Render display day forecast button if forecast is in hourlyu view
function renderDisplayDayForecastBtn(currentView) {
  const displayDayForecastBtn = document.querySelector(".display-day-forecast");
  console.log("forecast button", displayDayForecastBtn);
  displayDayForecastBtn.style.display =
    currentView === "hourly" ? "block" : "none";
}

// Render forecast display based on function passed in
function renderForecastDisplay(
  renderFunc,
  forecastViewToggler,
  param1,
  param2
) {
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
  clearContainer(forecastCardsContainer);
  forecastViewToggler.toggleView();
  let currentView = forecastViewToggler.getView();
  renderDisplayDayForecastBtn(currentView);
  renderFunc(param1, param2);
}

export {
  renderCurrentWeatherCard,
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderDisplayDayForecastBtn,
  renderForecastDisplay,
};
