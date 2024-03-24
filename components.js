import { convertAmPm } from "./utils/timeUtils.js";
import { formattedValueWithUnit } from "./utils/formatUtils.js";
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
    this._card = createEl("div", "");
    // Property to determine if it is imperial system or not (if not, it is metric system)
    this.isImperial = true; // Default is imperial system
  }

  get formattedTimeMeasurement() {
    return this._timeMeasurement;
  }

  addCardType() {
    this._card.classList.add(this._cardType);
  }

  createCard() {
    this.addCardType();
    const body = document.querySelector("body");
    const timeMeasurementEl = createEl("p", this.formattedTimeMeasurement);

    // Create tempEl element to contain general temperature information
    const tempEl = this._imperialTemp
      ? createEl(
          "p",
          formattedValueWithUnit(this._imperialTemp, this.tempUnit),
          "temp"
        )
      : "";

    // Create iconEl element to contain icon image
    const iconEl = createEl("img");
    iconEl.src = this._icon;

    appendEl(body, this._card);

    // If tempEl exists, append it to the card
    if (tempEl) {
      appendEl(this._card, timeMeasurementEl, tempEl, iconEl);
    } else {
      appendEl(this._card, timeMeasurementEl, iconEl);
    }
  }

  // Toggle between imperial and metric system for the weather card
  toggleImperialMetric() {
    this.isImperial = !this.isImperial;
    this.updateImperialMetricUnits();
  }

  // Update multiple imperial/metric values and units based on imperial/metric system selected
  // Base class only updates the tempEl element, but subclasses can override it to update additional elements
  updateImperialMetricUnits() {
    this.tempUnit = this.isImperial ? "f" : "c";
    this.updateImperialMetricUnit(
      ".temp",
      this._imperialTemp,
      this._metricTemp,
      this.tempUnit
    );
  }

  // Update imperial/metric values and units of an element
  updateImperialMetricUnit(el, imperialValue, metricValue, unit) {
    if (el) {
      el.innerText = formattedValueWithUnit(
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

  // Returns time measurement formatted in format of Month day-of-month, year time(12-hour clock format)
  // Ex: March 22, 2024 11:52 PM
  get formattedTimeMeasurement() {
    const date = new Date(this._timeMeasurement);
    const day = date.getDate();
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
    appendEl(currentWeatherContainer, this._card);

    this.createStylingContainers();
  }
  /* Create two extra div containers to hold information inside the current weather container for styling purposes
     <div class="current-weather-container">
       <div class="main-info">
         Base class card details here (timeMeasurementEl, tempEl, iconEl)
       </div>
       <div class="weather-conditions"></div>
     </div>
   */
  createStylingContainers() {
    const mainInfoEl = this.createMainInfoEl();
    const weatherConditionsEl = this.createWeatherConditionsEl();

    appendEl(this._card, mainInfoEl, weatherConditionsEl);
  }

  createMainInfoEl() {
    const mainInfoEl = createEl("div", "", "main-info");

    // Move this._card's elements to mainInfo container instead for styling purposes
    while (this._card.firstChild) {
      mainInfoEl.appendChild(this._card.firstChild);
    }
    // Add location element to mainInfo container
    const locationEl = createEl("p", this._location);
    appendEl(mainInfoEl, locationEl);
    const convertImperialMetricBtn = createEl(
      "button",
      `Display °C`,
      "convert-imperial-metric"
    );
    const tempEl = this._card.querySelector(".temp");
    const iconEl = this._card.querySelector("img");
    mainInfoEl.insertBefore(convertImperialMetricBtn, iconEl);
    const conditionEl = createEl("p", this._conditionText, "conditions");
    mainInfoEl.insertBefore(conditionEl, tempEl);

    return mainInfoEl;
  }
  createWeatherConditionsEl() {
    const weatherConditionsEl = createEl("div", "", "weather-conditions");

    const feelsLikeEl = createEl(
      "p",
      formattedValueWithUnit(this._imperialFeelsLikeTemp, this.tempUnit),
      "feels-like"
    );
    const humidityEl = createEl(
      "p",
      formattedValueWithUnit(this._humidity, "%")
    );
    const chanceOfRainEl = createEl(
      "p",
      formattedValueWithUnit(this._chanceOfRain, "%")
    );
    const windSpeedEl = createEl(
      "p",
      formattedValueWithUnit(this._imperialWindSpeed, this.speedUnit),
      "wind-speed"
    );

    appendEl(
      weatherConditionsEl,
      feelsLikeEl,
      humidityEl,
      chanceOfRainEl,
      windSpeedEl
    );

    return weatherConditionsEl;
  }

  // Toggle between imperial and metric system for the card to update convertImperialMetricBtn
  toggleImperialMetric() {
    super.toggleImperialMetric();
    this.toggleConvertImperialMetricBtn();
  }

  // Update convertImperialMetricBtn's text based on imperial/metric system
  toggleConvertImperialMetricBtn() {
    const convertImperialMetricBtn = document.querySelector(
      ".convert-imperial-metric"
    );
    const altTempUnit = this.tempUnit === "c" ? "f" : "c";
    convertImperialMetricBtn.innerText = `Display °${altTempUnit.toUpperCase()}`;
  }

  // Updates imperial metric units for additional elements of feelsLikeEl, windSpeedEl
  updateImperialMetricUnits() {
    super.updateImperialMetricUnits();
    this.speedUnit = this.isImperial ? "mi" : "km";

    // Update feelsLikeEl with respective imperial metric values and units
    this.updateImperialMetricUnit(
      ".feels-like",
      this._imperialFeelsLikeTemp,
      this._metricFeelsLikeTemp,
      this.tempUnit
    );

    // Update windSpeel with respective imperial metric values and units
    this.updateImperialMetricUnit(
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
    this._card.dataset.index =
      dayWeatherCardParams.index % dayWeatherCardParams.forecastArr.length;

    // Other properties
    this._cardType = "day-weather-card";
  }
  // Convert time to day of the week
  get FormattedTimeMeasurement() {
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
    appendEl(forecastCardsContainer, this._card);
    const displayHourlyForecastBtn = createEl(
      "button",
      "Display hourly forecast",
      "display-hourly-forecast"
    );
    const minTempEl = createEl(
      "p",
      formattedValueWithUnit(this._imperialMinTemp, this.tempUnit),
      "min-temp"
    );
    const maxTempEl = createEl(
      "p",
      formattedValueWithUnit(this._imperialMaxTemp, this.tempUnit),
      "max-temp"
    );
    appendEl(this._card, displayHourlyForecastBtn, minTempEl, maxTempEl);
  }
  updateImperialMetricUnits() {
    super.updateImperialMetricUnits();
    this.updateImperialMetricUnit(
      ".min-temp",
      this._imperialMinTemp,
      this._metricMinTemp,
      this.tempUnit
    );
    this.updateImperialMetricUnit(
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
  get formattedTimeMeasurement() {
    const date = new Date(this._timeMeasurement);
    const formattedHour = convertAmPm(date);
    return formattedHour;
  }
  createCard() {
    super.createCard();
    const forecastCardsContainer = document.querySelector(
      ".forecast-cards-container"
    );
    appendEl(forecastCardsContainer, this._card);
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
