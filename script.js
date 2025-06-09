const api = {
  key: "a5f6f75af202f41bc4a91dd030cfbc2e",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchInput = document.querySelector("#city-name");
const searchButton = document.querySelector("button");

searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});

function getWeather(city) {
  fetch(`${api.base}weather?q=${encodeURIComponent(city)}&units=metric&appid=${api.key}`)
    .then(response => response.json())
    .then(data => showWeather(data))
    .catch(err => {
      alert("Network error or bad API response.");
      console.error(err);
    });
}

function showWeather(weather) {
  if (weather.cod !== 200) {
    alert("City not found. Please try again.");
    return;
  }

  document.querySelector(".details h1").textContent = `${weather.name}, ${weather.sys.country}`;
  document.querySelector(".details .date").textContent = buildDate(new Date());
  document.querySelector(".details .temp").innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
  document.querySelector(".details .weather").textContent = weather.weather[0].main;
}

function buildDate(d) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
