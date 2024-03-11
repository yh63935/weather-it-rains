// Utility functions for handling time-related operations

// Convert the hours of a date to am or pm
function convertAmPm(time, withMinutes) {
  const formattedHrsMin = withMinutes
    ? time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : time.toLocaleTimeString([], { hour: "numeric" });
  return formattedHrsMin;
}

// Convert time to hours
function convertTimeToHours(time) {
  const hour = new Date(time).getHours();
  return hour;
}

export { convertAmPm, convertTimeToHours };
