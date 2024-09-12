let apiKey = "82045987f46ce0f8e4c1d96e6a02487b";
let cityEle = document.querySelector(".city");
let tempEle = document.querySelector(".temp");
let iconEle = document.querySelector(".icon");
let humidEle = document.querySelector(".hum");
let weatherC =document.querySelector(".weatherCondition");
let sunriseT = document.querySelector(".sunrise");
let sunsetT = document.querySelector(".sunset");


let input = document.querySelector(".cityInput");
let btn = document.querySelector("#search-addon");

btn.addEventListener("click", function (event) {

  let city = input.value;
  input.value = "";
  getData(city);
  if(event.key === "Enter"){
    event.preventDefault();
    document.getElementById("btn").click();
  }
});

async function getData(city) {
  try {
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&aqi=no`
    );
    data = await data.json();
    screenUpdate(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("City not found, please try again.");
  }
}

function setWeatherBackground(weatherCondition) {
  let weatherImages = {
    clear: "assets/sunny.jpg",
    clouds: "assets/cloudy.jpg",
    rain: "assets/rainy.png",
    snow: "assets/snow.jpg",
    thunderstorm: 'assets/thunderstorm.jpg',
    drizzle: 'assets/drizzle.jpg',
    mist: 'assets/mist.jpg',
  };

  const imagePath = weatherImages[weatherCondition] || 'url("assets/default.jpg")';
  //Apply the background image and styles to the body
  if (imagePath) {
    document.body.style.backgroundImage = `url(${imagePath})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  } else {
    console.error(`No image found for weather condition: ${weatherCondition}`);
  }
}

function screenUpdate(obj) {
  console.log("Weather Data", obj);
  let temp = Math.round(obj.main.temp);
  let cityName = obj.name;
  let humidity = obj.main.humidity;
  let sunrise_time = obj.sys.sunrise;
  let sunset_time = obj.sys.sunset;
  let weatherCondition = obj.weather[0].main.toLowerCase();
  let iconObj = `http://openweathermap.org/img/w/${obj.weather[0].icon}.png`;

  console.log("Weather Condition", weatherCondition);
  tempEle.innerHTML = `${temp}°C`;
  cityEle.innerHTML = cityName;
  humidEle.innerHTML = `${humidity}%`;
  weatherC.innerHTML = weatherCondition;
  sunriseT.innerHTML = sunrise_time;
  sunsetT.innerHTML= sunset_time;
  iconEle.src = iconObj;
  setWeatherBackground(weatherCondition);
}
