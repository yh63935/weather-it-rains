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

// Get the 8 hour interval from the current time of selected date
function getEightHourForecast() {
  const selectedDate = new Date();
  const hour = convertTimeToHours(selectedDate);
  console.log("hour", hour);
  const start = hour + 1;
  const end = hour + 8;
  console.log("start", start);
  console.log("end", end);
  return { start, end };
}
