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
  clearForecastContainer,
} from "./renderCards.js";

async function initialize() {
  renderDayWeatherCards();
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
  const forecastContainer = document.querySelector(".forecast-container");
  forecastContainer.addEventListener("click", (e) => {
    clearForecastContainer();
    const selectedCard = e.target.closest(".day-weather-card");
    console.log("selectedCard", selectedCard);
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
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    card1.toggleImperialMetric();
    dayCard.toggleImperialMetric();
    hourCard.toggleImperialMetric();
  });
}

initialize();
