import { parseWeatherData, getUserLocationWeatherData } from "./api.js";
import { createCurrentWeatherCard } from "./components.js";
import { clearContainer } from "./utils/domUtils.js";
import { createForecastViewToggler } from "./utils/formatUtils.js";
import {
  renderCurrentWeatherCard,
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderForecastDisplay,
} from "./renderCards.js";

initializeWeatherAppWithLocation("San Jose");

// Initializes app with user location weather data when user presses Enter
let userLocationInput = document.querySelector("#search-location");

userLocationInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let userLocation = userLocationInput.value;

    initializeWeatherAppWithLocation(userLocation);

    // Clear user input after pressing enter
    userLocationInput.value = "";
  }
});

// Initialize weather app with location
function initializeWeatherAppWithLocation(userLocation) {
  const currentWeatherContainer = document.querySelector(
    ".current-weather-container"
  );
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
  const errorMsgEl = document.querySelector(".error-msg");
  let isValidUserLocation = false;
  getUserLocationWeatherData(userLocation)
    .then((userLocationWeatherData) => {
      // Only clear containers and initialize app if API request for user location is valid
      isValidUserLocation = true;
      clearContainer(currentWeatherContainer);
      clearContainer(forecastCardsContainer);
      initialize(userLocationWeatherData);
    })
    .catch((err) => {
      console.log(`Error in initializing weather app: ${err.message}`);
    })
    .finally(() => {
      // Toggle the error message vsibility based on if user location is valid
      errorMsgEl.style.display = isValidUserLocation ? "none" : "block";
    });
}

// Initialize app
async function initialize(userLocationWeatherData) {
  const parsedData = parseWeatherData(userLocationWeatherData);
  const forecastArr = userLocationWeatherData.forecast.forecastday;
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
  const userLocationInput = document.querySelector("#location");
  let forecastViewToggler = createForecastViewToggler();
  let currentWeatherCard = renderCurrentWeatherCard(forecastArr, parsedData);
  renderDayWeatherCards(forecastArr, parsedData);

  const displayDayForecastBtn = document.querySelector(".display-day-forecast");
  const prevHrIntervalBtn = document.querySelector(".prev-interval");
  const nxtHrIntervalBtn = document.querySelector(".nxt-interval");
  const hourlyViewBtns = [
    displayDayForecastBtn,
    prevHrIntervalBtn,
    nxtHrIntervalBtn,
  ];

  // Display associated hourly forecast for the selected button of the day card when clicked
  forecastCardsContainer.addEventListener("click", (e) => {
    const selectedCard = e.target.closest(".day-weather-card");
    const selectedBtn = e.target.closest(".day-weather-card button");

    if (selectedBtn && selectedCard) {
      let interval = 0;
      renderForecastDisplay(
        renderHourlyWeatherCards,
        forecastViewToggler,
        {
          selectedCard,
          forecastArr,
          interval,
        },
        selectedBtn,
        hourlyViewBtns
      );

      prevHrIntervalBtn.addEventListener("click", (e) => {
        // Ensure that the new interval value stays within indexes of 0 to 2 (0 - 24 hours)
        // preventing it from exceeding the bounds of a single day's hourly forecast.
        interval = interval <= 0 ? 0 : interval - 1;
        renderForecastDisplay(
          renderHourlyWeatherCards,
          forecastViewToggler,
          {
            selectedCard,
            forecastArr,
            interval,
          },
          prevHrIntervalBtn,
          hourlyViewBtns
        );
      });

      nxtHrIntervalBtn.addEventListener("click", () => {
        // Ensure that the new interval value stays within indexes of 0 to 2 (0 - 24 hours)
        // preventing it from exceeding the bounds of a single day's hourly forecast.
        interval = interval >= 2 ? 2 : interval + 1;

        renderForecastDisplay(
          renderHourlyWeatherCards,
          forecastViewToggler,
          {
            selectedCard,
            forecastArr,
            interval,
          },

          nxtHrIntervalBtn,
          hourlyViewBtns
        );
      });
    }
  });

  // Display day forecast when displayDayForecastBtn is clicked
  displayDayForecastBtn.addEventListener("click", () => {
    renderForecastDisplay(
      renderDayWeatherCards,
      forecastViewToggler,
      {
        forecastArr,
        parsedData,
      },
      displayDayForecastBtn,
      hourlyViewBtns
    );
  });

  // Display imperial/metric units when convertImperialMetricBtn is clicked
  const convertImperialMetricBtn = document.querySelector(
    ".convert-imperial-metric"
  );
  convertImperialMetricBtn.addEventListener("click", () => {
    currentWeatherCard.toggleImperialMetric();
    const dayWeatherCards = getDayWeatherCards();
    const hourlyWeatherCards = getHourlyWeatherCards();
    dayWeatherCards.forEach((dayWeatherCard) => {
      dayWeatherCard.toggleImperialMetric();
    });
    hourlyWeatherCards.forEach((hourlyWeatherCard) => {
      hourlyWeatherCard.toggleImperialMetric();
    });
  });
}
