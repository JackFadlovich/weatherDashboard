const apiKey = '34135c0aeed98d4a373858b72310f84d';

const form = document.getElementById('city-search-form');
const cityInput = document.getElementById('city-input');
const searchHistoryContainer = document.getElementById('search-history');
const currentDetails = document.getElementById('current-details');
const forecastDetails = document.getElementById('forecast-details');
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

function getWeatherData(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

 fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => displayCurrentWeather(data))
        .catch(error => console.error('Error fetching current data', error));

fetch(forecastUrl)
    .then(response => response.json())
    .then(data => displayForecast(data))
    .catch(error => console.error('Error fetching forcast data:', error));
}
function addToSearchHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        updateSearchHistory();
    }}
    function updateSearchHistory() {
        searchHistoryContainer.innerHTML = '';
        searchHistory.forEach(city => {
            const historyButton = document.createElement('button');
            historyButton.textContent = city;
            historyButton.addEventListener('click', () => getWeatherData(city));
            searchHistoryContainer.appendChild(historyButton);
        });}
        form.addEventListener('submit', event => {
            event.preventDefault();
            const city = cityInput.value.trim();
            if (city) {
                getWeatherData(city);
                addToSearchHistory(city);
                cityInput.value = '';
            }});
            function displayCurrentWeather(data) {
                const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                currentDetails.innerHTML = `
                    <h3>${data.name} (${new Date().toLocaleDateString()})</h3>
                    <img src="${weatherIcon}" alt="${data.weather[0].description}">
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;}
            function displayForecast(data) {
                forecastDetails.innerHTML = '';
                const dailyData = data.list.filter(entry => entry.dt_txt.includes('12:00:00'));
            
                dailyData.forEach(day => {
                    const weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
                    const date = new Date(day.dt_txt).toLocaleDateString();
                    const temp = day.main.temp;
                    const humidity = day.main.humidity;
                    const windSpeed = day.wind.speed;
            
                    const forecastCard = document.createElement('div');
                    forecastCard.classList.add('forecast-card');
                    forecastCard.innerHTML = `
                        <h4>${date}</h4>
                        <img src="${weatherIcon}" alt="${day.weather[0].description}">
                        <p>Temp: ${temp} °C</p>
                        <p>Wind: ${windSpeed} m/s</p>
                        <p>Humidity: ${humidity}%</p>
                    `;
                    forecastDetails.appendChild(forecastCard);
                });
            }
            
updateSearchHistory();