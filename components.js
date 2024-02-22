import { convertAmPm, addLabel } from "./utils.js";
class WeatherCard {
  constructor(timeMeasurement, imperialTemp, metricTemp, icon) {
    this._timeMeasurement = timeMeasurement;
    this._imperialTemp = imperialTemp;
    this._metricTemp = metricTemp;
    this.tempUnit = "f";
    this._icon = icon;
    this.cardContainer = createEl("div", "");
    this.isImperial = true;
  }
  formatTimeMeasurement() {
    return this._timeMeasurement;
  }
  addCardType() {
    this.cardContainer.classList.add(this._cardType);
  }
  createCard() {
    this.addCardType();
    const body = document.querySelector("body");
    const formattedTimeMeasurement = this.formatTimeMeasurement();
    const timeMeasurementEl = createEl("p", formattedTimeMeasurement);
    const tempEl = this._imperialTemp
      ? createEl("p", addLabel(this._imperialTemp, this.tempUnit), "temp")
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
    this.isImperial = !this.isImperial;
    this.updateImperialMetricLabels();
  }
  // Update imperial and metric labels
  updateImperialMetricLabels() {
    this.tempUnit = this.isImperial ? "f" : "c";
    this.updateImperialMetricLabel(
      ".temp",
      this._imperialTemp,
      this._metricTemp,
      this.tempUnit
    );
  }
  updateImperialMetricLabel(className, imperialValue, metricValue, unit) {
    const el = this.cardContainer.querySelector(className);
    if (el) {
      el.innerText = addLabel(
        this.isImperial ? imperialValue : metricValue,
        unit
      );
    }
  }
}

class CurrentWeatherCard extends WeatherCard {
  constructor(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    location,
    conditionText,
    imperialFeelsLikeTemp,
    metricFeelsLikeTemp,
    humidity,
    chanceRain,
    imperialWindSpeed,
    metricWindSpeed
  ) {
    super(timeMeasurement, imperialTemp, metricTemp, icon);
    this._cardType = "current-weather-card";
    this._location = location;
    this._conditionText = conditionText;
    this.speedUnit = "mi";
    this._humidity = humidity;
    this._chanceRain = chanceRain;
    this._imperialWindSpeed = imperialWindSpeed;
    this._metricWindSpeed = metricWindSpeed;
    this._imperialFeelsLikeTemp = imperialFeelsLikeTemp;
    this._metricFeelsLikeTemp = metricFeelsLikeTemp;
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
    const feelsLikeEl = createEl(
      "p",
      addLabel(this._imperialFeelsLikeTemp, this.tempUnit),
      "feels-like"
    );

    const humidityEl = createEl("p", addLabel(this._humidity, "%"));
    const chanceRainEl = createEl("p", addLabel(this._chanceRain, "%"));
    const windSpeedEl = createEl(
      "p",
      addLabel(this._imperialWindSpeed, this.speedUnit),
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
  updateImperialMetricLabels() {
    super.updateImperialMetricLabels();
    this.speedUnit = this.isImperial ? "mi" : "km";

    this.updateImperialMetricLabel(
      ".feels-like",
      this._imperialFeelsLikeTemp,
      this._metricFeelsLikeTemp,
      this.tempUnit
    );
    this.updateImperialMetricLabel(
      ".wind-speed",
      this._imperialWindSpeed,
      this._metricWindSpeed,
      this.speedUnit
    );
  }
}

class DayWeatherCard extends WeatherCard {
  // Create an index variable to increase every time a new instance of DayWeatherCard is created
  static index = 0;
  constructor(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    imperialMinTemp,
    metricMinTemp,
    imperialMaxTemp,
    metricMaxTemp
  ) {
    super(timeMeasurement, imperialTemp, metricTemp, icon);
    this._cardType = "day-weather-card";
    this.cardContainer.dataset.index = DayWeatherCard.index++;
    this._imperialMinTemp = imperialMinTemp;
    this._metricMinTemp = metricMinTemp;
    this._imperialMaxTemp = imperialMaxTemp;
    this._metricMaxTemp = metricMaxTemp;
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
    const index = new Date(this._timeMeasurement + " 00:00").getDay();
    return days[index];
  }
  createCard() {
    super.createCard();
    const forecastContainer = document.querySelector(".forecast-container");
    appendEl(forecastContainer, this.cardContainer);
    const minTempEl = createEl(
      "p",
      addLabel(this._imperialMinTemp, this.tempUnit),
      "min-temp"
    );
    const maxTempEl = createEl(
      "p",
      addLabel(this._imperialMaxTemp, this.tempUnit),
      "max-temp"
    );
    appendEl(this.cardContainer, minTempEl, maxTempEl);
  }
  updateImperialMetricLabels() {
    super.updateImperialMetricLabels();
    this.updateImperialMetricLabel(
      ".min-temp",
      this._imperialMinTemp,
      this._metricMinTemp,
      this.tempUnit
    );
    this.updateImperialMetricLabel(
      ".max-temp",
      this._imperialMaxTemp,
      this._metricMaxTemp,
      this.tempUnit
    );
  }
}
// Class for hourly weather card
class HourlyWeatherCard extends WeatherCard {
  constructor(timeMeasurement, imperialTemp, metricTemp, icon) {
    super(timeMeasurement, imperialTemp, metricTemp, icon);
    this._cardType = "hourly-weather-card";
  }
  formatTimeMeasurement() {
    const date = new Date(this._timeMeasurement);
    const formattedHour = convertAmPm(date);
    return formattedHour;
  }
  createCard() {
    super.createCard();
    const forecastContainer = document.querySelector(".forecast-container");
    appendEl(forecastContainer, this.cardContainer);
  }
}
// Factory function to create instances of a current day card
function createCurrentWeatherCard(
  timeMeasurement,
  imperialTemp,
  metricTemp,
  icon,
  location,
  conditionText,
  imperialFeelsLikeTemp,
  metricFeelsLikeTemp,
  humidity,
  chanceRain,
  imperialWindSpeed,
  metricWindSpeed
) {
  return new CurrentWeatherCard(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    location,
    conditionText,
    imperialFeelsLikeTemp,
    metricFeelsLikeTemp,
    humidity,
    chanceRain,
    imperialWindSpeed,
    metricWindSpeed
  );
}
// Factory function to create instances of a forecast day card
function createDayWeatherCard(
  timeMeasurement,
  imperialTemp,
  metricTemp,
  icon,
  imperialMinTemp,
  metricMinTemp,
  imperialMaxTemp,
  metricMaxTemp
) {
  return new DayWeatherCard(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    imperialMinTemp,
    metricMinTemp,
    imperialMaxTemp,
    metricMaxTemp
  );
}
// Factory function to create instances of a hourly card
function createHourlyWeatherCard(
  timeMeasurement,
  imperialTemp,
  metricTemp,
  icon
) {
  return new HourlyWeatherCard(timeMeasurement, imperialTemp, metricTemp, icon);
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

export {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
  appendEl,
};
