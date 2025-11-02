// DOM elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");

// click event listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city === "") {
        weatherResult.textContent = "Please enter a city name!";
        return;
    }
    weatherResult.textContent = `You searched for: ${city}`;
});