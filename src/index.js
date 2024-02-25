import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";
import { convertAmPm } from "./utils.js";
import {
  renderDayWeatherCards,
  renderHourlyCards,
  clearForecastCardsContainer,
  getDayWeatherCards,
  getHourlyWeatherCards,
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
  currentWeatherCard.createCard();
  renderDayWeatherCards(weatherData, parsedData);
  forecastCardsContainer.addEventListener("click", (e) => {
    clearForecastCardsContainer();

    const selectedCard = e.target.closest(".day-weather-card");
    renderHourlyCards(selectedCard, weatherData);
  });
  // const dayCard = createDayWeatherCard(
  //   forecastArr[0].date,
  //   null,
  //   null,
  //   parsedData.condition.icon,
  //   forecastArr[0].day.mintemp_f,
  //   forecastArr[0].day.mintemp_c,
  //   forecastArr[0].day.maxtemp_f,
  //   forecastArr[0].day.maxtemp_c
  // );
  // dayCard.createCard();
  // renderHourlyCards(dayCard, weatherData);

  // const hourCard = createHourlyWeatherCard(
  //   forecastArr[0].hour[0].time,
  //   forecastArr[0].hour[0].temp_f,
  //   forecastArr[0].hour[0].temp_c,
  //   forecastArr[0].hour[0].condition.icon
  // );
  // hourCard.createCard();
  const displayImperialMetricBtn = document.querySelector(
    ".display-imperial-metric"
  );
  displayImperialMetricBtn.addEventListener("click", () => {
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
