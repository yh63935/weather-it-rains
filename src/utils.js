// Convert the hours of a date to am or pm
function convertAmPm(time, withMinutes) {
  const formattedHrsMin = withMinutes
    ? time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : time.toLocaleTimeString([], { hour: "numeric" });
  return formattedHrsMin;
}

// Add appropriate labels to elements displayed
function addLabel(unit, label) {
  return `${unit} ${label}`;
}

export { convertAmPm, addLabel };
