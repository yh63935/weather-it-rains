import { convertAmPm } from "./utils/timeUtils.js";
import { formattedUnitWithLabel } from "./utils/formatUtils.js";
import { createEl, appendEl } from "./utils/domUtils.js";

// Base class for all weather cards
class WeatherCard {
  constructor(weatherCardParams) {
    // Properties based off of weatherCardParams
    this._timeMeasurement = weatherCardParams.timeMeasurement;
    this._imperialTemp = weatherCardParams.imperialTemp;
    this._metricTemp = weatherCardParams.metricTemp;
    this._icon = weatherCardParams.icon;

    // Other properties
    this.tempUnit = "f";
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
      ? createEl(
          "p",
          formattedUnitWithLabel(this._imperialTemp, this.tempUnit),
          "temp"
        )
      : "";
    const iconEl = createEl("img");
    iconEl.src = this._icon;
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
      el.innerText = formattedUnitWithLabel(
        this.isImperial ? imperialValue : metricValue,
        unit
      );
    }
  }
}

// Class for the current day weather card (today)
class CurrentWeatherCard extends WeatherCard {
  constructor(currentWeatherCardParams) {
    super(currentWeatherCardParams);
    // Properties based off of currentWeatherCardParams
    this._location = currentWeatherCardParams.location;
    this._conditionText = currentWeatherCardParams.conditionText;
    this._imperialFeelsLikeTemp =
      currentWeatherCardParams.imperialFeelsLikeTemp;
    this._metricFeelsLikeTemp = currentWeatherCardParams.metricFeelsLikeTemp;
    this._humidity = currentWeatherCardParams.humidity;
    this._chanceOfRain = currentWeatherCardParams.chanceOfRain;
    this._imperialWindSpeed = currentWeatherCardParams.imperialWindSpeed;
    this._metricWindSpeed = currentWeatherCardParams.metricWindSpeed;

    // Other properties
    this._cardType = "current-weather-card";
    this.speedUnit = "mi";
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
    const currentWeatherContainer = document.querySelector(
      ".current-weather-container"
    );
    appendEl(currentWeatherContainer, this.cardContainer);
    const body = document.querySelector("body");
    const mainInfo = createEl("div", "", "main-info");
    appendEl(body, mainInfo);
    const weatherConditions = createEl("div", "", "weather-conditions");
    appendEl(this.cardContainer, mainInfo, weatherConditions);
    const locationEl = createEl("p", this._location);
    appendEl(mainInfo, locationEl);
    const convertImperialMetricBtn = createEl(
      "button",
      `Display °C`,
      "convert-imperial-metric"
    );
    const tempEl = this.cardContainer.querySelector(".temp");
    const iconEl = this.cardContainer.querySelector("img");
    this.cardContainer.insertBefore(convertImperialMetricBtn, iconEl);
    const conditionEl = createEl("p", this._conditionText);
    this.cardContainer.insertBefore(conditionEl, tempEl);
    const feelsLikeEl = createEl(
      "p",
      formattedUnitWithLabel(this._imperialFeelsLikeTemp, this.tempUnit),
      "feels-like"
    );
    const humidityEl = createEl(
      "p",
      formattedUnitWithLabel(this._humidity, "%")
    );
    const chanceOfRainEl = createEl(
      "p",
      formattedUnitWithLabel(this._chanceOfRain, "%")
    );
    const windSpeedEl = createEl(
      "p",
      formattedUnitWithLabel(this._imperialWindSpeed, this.speedUnit),
      "wind-speed"
    );
    appendEl(
      weatherConditions,
      feelsLikeEl,
      humidityEl,
      chanceOfRainEl,
      windSpeedEl
    );
  }
  toggleImperialMetric() {
    super.toggleImperialMetric();
    this.toggleConvertImperialMetricBtn();
  }
  // Updates convert imperial metric button with new temp unit when toggled
  toggleConvertImperialMetricBtn() {
    const convertImperialMetricBtn = document.querySelector(
      ".convert-imperial-metric"
    );
    const altTempUnit = this.tempUnit === "c" ? "f" : "c";
    convertImperialMetricBtn.innerText = `Display °${altTempUnit.toUpperCase()}`;
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

// Class for day weather cards
class DayWeatherCard extends WeatherCard {
  // Create an index variable to increase every time a new instance of DayWeatherCard is created
  constructor(dayWeatherCardParams) {
    super(dayWeatherCardParams);
    // Properties based off of dayWeatherCardParams
    this._imperialMinTemp = dayWeatherCardParams.imperialMinTemp;
    this._metricMinTemp = dayWeatherCardParams.metricMinTemp;
    this._imperialMaxTemp = dayWeatherCardParams.imperialMaxTemp;
    this._metricMaxTemp = dayWeatherCardParams.metricMaxTemp;
    this.cardContainer.dataset.index =
      dayWeatherCardParams.index % dayWeatherCardParams.forecastArr.length;

    // Other properties
    this._cardType = "day-weather-card";
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
    const forecastCardsContainer = document.querySelector(
      ".forecast-cards-container"
    );
    appendEl(forecastCardsContainer, this.cardContainer);
    const displayHourlyForecastBtn = createEl(
      "button",
      "Display hourly forecast"
    );
    const minTempEl = createEl(
      "p",
      formattedUnitWithLabel(this._imperialMinTemp, this.tempUnit),
      "min-temp"
    );
    const maxTempEl = createEl(
      "p",
      formattedUnitWithLabel(this._imperialMaxTemp, this.tempUnit),
      "max-temp"
    );
    appendEl(
      this.cardContainer,
      displayHourlyForecastBtn,
      minTempEl,
      maxTempEl
    );
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

// Class for hourly weather cards
class HourlyWeatherCard extends WeatherCard {
  constructor(hourlyWeatherCardParams) {
    super(hourlyWeatherCardParams);
    this._cardType = "hourly-weather-card";
  }
  formatTimeMeasurement() {
    const date = new Date(this._timeMeasurement);
    const formattedHour = convertAmPm(date);
    return formattedHour;
  }
  createCard() {
    super.createCard();
    const forecastCardsContainer = document.querySelector(
      ".forecast-cards-container"
    );
    appendEl(forecastCardsContainer, this.cardContainer);
  }
}
// Factory function to create instances of a current day card
function createCurrentWeatherCard(currentWeatherCardParams) {
  return new CurrentWeatherCard(currentWeatherCardParams);
}
// Factory function to create instances of a forecast day card
function createDayWeatherCard(dayWeatherCardParams) {
  return new DayWeatherCard(dayWeatherCardParams);
}

// Factory function to create instances of a hourly card
function createHourlyWeatherCard(hourlyWeatherCardParams) {
  return new HourlyWeatherCard(hourlyWeatherCardParams);
}

export {
  createCurrentWeatherCard,
  createDayWeatherCard,
  createHourlyWeatherCard,
};
