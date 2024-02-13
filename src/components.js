import { convertAmPm, addLabel } from "./utils.js";
class WeatherCard {
  constructor(timeMeasurement, imperialTemp, metricTemp, icon) {
    this._timeMeasurement = timeMeasurement;
    this._imperialTemp = imperialTemp;
    this._metricTemp = metricTemp;
    this.tempUnit = "f";
    this._icon = icon;
    this.cardContainer = createEl("div", "");
    this.imperial = true;
  }
  formatTimeMeasurement() {
    return this._timeMeasurement;
  }
  createCard() {
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
    this.imperial = !this.imperial;
    this.updateImperialMetricLabels();
  }
  // Update imperial and metric labels
  updateImperialMetricLabels() {
    this.tempUnit = this.imperial ? "f" : "c";
    this.updateImperialMetricLabel(
      ".temp",
      this._imperialTemp,
      this._metricTemp,
      this.tempUnit
    );
    // const tempEls = this.cardContainer.querySelectorAll(".temp");

    // for (const tempEl of tempEls) {
    //   tempEl.innerText = addLabel(
    //     this.imperial ? this._imperialTemp : this._metricTemp,
    //     this.tempUnit
    //   );
    // }
    if (this.speedUnit) {
      this.speedUnit = this.imperial ? "mi" : "km";
    }
    const windSpeedEl = this.cardContainer.querySelector(".wind-speed");
    windSpeedEl.innerText = addLabel(this._windSpeed, this.speedUnit);
  }
  updateImperialMetricLabel(className, imperialValue, metricValue, unit) {
    const el = this.cardContainer.querySelector(className);
    el.innerText = addLabel(this.imperial ? imperialValue : metricValue, unit);
  }
}

// Better to use something else since there will be only one copy of this?
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
    windSpeed
  ) {
    super(
      timeMeasurement,
      imperialTemp,
      metricTemp,
      imperialFeelsLikeTemp,
      metricFeelsLikeTemp,
      icon
    );
    this._location = location;
    this._conditionText = conditionText;
    this.speedUnit = "mi";
    this._humidity = humidity;
    this._chanceRain = chanceRain;
    this._windSpeed = windSpeed;
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
  updateImperialMetricLabels() {
    super.updateImperialMetricLabel(
      ".temp",
      this._imperialTemp,
      this._metricTemp,
      this.tempUnit
    );
    this.updateImperialMetricLabel(
      ".feels-like",
      this._imperialFeelsLikeTemp,
      this._metricFeelsLikeTemp,
      this.tempUnit
    );
  }
}

class DayWeatherCard extends WeatherCard {
  constructor(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    minTemp,
    maxTemp
  ) {
    super(timeMeasurement, imperialTemp, metricTemp, icon);
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
  imperialTemp,
  metricTemp,
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
    imperialTemp,
    metricTemp,
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
function CreateForecastDayCard(
  timeMeasurement,
  imperialTemp,
  metricTemp,
  icon,
  minTemp,
  maxTemp
) {
  return new DayWeatherCard(
    timeMeasurement,
    imperialTemp,
    metricTemp,
    icon,
    minTemp,
    maxTemp
  );
}
// Factory function to create instances of a hourly card
function CreateHourlyCard(timeMeasurement, imperialTemp, metricTemp, icon) {
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

export { CreateCurrentDayCard, CreateForecastDayCard, CreateHourlyCard };
