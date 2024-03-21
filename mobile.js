window.addEventListener('scroll', function(){
  var header = document.getElementById('mainHeader');
  var scrollPosition = window.pageYOffset || this.document.documentElement.scrollTop;

  if (scrollPosition > 100) { 
    header.style.backgroundColor = 'rgb(211,211,211,0.5)'; 
  } else {
    header.style.backgroundColor = 'rgba(211, 211, 211, 1)'; 
  }
})

function myMenuFunction(){
  var i = document.getElementById("navMenu");
  if(i.className === "nav-menu"){
    i.className += " responsive";
  }else{
    i.className = "nav-menu";
  }
}

// Weather part
const container = document.querySelector(".weather-container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIKey = "4a6add2574787bda2b4fd219b534e301";
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "images/clear.png";
            break;
          case "Rain":
            image.src = "images/rain.png";
            break;
          case "Snow":
            image.src = "images/snow.png";
            break;
          case "Clouds":
            image.src = "images/cloud.png";
            break;
          case "Mist":
            image.src = "images/mist.png";
            break;
          case "Haze":
            image.src = "images/mist.png";
            break;
          default:
            image.src = "images/cloud.png";
        }
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll(
          ".info-weather.active-clone"
        );
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll(
          ".info-humidity.active-clone"
        );
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll(
          ".info-wind.active-clone"
        );
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 2200);
        }
      }
      document.querySelector(".wrapper").classList.add("active");
      const weatherContainer = document.querySelector(".weather-container");
      const plantDetailsContainer = document.querySelector(".plant-details-container");

      weatherContainer.classList.add("active");
      plantDetailsContainer.classList.add("active");
      updatePlantInfo(json.weather[0].main);
    });
});

function updatePlantInfo(weatherCondition){
  const plantInfo = document.querySelector(".plant-details");
  let content = "";

  const plantRecommendations = {
    "Clear": {
      types: "Succulents, Cacti",
      examples: "Aloe Vera, Saguaro Cactus",
      tips: "Require bright sunlight."
    },
    "Rain": {
        types: "Rain Garden Plants",
        examples: "Joe-Pye Weed, Swamp Milkweed",
        tips: "These plants can tolerate and benefit from wet conditions."
    },
    "Snow": {
        types: "Cold-Hardy Plants",
        examples: "Siberian Iris, Winterberry Holly",
        tips: "These plants can survive in cold and snowy conditions."
    },
    "Clouds": {
        types: "Shade-Tolerant Plants",
        examples: "Ferns, Hostas",
        tips: "These plants thrive in low-light conditions."
    },
    "Mist": {
        types: "Moisture-Loving Plants",
        examples: "Astilbe, Primrose",
        tips: "These plants benefit from the high humidity of misty conditions."
    },
    "Haze": {
        types: "Air-Purifying Plants",
        examples: "Spider Plant, Snake Plant",
        tips: "These plants can help improve air quality during hazy conditions."
    },
  };

  if (plantRecommendations[weatherCondition]) {
    const rec = plantRecommendations[weatherCondition];
    content = `<h2>Recommended Plants for ${weatherCondition}</h2>
               <p><strong>Types:</strong> ${rec.types}</p>
               <p><strong>Examples:</strong> ${rec.examples}</p>
               <p><strong>Tips:</strong> ${rec.tips}</p>`;
  } else {
      content = `<p>No specific recommendations for ${weatherCondition} weather.</p>`;
  }

  plantInfo.innerHTML = content;
}


