// Utility functions for formatting and presenting data

// Return formatted units for imperial/metric system based on input units
function formattedImperialMetricUnit(unit) {
  switch (unit) {
    case "f":
      return "°F";
    case "c":
      return "°C";
    case "mi":
      return "mi/h";
    case "km":
      return "km/h";
  }
}

// Returns formatted value with appropriate unit
function formattedValueWithUnit(value, unit) {
  // If formatted imperial metric unit exists, set the unit as the formatted imperial metric unit
  if (formattedImperialMetricUnit(unit)) {
    unit = formattedImperialMetricUnit(unit);
  }
  return `${value} ${unit}`;
}

// Create a forecast view toggler to toggle forecast view and return the current view
function createForecastViewToggler() {
  // Default view is day
  let view = "day";

  const toggleView = () => {
    view = view === "day" ? "hourly" : "day";
  };

  // Toggle view based on clicked element
  const toggleViewBasedOnClickedEl = (clickedEl) => {
    // Toggle the view if it is the display day forecast or display hourly forecast button
    if (
      clickedEl.classList.contains("display-day-forecast") ||
      clickedEl.classList.contains("display-hourly-forecast")
    ) {
      toggleView();
    }
  };

  // Return current view
  const getView = () => view;

  return {
    toggleViewBasedOnClickedEl,
    getView,
  };
}

export { formattedValueWithUnit, createForecastViewToggler };
