class WeatherCard {
  constructor(timeMeasurement, temp, icon) {
    this._timeMeasurement = timeMeasurement;
    this._temp = temp;
    this._icon = icon;
    this.cardContainer = createEl("div", "");
  }
  formatTimeMeasurement() {
    return this.timeMeasurement;
  }
  createCard() {
    const body = document.querySelector("body");
    const formattedTimeMeasurement = this.formatTimeMeasurement();
    const timeMeasurementEl = createEl("p", formattedTimeMeasurement);
    const tempEl = createEl("p", this._temp);
    const iconEl = createEl("img", this._icon);
    appendEl(body, this.cardContainer);
    appendEl(this.cardContainer, timeMeasurementEl, tempEl, iconEl);
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
  createCard() {
    super.createCard();
    const locationEl = createEl("p", this._location);
    const conditionEl = createEl("p", this._conditionText);
    const feelsLikeEl = createEl("p", this._feelsLike);
    const humidityEl = createEl("p", this._humidity);
    const chanceRainEl = createEl("p", this._chanceRain);
    const windSpeedEl = createEl("p", this._windSpeed);
    appendEl(
      this.cardContainer,
      locationEl,
      conditionEl,
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
    const minTempEl = createEl("p", this._minTemp);
    const maxTempEl = createEl("p", this._maxTemp);
    appendEl(this.cardContainer, minTempEl, maxTempEl);
  }
}
    appendEl(this.cardContainer, dayEl, minTempEl, maxTempEl);
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
function CreateHourlyCard(date, temp, icon) {
  return new WeatherCard(date, temp, icon);
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
