import { parseWeatherData, getUserLocationWeatherData } from "./api.js";
import {
  clearContainer,
  getWeatherImageFromConditionText,
  setBackgroundImage,
} from "./utils/domUtils.js";
import { createForecastViewToggler } from "./utils/formatUtils.js";
import {
  renderCurrentWeatherCard,
  renderDayWeatherCards,
  renderHourlyWeatherCards,
  getDayWeatherCards,
  getHourlyWeatherCards,
  renderForecastDisplay,
} from "./renderCards.js";

// Initialize weather app with default location of San Jose
initializeWeatherAppWithLocation("San Jose");

// Get input elements
const userLocationInput = document.querySelector("#search-location");
const searchButton = document.querySelector(".search-button");

// Initializes app with user location weather data when user presses Enter or the search button
userLocationInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleUserInputAndInitializeApp();
  }
});

searchButton.addEventListener("click", (e) => {
  handleUserInputAndInitializeApp();
});

// Initialize weather app with the user location provided
function initializeWeatherAppWithLocation(userLocation) {
  const currentWeatherContainer = document.querySelector(
    ".current-weather-container"
  );
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );
  const errorMsgEl = document.querySelector(".error-msg");

  // Variable that determines if user lcoation is valid
  let isValidUserLocation = false;

  // Get weather data for the user location
  getUserLocationWeatherData(userLocation)
    .then((userLocationWeatherData) => {
      // Clear containers and initialize app if API request for user location is valid
      isValidUserLocation = true;
      clearContainer(currentWeatherContainer);
      clearContainer(forecastCardsContainer);
      initialize(userLocationWeatherData);
    })
    .catch((err) => {
      console.log(`Error in initializing weather app: ${err.message}`);
    })
    .finally(() => {
      // Toggle the error message visibility based on if user location is valid
      errorMsgEl.style.display = isValidUserLocation ? "none" : "block";
    });
}

// Initialize app with user location weather data
async function initialize(userLocationWeatherData) {
  // Get parsed weather data
  const parsedData = parseWeatherData(userLocationWeatherData);
  const forecastArr = userLocationWeatherData.forecast.forecastday;
  const currentWeatherContainer = document.querySelector(
    ".current-weather-container"
  );
  const forecastCardsContainer = document.querySelector(
    ".forecast-cards-container"
  );

  // Set background image based on weather condition
  const backgroundImageContainer = document.querySelector(".weather-app");
  const backgroundWeatherImage = getWeatherImageFromConditionText(
    parsedData.condition.text
  );
  setBackgroundImage(backgroundImageContainer, backgroundWeatherImage);

  // Create forecast view toggler to be used across functions
  let forecastViewToggler = createForecastViewToggler();

  // Render current weather and day weather cards with data
  let currentWeatherCard = renderCurrentWeatherCard(
    forecastArr,
    parsedData,
    currentWeatherContainer
  );
  renderDayWeatherCards(forecastArr, parsedData, forecastCardsContainer);

  // Buttons that will toggle hourly forecast
  const displayDayForecastBtn = document.querySelector(".display-day-forecast");
  const prevHrIntervalBtn = document.querySelector(".prev-interval");
  const nxtHrIntervalBtn = document.querySelector(".nxt-interval");
  const hourlyViewBtns = [
    displayDayForecastBtn,
    prevHrIntervalBtn,
    nxtHrIntervalBtn,
  ];

  // Display associated hourly forecast for the associated day card when clicked
  forecastCardsContainer.addEventListener("click", (e) => {
    const selectedCard = e.target.closest(".day-weather-card");
    const selectedBtn = e.target.closest(".day-weather-card button");

    // Render forecast display only if the button selected is a button that is a child of .day-weather-card
    // This means it would be a "display hourly button"
    if (selectedBtn && selectedCard) {
      let interval = 0;
      renderForecastDisplay(
        forecastCardsContainer,
        renderHourlyWeatherCards,
        forecastViewToggler,
        {
          selectedCard,
          forecastArr,
          forecastCardsContainer,
          interval,
        },
        selectedBtn,
        hourlyViewBtns
      );

      // Navigate to and render the previous hourly forecast interval (if it exists)
      prevHrIntervalBtn.addEventListener("click", (e) => {
        // Ensure that the new interval value stays within indexes of 0 to 2 (0 - 24 hours)
        // preventing it from exceeding the bounds of a single day's hourly forecast.
        interval = interval <= 0 ? 0 : interval - 1;
        renderForecastDisplay(
          forecastCardsContainer,
          renderHourlyWeatherCards,
          forecastViewToggler,
          {
            selectedCard,
            forecastArr,
            forecastCardsContainer,
            interval,
          },
          prevHrIntervalBtn,
          hourlyViewBtns
        );
      });

      // Navigate to and render the next hourly forecast interval (if it exists)
      nxtHrIntervalBtn.addEventListener("click", () => {
        // Ensure that the new interval value stays within indexes of 0 to 2 (0 - 24 hours)
        // preventing it from exceeding the bounds of a single day's hourly forecast.
        interval = interval >= 2 ? 2 : interval + 1;

        renderForecastDisplay(
          forecastCardsContainer,
          renderHourlyWeatherCards,
          forecastViewToggler,
          {
            selectedCard,
            forecastArr,
            forecastCardsContainer,
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
      forecastCardsContainer,
      renderDayWeatherCards,
      forecastViewToggler,
      {
        forecastArr,
        parsedData,
        forecastCardsContainer,
      },
      displayDayForecastBtn,
      hourlyViewBtns
    );
  });

  // Display imperial/metric units of all elements when convertImperialMetricBtn is clicked
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

// Takes user input and uses it to initialize the weather app
function handleUserInputAndInitializeApp() {
  let userLocation = userLocationInput.value;

  initializeWeatherAppWithLocation(userLocation);

  // Clear user input after pressing enter
  userLocationInput.value = "";
}
