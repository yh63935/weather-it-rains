import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
} from "./components.js";
import { renderDayWeatherCards } from "./renderCards.js";

async function initialize() {
  renderDayWeatherCards();
  // const weatherData = await getWeatherData();
  // const parsedData = parseWeatherData(weatherData);

  // const forecastArr = weatherData.forecast.forecastday;
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

  // const hourCard = createHourlyWeatherCard(
  //   forecastArr[0].hour[0].time,
  //   forecastArr[0].hour[0].temp_f,
  //   forecastArr[0].hour[0].temp_c,
  //   forecastArr[0].hour[0].condition.icon
  // );
  // hourCard.createCard();
  // const button = document.querySelector("button");
  // button.addEventListener("click", () => {
  //   card1.toggleImperialMetric();
  //   dayCard.toggleImperialMetric();
  //   hourCard.toggleImperialMetric();
  // });
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
