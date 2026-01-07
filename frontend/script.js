// const API_KEY = " ";
const API_KEY = "YOUR_API_KEY_HERE";
const searchBtn = document.getElementById("searchBtn");
const statusText = document.getElementById("status");

searchBtn.addEventListener("click", getWeather);
const cityInput = document.getElementById("cityInput");

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});


function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const city = cityInput.value.trim();

  if (!city) {
    statusText.innerText = "Please enter a city name";
    return;
  }

  statusText.innerText = "Fetching weather...";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then(data => updateUI(data))
    .catch(err => {
      statusText.innerText = err.message;
    });
}

function updateUI(data) {
  statusText.innerText = "";

  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temperature").innerText =
    Math.round(data.main.temp) + "°C";
  document.getElementById("condition").innerText =
    data.weather[0].main;
  document.getElementById("humidity").innerText =
    data.main.humidity + "%";
  document.getElementById("wind").innerText =
    data.wind.speed + " km/h";

  document.getElementById("sunrise").innerText =
    formatTime(data.sys.sunrise);
  document.getElementById("sunset").innerText =
    formatTime(data.sys.sunset);
}

function formatTime(unixTime) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

