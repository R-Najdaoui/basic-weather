// DOM elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");
const API_KEY = "f3afd44bccfc21c8f16076f4876395f1";

// emoji based on weather
function getWeatherEmoji(description) {
    description = description.toLowerCase();
    if(description.includes("cloud")) return "☁️";
    if(description.includes("rain")) return "🌧️";
    if(description.includes("snow")) return "❄️";
    if(description.includes("storm") || description.includes("thunder")) return "⛈️";
    if(description.includes("sun") || description.includes("clear")) return "☀️";
    if(description.includes("fog") || description.includes("mist")) return "🌫️";
    return "🌡️"; // default
}

// click event listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city === "") {
        weatherResult.textContent = "Please enter a city name!";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            const countryCode = data.sys.country.toLowerCase();
            const flagUrl = `https://flagcdn.com/48x36/${countryCode}.png`;
            const emoji = getWeatherEmoji(data.weather[0].description);

            weatherResult.innerHTML = `
                <h2>
                    ${data.name}, ${data.sys.country} 
                    <img class="flag" src="${flagUrl}" alt="${data.sys.country} flag">
                </h2>
                <p>Temperature: ${data.main.temp}°C ${emoji}</p>
                <p>Weather: ${data.weather[0].description} ${emoji}</p>
                <p>Humidity: ${data.main.humidity}% 💧</p>
            `;
        })
        .catch(error => {
            weatherResult.textContent = error.message;
        });
});
