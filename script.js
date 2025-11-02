// DOM elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");
const API_KEY = "f3afd44bccfc21c8f16076f4876395f1";

// click event listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city === "") {
        weatherResult.textContent = "Please enter a city name!";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            // flags
            const countryCode = data.sys.country.toLowerCase();
            const flagUrl = `https://flagcdn.com/48x36/${countryCode}.png`;

            // display weather + flags
            weatherResult.innerHTML = `
                <h2>
                    ${data.name}, ${data.sys.country} 
                    <img src="${flagUrl}" alt="${data.sys.country} flag">
                </h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => {
            weatherResult.textContent = error.message;
        });
});
