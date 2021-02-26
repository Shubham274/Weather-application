let fetchWeather = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateEement = document.querySelector(".date");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dateEement.textContent =
  new Date().getDate() +
  ", " +
  monthNames[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  locationElement.textContent = "Loading....";
  tempElement.textContent = "";
  weatherCondition.textContent = "";
  const locationApi = fetchWeather + "?address=" + search.value;
  fetch(locationApi).then((response) => {
    console.log(response);
    response.json().then((data) => {
      if (data.error) {
        locationElement.textContent = data.error;
        tempElement.textContent = "";
        weatherCondition.textContent = "";
      }

      data.description.includes("rain")
        ? (weatherIcon.className = "wi wi-day-rain")
        : data.description.includes("fog")
        ? (weatherIcon.className = "wi wi-day-fog")
        : data.description.includes("snow")
        ? (weatherIcon.className = "wi wi-day-snow")
        : (weatherIcon.className = "wi wi-day-cloudy");

      tempElement.textContent = (data.temperature - 273).toFixed(2) + "°C";
      locationElement.textContent = data.cityName;
      weatherCondition.textContent = data.description.toUpperCase();
    });
  });
});
