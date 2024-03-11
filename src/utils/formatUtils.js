// Utility functions for formatting and presenting data

// Return formatted labels for imperial/metric system based on input labels
function formattedImperialMetricLabel(label) {
  switch (label) {
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

// Returns formatted unit with appropriate label
function formattedUnitWithLabel(unit, label) {
  // If formatted imperial metric label exists, set the label as the formatted imperial metric label
  if (formattedImperialMetricLabel(label)) {
    label = formattedImperialMetricLabel(label);
  }
  return `${unit} ${label}`;
}

// Create a forecast view toggler to toggle forecast view and return the current view
function createForecastViewToggler() {
  let view = "day";
  const toggleView = () => {
    view = view === "day" ? "hourly" : "day";
  };

  const getView = () => view;

  return {
    toggleView,
    getView,
  };
}

export { formattedUnitWithLabel, createForecastViewToggler };
