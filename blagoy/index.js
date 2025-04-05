const apiKey = 'b1b15e88fa797225412429c1c50c122a1';
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('city');
const weatherData = document.getElementById('weatherData');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');

searchBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    fetchWeather();
  }
});

function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  weatherData.style.display = 'none';
  errorMessage.style.display = 'none';
  loading.style.display = 'block';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Город не найден');
      }
      return response.json();
    })
    .then(data => {
      loading.style.display = 'none';
      weatherData.style.display = 'block';
      document.getElementById('temperature').textContent = `Температура: ${data.main.temp}°C`;
      document.getElementById('description').textContent = `Погода: ${data.weather[0].description}`;
      document.getElementById('humidity').textContent = `Влажность: ${data.main.humidity}%`;
      document.getElementById('wind').textContent = `Ветер: ${data.wind.speed} м/с`;
    })
    .catch(error => {
      loading.style.display = 'none';
      errorMessage.style.display = 'block';
    });
}
