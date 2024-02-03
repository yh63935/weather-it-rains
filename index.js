let userLocation = prompt("Location?");

// Days in the url remains 3 (including current day) because we have the free version which only can forecast up to 3 days
fetch(
  `http://api.weatherapi.com/v1/forecast.json?key=76fcad5f297045359a7222047241501&q=${userLocation}&days=3&aqi=no&alerts=no`,
  { mode: "cors" }
)
  .then((response) => response.json())
  .then((weatherData) => {
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
    console.log(weatherData.forecast.forecastday[0].day.maxtemp_c);
    console.log(weatherData.forecast.forecastday[0].day.maxtemp_f);
    console.log(weatherData.forecast.forecastday[0].day.mintemp_c);
    console.log(weatherData.forecast.forecastday[0].day.mintemp_f);

    console.log(weatherData.forecast.forecastday[0].day.daily_chance_of_rain);
    console.log(weatherData.forecast.forecastday[0].day.daily_chance_of_snow);

    console.log(weatherData.forecast.forecastday[0].day.condition.text);
    console.log(weatherData.forecast.forecastday[0].day.condition.icon);

    console.log(weatherData.forecast.forecastday[0].hour[0].temp_c);
    console.log(weatherData.forecast.forecastday[0].hour[0].temp_f);
    console.log(weatherData.forecast.forecastday[0].hour[0].is_day);
  })
  .catch((err) => {
    console.log(err);
  });
