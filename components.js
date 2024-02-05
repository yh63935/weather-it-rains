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

export default weatherCard;
