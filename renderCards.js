import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";
import { convertTimeToHours } from "./utils/timeUtils.js";
import { clearContainer } from "./utils/domUtils.js";

const dayWeatherCards = [];
const hourlyWeatherCards = [];

// Get all the hour intervals for a specific day
// Current day intervals start from roundedHr, then 8 hr intervals, until 11PM max
// Other day intervals will start from 12AM, then 8 hr intervals until 11 PM max
function getDayHourIntervals(dayIndex) {
  const selectedDate = new Date();

  // Start hour intervals at 12AM
  let startHour = 0;
  let endHour;
  let dayHourIntervals = [];

  // If it is current day, the interval should start on the next hour after current hour
  // Ex: if it is 7:25 AM right now, it should start at 8AM
  if (dayIndex === 0) {
    // Current hour in 24-hour time
    const currentHour = convertTimeToHours(selectedDate);
    const roundedHour = currentHour + 1;
    startHour = roundedHour;
  }

  // Grab all hour intervals for a day, endHour should never be greater than 11 PM (12AM would be the next day)
  while (startHour <= 23) {
    // Ensure forecasted endHour (startHour + 7) is never greater than 23 (11PM)
    endHour = startHour + 7 > 23 ? 23 : startHour + 7;
    dayHourIntervals.push({ startHour, endHour });

    // Increase startHour by 8 to get the start of the next interval of the day
    startHour += 8;
  }

  return dayHourIntervals;
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

// Render the hourly cards for selected date in 8 hour intervals (current card will start from the next hour from current time)
function renderHourlyWeatherCards(
  dayWeatherCard,
  forecastArr,
  cardContainer,
  interval
) {
  let dayWeatherCardIndex = parseInt(dayWeatherCard.dataset.index);

  // Get the specific day's intervals
  const dayHourIntervals = getDayHourIntervals(dayWeatherCardIndex);

  for (
    let i = dayHourIntervals[interval].startHour;
    i <= dayHourIntervals[interval].endHour;
    i++
  ) {
    let hour = i;

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
      cardContainer,
      imperialMinTemp: forecastDay.day.mintemp_f,
      metricMinTemp: forecastDay.day.mintemp_c,
      imperialMaxTemp: forecastDay.day.maxtemp_f,
      metricMaxTemp: forecastDay.day.maxtemp_c,
      index,
      forecastArr,
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
  containerToClear,
  renderFunc,
  forecastViewToggler,
  renderFuncParams,
  clickedEl,
  hourlyViewBtns = []
) {
  // Clear container with cards before rendering cards
  clearContainer(containerToClear);

  // Toggle the view based on the clicked element
  forecastViewToggler.toggleViewBasedOnClickedEl(clickedEl);

  // Render hourly view buttons based on the view
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
  getDayHourIntervals,
};
