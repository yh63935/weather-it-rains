import { convertAmPm, addLabel } from "./utils.js";
class WeatherCard {
  constructor(timeMeasurement, temp, icon) {
    this._timeMeasurement = timeMeasurement;
    this._temp = temp;
    this._icon = icon;
    this.cardContainer = createEl("div", "");
  }
  formatTimeMeasurement() {
    return this._timeMeasurement;
  }
  createCard() {
    const body = document.querySelector("body");
    const formattedTimeMeasurement = this.formatTimeMeasurement();
    const timeMeasurementEl = createEl("p", formattedTimeMeasurement);
    const tempEl = this._temp
      ? createEl("p", addLabel(this._temp, "f"), "temp")
      : "";
    const iconEl = createEl("img", this._icon);
    appendEl(body, this.cardContainer);
    if (tempEl) {
      appendEl(this.cardContainer, timeMeasurementEl, tempEl, iconEl);
    } else {
      appendEl(this.cardContainer, timeMeasurementEl, iconEl);
    }
  }
}

// Better to use something else since there will be only one copy of this?
class CurrentWeatherCard extends WeatherCard {
  constructor(
    timeMeasurement,
    temp,
    icon,
    location,
    conditionText,
    feelsLike,
    humidity,
    chanceRain,
    windSpeed
  ) {
    super(timeMeasurement, temp, icon);
    this._location = location;
    this._conditionText = conditionText;
    this._feelsLike = feelsLike;
    this._humidity = humidity;
    this._chanceRain = chanceRain;
    this._windSpeed = windSpeed;
  }
  formatTimeMeasurement() {
    const date = new Date(this._timeMeasurement);
    const day = date.getDay();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const formattedHourMin = convertAmPm(date, true);
    const minutes = date.getMinutes();
    const formattedDate = `${month} ${day}, ${year} ${formattedHourMin}`;
    return formattedDate;
  }
  createCard() {
    super.createCard();
    const body = document.querySelector("body");
    const currentCardContainer = createEl("div", "", "current-card-container");
    appendEl(body, currentCardContainer);
    const weatherConditions = createEl("div", "", "weather-conditions");
    appendEl(currentCardContainer, this.cardContainer, weatherConditions);
    const locationEl = createEl("p", this._location);
    appendEl(currentCardContainer, locationEl);
    const conditionEl = createEl("p", this._conditionText);
    this.cardContainer.insertBefore(
      conditionEl,
      document.querySelector(".temp")
    );
    const feelsLikeEl = createEl("p", addLabel(this._feelsLike, "f"));
    const humidityEl = createEl("p", addLabel(this._humidity, "%"));
    const chanceRainEl = createEl("p", addLabel(this._chanceRain, "%"));
    const windSpeedEl = createEl("p", addLabel(this._windSpeed, "km"));
    appendEl(
      weatherConditions,
      feelsLikeEl,
      humidityEl,
      chanceRainEl,
      windSpeedEl
    );
  }
}

class DayWeatherCard extends WeatherCard {
  constructor(timeMeasurement, temp, icon, minTemp, maxTemp) {
    super(timeMeasurement, temp, icon);
    this._minTemp = minTemp;
    this._maxTemp = maxTemp;
  }
  // Convert time to day of the week
  formatTimeMeasurement() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const index = new Date(this._timeMeasurement).getDay();
    return days[index];
  }
  createCard() {
    super.createCard();
    const minTempEl = createEl("p", addLabel(this._minTemp, "f"));
    const maxTempEl = createEl("p", addLabel(this._maxTemp, "f"));
    appendEl(this.cardContainer, minTempEl, maxTempEl);
  }
}
// Class for hourly weather card
class HourlyWeatherCard extends WeatherCard {
  formatTimeMeasurement() {
    const date = new Date(this._timeMeasurement);
    const formattedHour = convertAmPm(date);
    return formattedHour;
  }
}
// Factory function to create instances of a current day card
function CreateCurrentDayCard(
  timeMeasurement,
  temp,
  icon,
  location,
  conditionText,
  feelsLike,
  humidity,
  chanceRain,
  windSpeed
) {
  return new CurrentWeatherCard(
    timeMeasurement,
    temp,
    icon,
    location,
    conditionText,
    feelsLike,
    humidity,
    chanceRain,
    windSpeed
  );
}
// Factory function to create instances of a forecast day card
function CreateForecastDayCard(timeMeasurement, temp, icon, minTemp, maxTemp) {
  return new DayWeatherCard(timeMeasurement, temp, icon, minTemp, maxTemp);
}
// Factory function to create instances of a hourly card
function CreateHourlyCard(timeMeasurement, temp, icon) {
  return new HourlyWeatherCard(timeMeasurement, temp, icon);
}
// Create element with specified text and class
function createEl(el, text, className) {
  const element = document.createElement(el);
  element.innerText = text;

  // Only add class if provided
  if (className) {
    element.classList.add(className);
  }

  return element;
}

// Append element(s) to a parent
function appendEl(parent, ...elements) {
  elements.forEach((el) => {
    parent.append(el);
  });
}

export { CreateCurrentDayCard, CreateForecastDayCard, CreateHourlyCard };
