import { convertAmPm, addLabel } from "./utils.js";
class WeatherCard {
  constructor(timeMeasurement, temp, icon) {
    this._timeMeasurement = timeMeasurement;
    this._temp = temp;
    this.tempUnit = "f";
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
      ? createEl("p", addLabel(this._temp, this.tempUnit), "temp")
      : "";
    const iconEl = createEl("img", this._icon);
    appendEl(body, this.cardContainer);
    if (tempEl) {
      appendEl(this.cardContainer, timeMeasurementEl, tempEl, iconEl);
    } else {
      appendEl(this.cardContainer, timeMeasurementEl, iconEl);
    }
  }
  // Toggle between imperial and metric units for the weather card
  toggleImperialMetric() {
    this.tempUnit = this.tempUnit === "f" ? "c" : "f";
    if (this.speedUnit) {
      this.speedUnit = this.speedUnit === "mi" ? "km" : "mi";
    }
    this.updateLabels();
  }
  // Update imperial and metric labels
  updateLabels() {
    const tempEls = this.cardContainer.querySelectorAll(".temp");
    for (const tempEl of tempEls) {
      tempEl.innerText = addLabel(this._temp, this.tempUnit);
    }
    const windSpeedEl = this.cardContainer.querySelector(".wind-speed");
    windSpeedEl.innerText = addLabel(this._windSpeed, this.speedUnit);
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
    this.speedUnit = "mi";
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
    const mainInfo = createEl("div", "", "main-info");
    appendEl(body, mainInfo);
    const weatherConditions = createEl("div", "", "weather-conditions");
    appendEl(this.cardContainer, mainInfo, weatherConditions);
    const locationEl = createEl("p", this._location);
    appendEl(mainInfo, locationEl);
    const convertBtn = createEl("button", "Display °F/°C");
    const tempEl = this.cardContainer.querySelector(".temp");
    const iconEl = this.cardContainer.querySelector("img");
    this.cardContainer.insertBefore(convertBtn, iconEl);
    const conditionEl = createEl("p", this._conditionText);
    this.cardContainer.insertBefore(conditionEl, tempEl);
    const feelsLikeEl = createEl("p", addLabel(this._feelsLike, this.tempUnit));
    const humidityEl = createEl("p", addLabel(this._humidity, "%"));
    const chanceRainEl = createEl("p", addLabel(this._chanceRain, "%"));
    const windSpeedEl = createEl(
      "p",
      addLabel(this._windSpeed, this.speedUnit),
      "wind-speed"
    );
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
    const minTempEl = createEl(
      "p",
      addLabel(this._minTemp, this.tempUnit),
      "temp"
    );
    const maxTempEl = createEl(
      "p",
      addLabel(this._maxTemp, this.tempUnit),
      "temp"
    );
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
