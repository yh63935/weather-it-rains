class WeatherCard {
  constructor(date, temp, icon) {
    this._date = date;
    this._temp = temp;
    this._icon = icon;
    this.cardContainer = createEl("div", "");
  }
  createCard() {
    const body = document.querySelector("body");
    const dateEl = createEl("p", this._date);
    const tempEl = createEl("p", this._temp);
    const iconEl = createEl("img", this._icon);
    appendEl(body, this.cardContainer);
    appendEl(this.cardContainer, dateEl, tempEl, iconEl);
  }
}

// Better to use something else since there will be only one copy of this?
class CurrentWeatherCard extends WeatherCard {
  constructor(
    date,
    temp,
    icon,
    location,
    conditionText,
    feelsLike,
    humidity,
    chanceRain,
    windSpeed
  ) {
    super(date, temp, icon);
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
  constructor(date, temp, icon, minTemp, maxTemp) {
    super(date, temp, icon);
    this._minTemp = minTemp;
    this._maxTemp = maxTemp;
  }
  convertDateToDay() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const index = new Date(this._date).getDay();
    return days[index];
  }
  createCard() {
    super.createCard();
    const day = this.convertDateToDay();
    const dayEl = createEl("p", day);
    const minTempEl = createEl("p", this._minTemp);
    const maxTempEl = createEl("p", this._maxTemp);
    appendEl(this.cardContainer, dayEl, minTempEl, maxTempEl);
  }
}

// Factory function to create instances of a current day card
function CreateCurrentDayCard(
  date,
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
    date,
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
function CreateForecastDayCard(date, temp, icon, minTemp, maxTemp) {
  return new DayWeatherCard(date, temp, icon, minTemp, maxTemp);
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

export { CurrentWeatherCard, DayWeatherCard };
