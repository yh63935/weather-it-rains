// Convert the hours of a date to am or pm
function convertAmPm(time, withMinutes) {
  const formattedHrsMin = withMinutes
    ? time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : time.toLocaleTimeString([], { hour: "numeric" });
  return formattedHrsMin;
}

// Determine appropriate labels for imperial/metric system
function determineImperialMetricLabel(label) {
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

// Add appropriate labels to elements displayed
function addLabel(unit, label) {
  if (determineImperialMetricLabel(label)) {
    label = determineImperialMetricLabel(label);
  }
  return `${unit} ${label}`;
}

// Convert time to hours
function convertTimeToHours(time) {
  const hour = new Date(time).getHours();
  return hour;
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

export { convertAmPm, addLabel, convertTimeToHours, createForecastViewToggler };
