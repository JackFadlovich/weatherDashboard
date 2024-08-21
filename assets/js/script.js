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
            
updateSearchHistory();