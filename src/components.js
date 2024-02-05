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

export default CurrentWeatherCard;
