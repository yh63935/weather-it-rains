import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";
import { convertTimeToHours } from "./utils/timeUtils.js";
import { clearContainer } from "./utils/domUtils.js";

const dayWeatherCards = [];
const hourlyWeatherCards = [];

// Get 8 hour forecast from the current time or specified offset interval
function getEightHourForecast(offsetInterval = 0) {
  const selectedDate = new Date();

  // Current hour in 24-hour time
  const currentHour = convertTimeToHours(selectedDate);

  const roundedHour = currentHour + 1;

  // Calculate start interval from the rounded hour by adding the offset
  const startHour = roundedHour + offsetInterval * 8;
  let endHour = startHour + 7; // End the interveral 8 hours from the start (including start hour)

  return { startHour, endHour };
}

// Render current weather card
function renderCurrentWeatherCard(forecastArr, parsedData, cardContainer) {
  // Create current weather card
  const currentWeatherCard = createCurrentWeatherCard({
    timeMeasurement: parsedData.time,
    imperialTemp: parsedData.currentTemp.far,
    metricTemp: parsedData.currentTemp.cels,
    icon: parsedData.condition.icon,
    cardContainer,
    location: parsedData.location,
    conditionText: parsedData.condition.text,
    imperialFeelsLikeTemp: parsedData.feelsLike.far,
    metricFeelsLikeTemp: parsedData.feelsLike.cels,
    humidity: parsedData.humidity,
    chanceOfRain: forecastArr[0].day.daily_chance_of_rain,
    imperialWindSpeed: parsedData.wind.mi,
    metricWindSpeed: parsedData.wind.km,
  });
  currentWeatherCard.createCard();
  return currentWeatherCard;
}

// Render the hourly cards for selected date in a 8 hour interval (starting from the next hour from today)
function renderHourlyWeatherCards(
  dayWeatherCard,
  forecastArr,
  cardContainer,
  interval
) {
  const hours = getEightHourForecast(interval);
  let dayWeatherCardIndex = parseInt(dayWeatherCard.dataset.index);
  let dayWeatherCardIndexUpdated = false;
  for (let i = hours.startHour; i <= hours.endHour; i++) {
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
    const hourlyWeatherCard = createHourlyWeatherCard({
      timeMeasurement: forecastArr[dayWeatherCardIndex].hour[hour].time,
      imperialTemp: forecastArr[dayWeatherCardIndex].hour[hour].temp_f,
      metricTemp: forecastArr[dayWeatherCardIndex].hour[hour].temp_c,
      icon: forecastArr[dayWeatherCardIndex].hour[hour].condition.icon,
      cardContainer,
    });
    hourlyWeatherCards.push(hourlyWeatherCard);
    hourlyWeatherCard.createCard();
  }
}

// Render day weather cards
function renderDayWeatherCards(forecastArr, parsedData, cardContainer) {
  forecastArr.forEach((forecastDay, index) => {
    const dayWeatherCard = createDayWeatherCard({
      timeMeasurement: forecastDay.date,
      imperialTemp: null,
      metricTemp: null,
      icon: parsedData.condition.icon,
      imperialMinTemp: forecastDay.day.mintemp_f,
      metricMinTemp: forecastDay.day.mintemp_c,
      imperialMaxTemp: forecastDay.day.maxtemp_f,
      metricMaxTemp: forecastDay.day.maxtemp_c,
      index,
      forecastArr,
      cardContainer,
    });
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

// Render all buttons that are visible in hourly view
function renderHourlyViewBtns(hourlyViewBtns, currentView) {
  hourlyViewBtns.forEach((btn) => {
    btn.style.display = currentView === "hourly" ? "block" : "none";
  });
}

// Render forecast display based on function passed in
function renderForecastDisplay(
  renderFunc,
  forecastViewToggler,
  renderFuncParams,
  clickedEl,
  hourlyViewBtns = []
) {
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
  clearContainer(forecastCardsContainer);
  // Only toggle the view if it is the display day forecast or display hourly forecast button
  if (
    clickedEl.classList.contains("display-day-forecast") ||
    clickedEl.classList.contains("display-hourly-forecast")
  )
    forecastViewToggler.toggleView();
  let currentView = forecastViewToggler.getView();
  renderHourlyViewBtns(hourlyViewBtns, currentView);
  // Render function with varying number of parameters
  renderFunc(...Object.values(renderFuncParams));
}

export {
  renderCurrentWeatherCard,
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderHourlyViewBtns,
  renderForecastDisplay,
};
