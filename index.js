let weather = {
    paris: {
      temp: 19.7,
      humidity: 80
    },
    tokyo: {
      temp: 17.3,
      humidity: 50
    },
    lisbon: {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    moscow: {
      temp: -5,
      humidity: 20
    }
  };
  
  let city = prompt("Enter a city?");
  city = city.toLowerCase();
  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;
    let celsiusTemperature = Math.round(temperature);
    let fahrenheitTemperature = Math.round((temperature * 9) / 5 + 32);
  
    alert(
      `It is currently ${celsiusTemperature}°C (${fahrenheitTemperature}°F) in ${city} with a humidity of ${humidity}%`
    );
  } else {
    alert(
      `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
    );
  }
  

  
let now = new Date();
let time = document.querySelector(".time");

let days = [
  "Sun",
  "Mon",
  "Tuesday",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

time.innerHTML = `${day} ${hours}:${minutes}`;


function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-text");

  let city = document.querySelector("#city");
  city.innerHTML = input.value;

}

let form = document.querySelector("#search");
form.addEventListener("submit", search);

   
/*function searchCity(event) {
  event.preventDefault();
  let city = document.getElementById("cityInput").value;
  document.getElementById("city").textContent = city;
}
*/
function showWeather(response) {
  let cityElement = document.getElementById("city");
  let temperatureElement = document.querySelector(".current h1");
  let temperature = Math.round(response.data.main.temp);
  
  cityElement.textContent = response.data.name;
  temperatureElement.textContent = `${temperature}°C`;
}

function fetchWeather(city) {
  let apiKey = "c6f8ef4575250284954db9f4dfa7a996"; // Replace with your actual API key
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  axios.get(url).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.getElementById("search-text");
  let city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
}

function getCurrentLocation() {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "c6f8ef4575250284954db9f4dfa7a996"; // Replace with your actual API key
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    axios.get(url).then(showWeather);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

document.getElementById("search").addEventListener("submit", handleSearch);
document.getElementById("current-location").addEventListener("click", getCurrentLocation);
