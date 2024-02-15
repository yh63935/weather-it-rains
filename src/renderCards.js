import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";

function renderDayWeatherCards() {
  const dayWeatherCards = [];
  getWeatherData().then((weatherData) => {
    const parsedData = parseWeatherData(weatherData);
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
  });
}

export { renderDayWeatherCards };
