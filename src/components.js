import { convertAmPm, addLabel } from "./utils.js";

// Base class for all weather cards
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
      el.innerText = addLabel(
        this.isImperial ? imperialValue : metricValue,
        unit
      );
    }
  }
}

// Class for the current day weather card (today)
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
  constructor(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    imperialMinTemp,
    metricMinTemp,
    imperialMaxTemp,
    metricMaxTemp,
    index,
    forecastArr
  ) {
    super(timeMeasurement, imperialTemp, metricTemp, icon);
    this._cardType = "day-weather-card";
    this.cardContainer.dataset.index = index % forecastArr.length;
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
      addLabel(this._imperialMinTemp, this.tempUnit),
      "min-temp"
    );
    const maxTempEl = createEl(
      "p",
      addLabel(this._imperialMaxTemp, this.tempUnit),
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
    const forecastCardsContainer = document.querySelector(
      ".forecast-cards-container"
    );
    appendEl(forecastCardsContainer, this.cardContainer);
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
  metricMaxTemp,
  index,
  forecastArr
) {
  return new DayWeatherCard(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    imperialMinTemp,
    metricMinTemp,
    imperialMaxTemp,
    metricMaxTemp,
    index,
    forecastArr
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
