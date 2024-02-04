import getWeatherData from "./api.js";

getWeatherData();

console.log(weatherData.location.name);
console.log(weatherData.location.region);
console.log(weatherData.location.country);
console.log(weatherData.location.localtime);

console.log(weatherData.current.temp_c);
console.log(weatherData.current.temp_f);
console.log(weatherData.current.feelslike_c);
console.log(weatherData.current.feelslike_f);

console.log(weatherData.current.is_day);
console.log(weatherData.current.condition.text);
console.log(weatherData.current.condition.icon);

console.log(weatherData.current.wind_mph);
console.log(weatherData.current.wind_kph);

console.log(weatherData.current.humidity);

// Will need to replace with indexes after
// Replace with the variables for day (accept variable in case they decide to upgrade to paid weather with extra days)
console.log(`array length for days ${weatherData.forecast.forecastday.length}`);
const forecastArr = weatherData.forecast.forecastday;

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
