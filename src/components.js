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
    this._cardContainer = weatherCardParams.cardContainer;

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

  // Creates and sets up the card
  // Adds card type, this.tempEl, iconEl, and appends appropriate elements to their respective containers
  createCard() {
    this.addCardType();
    // const body = document.querySelector("body");
    const timeMeasurementEl = createEl("p", this.formattedTimeMeasurement);

    // Create this.tempEl as property containing general temperature information
    // If this._imperialTemp exists, creates an element with the general temp information
    // Otherwise, assign an empty string
    this.tempEl = this._imperialTemp
      ? createEl(
          "p",
          formattedValueWithUnit(this._imperialTemp, this.tempUnit),
          "temp"
        )
      : "";

    // Create iconEl element to contain icon image
    const iconEl = createEl("img");
    iconEl.src = this._icon;

    // Append card to the card container element
    appendEl(this._cardContainer, this._card);

    // If this.tempEl exists, append it to the card
    if (this.tempEl) {
      appendEl(this._card, timeMeasurementEl, this.tempEl, iconEl);
    } else {
      appendEl(this._card, timeMeasurementEl, iconEl);
    }
  }

  // Toggle between imperial and metric system for the weather card
  toggleImperialMetric() {
    this.isImperial = !this.isImperial;
    this.updateImperialMetricUnits();
  }

  // Update imperial/metric values and units of multiple elements based on imperial/metric system selected
  // Base class only updates this.tempEl, but subclasses can override it to update additional elements
  updateImperialMetricUnits() {
    this.tempUnit = this.isImperial ? "f" : "c";
    this.updateImperialMetricUnit(
      this.tempEl,
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

  // Returns time measurement formatted in format of Month day-of-month, year time (12-hour clock format)
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

  // Creates currentWeatherCard with styling containers
  createCard() {
    super.createCard();

    this.createStylingContainers();
  }

  /* Create two extra div containers to hold information inside the current weather container for styling purposes
     <div class="current-weather-container">
       <div class="main-info">
         Base class card details here:
         <timeMeasurementEl>
         <conditionEl>
         <this.tempEl>
         <iconEl>
         <convertImperialMetricBtn>
       </div>
       <div class="weather-conditions"></div>
     </div>
   */
  createStylingContainers() {
    // Element that holds main information: date, temperature, condition, icon, and toggle imperial/metric button
    const mainWeatherInfoEl = this.createMainWeatherInfoEl();

    // Element that holds weather condition information:
    const additionalWeatherInfoEl = this.createAdditionalWeatherInfoEl();

    appendEl(this._card, mainWeatherInfoEl, additionalWeatherInfoEl);
  }

  createMainWeatherInfoEl() {
    const mainWeatherInfoEl = createEl("div", "", "main-info");

    // Move this._card's children elements to MainWeatherInfoEl container instead for styling purposes
    while (this._card.firstChild) {
      mainWeatherInfoEl.appendChild(this._card.firstChild);
    }

    // Add location element to mainWeatherInfoEl container
    const locationEl = createEl("p", this._location);
    appendEl(mainWeatherInfoEl, locationEl);

    const convertImperialMetricBtn = createEl(
      "button",
      `Display °C`,
      "convert-imperial-metric"
    );
    const iconEl = this._card.querySelector("img");

    // Move convertImperialMetricBtn before iconEl
    mainWeatherInfoEl.insertBefore(convertImperialMetricBtn, iconEl);

    // Move this.tempEl before conditionEl
    const conditionEl = createEl("p", this._conditionText, "conditions");
    mainWeatherInfoEl.insertBefore(conditionEl, this.tempEl);

    return mainWeatherInfoEl;
  }

  /* Create additionalWeatherInfoEl element to hold additional weather information stored in respective containers: feelsLike temperature, humidity, chance of rain, and windspeed
   <div class="additional-info">
     <feelsLikeContainer>
     <humidityContainer>
     <chanceOfRainContainer>
     <windSpeedContainer>
   </div>
 */

  createAdditionalWeatherInfoEl() {
    const additionalWeatherInfoEl = createEl("div", "", "additional-info");

    const feelsLikeContainer = this.createIndividualWeatherInfoContainer(
      "Feels Like",
      formattedValueWithUnit(this._imperialFeelsLikeTemp, this.tempUnit),
      "feels-like"
    );

    const humidityContainer = this.createIndividualWeatherInfoContainer(
      "Humidity",
      formattedValueWithUnit(this._humidity, "%", "humidity"),
      "humidity"
    );

    const chanceOfRainContainer = this.createIndividualWeatherInfoContainer(
      "Chance of Rain",
      formattedValueWithUnit(this._chanceOfRain, "%"),
      "chance-of-rain"
    );

    const windSpeedContainer = this.createIndividualWeatherInfoContainer(
      "Wind Speed",
      formattedValueWithUnit(this._imperialWindSpeed, this.speedUnit),
      "wind-speed"
    );

    appendEl(
      additionalWeatherInfoEl,
      feelsLikeContainer,
      humidityContainer,
      chanceOfRainContainer,
      windSpeedContainer
    );

    return additionalWeatherInfoEl;
  }

  /* Creates containers for individual weather information such as feelsLike information, humidity information
      Containers will have the structure below: 

      <div class="feels-like-container">
        <p class="feels-like-label">Feels Like</p>
        <p class="feels-like-value">60.8 °F</p>
      </div>
  */
  createIndividualWeatherInfoContainer(label, value, weatherInfoType) {
    const individualWeatherInfoContainer = createEl(
      "div",
      "",
      `${weatherInfoType}-container`
    );

    const individualWeatherLabel = createEl(
      "p",
      label,
      `${weatherInfoType}-label`
    );

    const individualWeatherValue = createEl(
      "p",
      value,
      `${weatherInfoType}-value`
    );

    appendEl(
      individualWeatherInfoContainer,
      individualWeatherLabel,
      individualWeatherValue
    );

    return individualWeatherInfoContainer;
  }

  // Toggle between imperial and metric system for the card to update convertImperialMetricBtn
  toggleImperialMetric() {
    super.toggleImperialMetric();
    // Change? This may need to be refactored further since toggleImperialMetric should just do one thing toggle --> Single responsibility
    this.updateConvertImperialMetricBtnText();
  }

  // Update convertImperialMetricBtn's text based on imperial/metric system
  updateConvertImperialMetricBtnText() {
    const convertImperialMetricBtn = document.querySelector(
      ".convert-imperial-metric"
    );
    // Change? Maybe change this display to something else since it also change km and mi? maybe display imperial/metric r
    const altTempUnit = this.tempUnit === "c" ? "f" : "c";
    convertImperialMetricBtn.innerText = `Display °${altTempUnit.toUpperCase()}`;
  }

  // Updates imperial metric units for additional elements of feelsLikeValueEl, windSpeedValueEl
  updateImperialMetricUnits() {
    super.updateImperialMetricUnits();
    this.speedUnit = this.isImperial ? "mi" : "km";

    // Get additional elements to update from card
    const feelsLikeValueEl = this._card.querySelector(".feels-like-value");
    const windSpeedValueEl = this._card.querySelector(".wind-speed-value");

    // Update feelsLikeValueEl with respective imperial metric values and units
    this.updateImperialMetricUnit(
      feelsLikeValueEl,
      this._imperialFeelsLikeTemp,
      this._metricFeelsLikeTemp,
      this.tempUnit
    );

    // Update windSpeel with respective imperial metric values and units
    this.updateImperialMetricUnit(
      windSpeedValueEl,
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
    // this._cardContainer = dayWeatherCardParams.cardContainer;

    // Other properties
    this._cardType = "day-weather-card";
  }

  // Returns time measurement formatted as the day of the week
  get formattedTimeMeasurement() {
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

  // Creates dayWeatherCard that has additional elements of displayHourlyForecastBtn, this.minTempEl, this.maxTempEl
  createCard() {
    super.createCard();

    // Create button to display hourly forecast data
    const displayHourlyForecastBtn = createEl(
      "button",
      "Display hourly forecast",
      "display-hourly-forecast"
    );

    // Create this.minTempEl to contain minimum temperature information
    this.minTempEl = createEl(
      "p",
      formattedValueWithUnit(this._imperialMinTemp, this.tempUnit),
      "min-temp"
    );

    // Create this.maxTempEl to contain maximum temperature information
    this.maxTempEl = createEl(
      "p",
      formattedValueWithUnit(this._imperialMaxTemp, this.tempUnit),
      "max-temp"
    );

    appendEl(
      this._card,
      displayHourlyForecastBtn,
      this.minTempEl,
      this.maxTempEl
    );
  }

  // Updates imperial metric units for additional elements of this.minTempEl, this.maxTempEl
  updateImperialMetricUnits() {
    super.updateImperialMetricUnits();

    this.updateImperialMetricUnit(
      this.minTempEl,
      this._imperialMinTemp,
      this._metricMinTemp,
      this.tempUnit
    );

    this.updateImperialMetricUnit(
      this.maxTempEl,
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

  // Return formatted hour in 12-hour clock format with AM/PM
  // Ex: 11 PM
  get formattedTimeMeasurement() {
    const date = new Date(this._timeMeasurement);
    const formattedHour = convertAmPm(date);
    return formattedHour;
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
