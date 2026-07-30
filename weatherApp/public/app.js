console.log("app.js loaded");

const getWeatherButton = document.getElementById("searchBtn");

getWeatherButton.addEventListener("click", async () => {
    const city = document.getElementById("city").value;
    if (city === "") alert("Please enter a city name");
    const response =  await fetch(`/weather?city=${city}`);
    const weather =  response.json();

    let weather = catchWeather(city)
        .catch((err) => console.log(err.message));

    document.getElementById("result").innerHTML = `
        <h2 class="city-name">${weather.city}</h2>
        <p class="item">${weather.temperature}</p>
        <p class="item">${weather.conditions}</p>
    `;
});
getWeather.addEventListener("click", async () => {
    console.log("button clicked");
});


function getWeather(city) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
    })
}