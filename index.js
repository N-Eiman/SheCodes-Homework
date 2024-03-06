function displayTemp(response) {
  //Icon update
  console.log(response);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src= ${response.data.condition.icon_url} class="current-temperature-icon" />`;

  //retrieve date
  let currentDateELement = document.querySelector("#current-date");
  currentDateELement.innerHTML = formatDate(currentDate);

  //retrieve city
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  //update weather condition
  let conditionElement = document.querySelector("#weather-condition");
  let condition = response.data.condition.description;
  conditionElement.innerHTML = condition;

  //update humidity
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity + "%";
  //update wind
  let wind = response.data.wind.speed;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(wind) + "km/h";
  //udate temperature
  let temperature = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = temperature;

  getDaysForecast(response.data.city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let apiKey = "3cb2babo00784f1f3eafe7ebatd350d2";
  cityElement.innerHTML = searchInputElement.value;
  let city = searchInputElement.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDate = new Date();

//create an event for the search icon so it works like a button
let searchIcon = document.querySelector("#search");
searchIcon.addEventListener("click", search);

let weatherForecast = document.querySelector("#weather-forecast");

function formatFutureDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayDaysForecast(response) {
  console.log(response.data.daily);
  let forecast = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast += `<div class="day-temp" id="temp">
            ${formatFutureDate(day.time)}</div>
            <div><img src=${
              day.condition.icon_url
            } alt="temperature icon" class="icon"></div>
            <div class="temp-unit">
              <span class="maximum-temperature">${Math.round(
                day.temperature.maximum
              )}° </span
              ><span class="minimum-temperature">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
            `;
      weatherForecast.innerHTML = forecast;
    }
  });
}

function getDaysForecast(city) {
  let apiKey = "3cb2babo00784f1f3eafe7ebatd350d2";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayDaysForecast);
}
