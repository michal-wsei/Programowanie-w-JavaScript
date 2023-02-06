import "./styles.css";

import { nanoid } from "nanoid";

const CODE_ICON = {
  200: "11d",
  201: "11d",
  202: "11d",
  210: "11d",
  211: "11d",
  212: "11d",
  221: "11d",
  230: "11d",
  231: "11d",
  232: "11d",
  300: "09d",
  301: "09d",
  302: "09d",
  310: "09d",
  311: "09d",
  312: "09d",
  313: "09d",
  314: "09d",
  321: "09d",
  500: "10d",
  501: "10d",
  502: "10d",
  503: "10d",
  504: "10d",
  511: "13d",
  520: "09d",
  521: "09d",
  522: "09d",
  531: "09d",
  600: "13d",
  601: "13d",
  602: "13d",
  611: "13d",
  612: "13d",
  613: "13d",
  615: "13d",
  616: "13d",
  620: "13d",
  621: "13d",
  622: "13d",
  701: "50d",
  711: "50d",
  721: "50d",
  731: "50d",
  741: "50d",
  751: "50d",
  761: "50d",
  762: "50d",
  771: "50d",
  781: "50d",
  800: "01d",
  801: "02d",
  802: "03d",
  803: "04d",
  804: "04d"
};

// SUPER PRIVATE
const API_KEY = "e89131660d41bbea445f9f1acdc73457";

const DEFAULT_LOCATIONS = [
  { name: "San Francisco", lat: "37.774929", lon: "-122.419418" },
  { name: "Los Angeles", lat: "34.052235", lon: "-118.243683" },
  { name: "Tokyo", lat: "35.689487", lon: "139.691711" },
  { name: "Warsaw", lat: "52.229675", lon: "21.012230" }
];

const fetchWeather = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );

  const data = await response.json();

  return data;
};

const fetchLocation = async (cityName) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`
  );

  const data = await response.json();

  return data;
};

const getDefaultLocationsWeather = async () => {
  const locations = JSON.parse(localStorage.getItem("locations"))?.length
    ? JSON.parse(localStorage.getItem("locations"))
    : DEFAULT_LOCATIONS;

  const weather = await locations.reduce(async (acc, location) => {
    let array = await acc;

    const data = await fetchWeather(location.lat, location.lon);

    array.push(data);

    return array;
  }, Promise.resolve([]));

  return weather;
};

const createListItem = (weather) => {
  return `<li>
            Location: ${weather.name} ${weather.sys.country}, 
            Temp: ${weather.main.temp} °C, 
            Humidity: ${weather.main.humidity} % 
            <img src="http://openweathermap.org/img/wn/${
              CODE_ICON[weather.weather[0].id]
            }@2x.png">
          </li>`;
};

const setDefaultLocationsWeather = async () => {
  const weather = await getDefaultLocationsWeather();

  const locationsWeatherList = [...weather]
    .map((item) => createListItem(item))
    .join("");

  const container = document
    .querySelector("#default-locations")
    .querySelector("#container");

  container.innerHTML = `
                          <ul>
                            ${locationsWeatherList}
                          </ul>
                        `;
};

const searchWeather = async () => {
  const section = document.querySelector("#weather");
  const container = section.querySelector("#container");
  const city = document.querySelector("#search-city-input").value;

  section.querySelector("#weather-for").innerHTML = `Weather for ${city}`;

  const location = await fetchLocation(city);

  if (!location?.coord?.lat || !location?.coord?.lon) {
    container.innerHTML = "Unknown city";
    return;
  }

  const weather = await fetchWeather(location.coord.lat, location.coord.lon);

  container.innerHTML = `
                          <ul>
                            ${createListItem(weather)}
                          </ul>
                        `;
};

const displayAddedLocations = () => {
  const section = document.querySelector("#added-locations");
  const container = section.querySelector("#container");

  const locationsInStorage = JSON.parse(localStorage.getItem("locations"));

  if (!locationsInStorage) {
    container.innerHTML = "no added locations";
    return;
  }

  const list = locationsInStorage
    .map(
      (location) =>
        `<div>${location.name} <button data-id="${location.id}">Remove location</button></div>`
    )
    .join("");

  container.innerHTML = list;
};

const addLocation = async () => {
  const city = document.querySelector("#search-city-input").value;

  const location = await fetchLocation(city);

  if (!location?.coord?.lat || !location?.coord?.lon) {
    window.alert = "Unknown city";
    return;
  }

  const locationsInStorage = JSON.parse(localStorage.getItem("locations"));

  if (!locationsInStorage) {
    localStorage.setItem(
      "locations",
      JSON.stringify([
        {
          id: nanoid(),
          name: location.name,
          lat: location.coord.lat,
          lon: location.coord.lon
        }
      ])
    );

    displayAddedLocations();
    setDefaultLocationsWeather();

    return;
  }

  if (locationsInStorage.length === 10) {
    window.alert("> 10");
    return;
  }

  localStorage.setItem(
    "locations",
    JSON.stringify([
      ...locationsInStorage,
      {
        id: nanoid(),
        name: location.name,
        lat: location.coord.lat,
        lon: location.coord.lon
      }
    ])
  );

  setDefaultLocationsWeather();
  displayAddedLocations();
};

const removeLocation = (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  const id = e.target.dataset.id;

  const locations = JSON.parse(localStorage.getItem("locations")).filter(
    (location) => location.id !== id
  );

  localStorage.setItem("locations", JSON.stringify(locations));

  displayAddedLocations();
  setDefaultLocationsWeather();
};

const initApp = () => {
  // localStorage.clear();

  displayAddedLocations();

  setDefaultLocationsWeather();

  document
    .querySelector("#search-city-button")
    .addEventListener("click", searchWeather);

  document
    .querySelector("#add-location-button")
    .addEventListener("click", addLocation);

  document
    .querySelector("#added-locations")
    .addEventListener("click", removeLocation);
};

initApp();
