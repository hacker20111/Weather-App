const APIkey = "00d005fcce0b4aa68c04ee8be7f99d3e";

const cityInput = document.getElementById("input1");
const countryCode = document.getElementById("input2");
const btnSearch = document.getElementById("search-btn");

const cityName = document.querySelector(".city-name");
const temperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");

btnSearch.addEventListener("click", knoWeather);
cityInput.addEventListener("keyup", pressEnter);
countryCode.addEventListener("keyup", pressEnter);

function pressEnter(event) {
  if (event.key === "Enter") {
    knoWeather();
  }
}

async function knoWeather() {
  const city = cityInput.value.trim();
  const country = countryCode.value.trim().toUpperCase();

  if (!city) {
    errorMessage.textContent = "Please enter a city name";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APIkey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === "404") {
      throw new Error(
        "City not found. Please check the city name and country code."
      );
    }

    displayWeather(data);
    errorMessage.textContent = "";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    errorMessage.textContent =
      error.message || "An error occurred while fetching weather data";
    clearWeatherInfo();
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.src = iconUrl;
  weatherIcon.alt = data.weather[0].description;
  weatherIcon.style.display = "block";
}

function clearWeatherInfo() {
  cityName.textContent = "";
  temperature.textContent = "";
  weatherIcon.style.display = "none";
}
