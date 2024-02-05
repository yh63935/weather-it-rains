import { getWeatherData } from "./api.js";
import { parseWeatherData } from "./api.js";
import weatherCard from "./components.js";

async function initialize() {
  const weatherData = await getWeatherData();
  console.log(weatherData);
  const parsedData = parseWeatherData(weatherData);

  const forecastArr = weatherData.forecast.forecastday;
  console.log("forecastdate" + forecastArr[0].date);
  const card1 = new weatherCard(
    forecastArr[0].date,
    parsedData.currentTemp.cels,
    parsedData.icon
  );
  card1.createCard();
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
