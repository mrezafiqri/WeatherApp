const main = async () => {
  const keyword = document.querySelector(".search");
  const btnSearch = document.querySelector(".btn-search");
  const weatherBox = document.querySelector(".weather-box");
  const weatherDetails = document.querySelector(".weather-details");

  const weatherAPI = await
    "https://api.weatherapi.com/v1/current.json?key=fde450f6a3d2496fb4c32620241801&aqi=no";

  btnSearch.addEventListener("click", async () => {
    await weather();
  });

  keyword.addEventListener("keyup", async (e) => {
    if (e.keyCode === 13) await weather();
  });

  const weather = () => {
    try {
      return fetch(`${weatherAPI}&q=${keyword.value}`)
        .then((response) => {
          return response.json();
        })
        .then(async (responseJSON) => {
          if (responseJSON.error) {
            weatherBox.innerHTML = await `
              <h1 class="text-center pt-2">${responseJSON.error.message}</h1>
            `;
            weatherDetails.innerHTML = "";
          }

          let element = "";
          element = await showWheater(responseJSON);
          weatherBox.innerHTML = await element;
          element = await detailWeather(responseJSON);
          weatherDetails.innerHTML = await element;
      });  
    } catch (error) {
      console.log(error.message)
    };
  };

  const showWheater = async (data) => {
    return await `
      <div class="box flex flex-col items-center my-12">
        <h2 class="font-medium text-xl capitalize pb-1 md:text-2xl">${data.location.name}, ${data.location.country}</h2>
        <img src="http:${data.current.condition.icon}" 
        alt="Weather Icons ${data.current.condition.text}"
        class="h-full w-16 mt-2">
        <h3 class="relative text-6xl font-bold pb-2 md:text-7xl">${data.current.temp_c}<span class="absolute top-2 text-lg">℃</span></h3>
        <p class="text-lg font-normal capitalize md:text-xl">${data.current.condition.text}</p>
      </div>
    `;
  };

  const detailWeather = async (data) => {
    return await `
      <div class="humidity flex items-center gap-2 mb-10">
        <div class="text-[50px] flex items-start md:text-[54px]">
          <i class='bx bx-water'></i>
        </div>
        <div class="humidity-details">
          <h3 class="font-bold text-lg leading-4 md:text-xl">${
            data.current.humidity
          }<span>%</span></h3>
          <p class="text-xs md:text-sm">Humidity</p>
        </div>
      </div>
      <div class="wind flex items-center gap-2 mb-10">
        <div class="text-[48px] flex items-start md:text-[52px]">
          <i class='bx bx-wind'></i>
        </div>
        <div class="wind-details">
          <h3 class="font-bold text-lg leading-4 md:text-xl">${parseInt(
            data.current.wind_mph
          )}<span>Km/h</span></h3>
          <p class="text-xs md:text-sm">Wind Speed</p>
        </div>
      </div>
    `;
  };
};

document.addEventListener("DOMContentLoaded", main);
