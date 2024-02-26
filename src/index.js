import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";
import { convertAmPm, createForecastViewToggler } from "./utils.js";
import {
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  clearForecastCardsContainer,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderDisplayDayForecastBtn,
  renderForecastDisplay,
} from "./renderCards.js";

async function initialize() {
  const weatherData = await getWeatherData();
  const parsedData = parseWeatherData(weatherData);
  const forecastArr = weatherData.forecast.forecastday;
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
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
  let forecastViewToggler = createForecastViewToggler();

  currentWeatherCard.createCard();
  renderDayWeatherCards(weatherData, parsedData);
  forecastCardsContainer.addEventListener("click", (e) => {
    const selectedCard = e.target.closest(".day-weather-card");
    const selectedBtn = e.target.closest(".day-weather-card button");
    if (selectedBtn && selectedCard) {
      renderForecastDisplay(
        renderHourlyWeatherCards,
        forecastViewToggler,
        selectedCard,
        weatherData
      );
    }
  });

  const displayDayForecastBtn = document.querySelector(".display-day-forecast");
  displayDayForecastBtn.addEventListener("click", () => {
    renderForecastDisplay(
      renderDayWeatherCards,
      forecastViewToggler,
      weatherData,
      parsedData
    );
  });

  const convertImperialMetricBtn = document.querySelector(
    ".convert-imperial-metric"
  );
  convertImperialMetricBtn.addEventListener("click", () => {
    currentWeatherCard.toggleImperialMetric();
    const dayWeatherCards = getDayWeatherCards();
    const hourlyWeatherCards = getHourlyWeatherCards();
    dayWeatherCards.forEach((dayWeatherCard) => {
      dayWeatherCard.toggleImperialMetric();
    });
    hourlyWeatherCards.forEach((hourlyWeatherCard) => {
      hourlyWeatherCard.toggleImperialMetric();
    });
  });
}

initialize();
