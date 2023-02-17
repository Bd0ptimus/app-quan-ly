module.exports.dateToObj = (dateString) => {
  // Split the date string into year, month, and day using the hyphen as the delimiter
  const dateParts = dateString.split("-");

  // Create a new object with day, month, and year properties and return it
  const dateObject = {
    year: dateParts[0],
    month: dateParts[1],
    day: dateParts[2],
  };
  return dateObject;
};

module.exports.getCurrentDate = function () {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
