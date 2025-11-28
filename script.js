let cityInput = document.getElementById("city-input");
let getWeatherBtn = document.getElementById("get-weather-btn");
let weatherInfo = document.getElementById("weather-info");
let cityName = document.getElementById("city-name");
let temperature = document.getElementById("temperature");
let description = document.getElementById("description");
let errorMessage = document.getElementById("error-message");

let API_KEY = `17de70af17b78e45017c92b8d4af3483`;

getWeatherBtn.addEventListener("click", function () {
    let city = cityInput.value.trim();

    if (city === "") {
        return;
    }

    fetchWeather(city);
});

cityInput.addEventListener("input", function () {
    if (cityInput.value.trim() === "") {
        weatherInfo.classList.add("hidden");
        errorMessage.classList.add("hidden");
    }
});

function fetchWeather(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod == "404") {
                showError();
                weatherInfo.classList.add("hidden");
            } else {
                showWeather(data);
            }
        })
        .catch(() => {
            showError();
        });
}

function showWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = "Temperature: " + data.main.temp + "°C";
    description.textContent = "Weather: " + data.weather[0].description;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
}

function showError() {
    errorMessage.classList.remove("hidden");
}
