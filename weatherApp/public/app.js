console.log("app.js loaded");

const getWeatherButton = document.getElementById("searchBtn");

getWeatherButton.addEventListener("click", () => {
    const city = document.getElementById("city").value;
    if (city === "") alert("Please enter a city name");

    // const response = await fetch(`/weather?city=${city}`);
    // const weather = await response.json();

    const response = new Promise((resolve, reject) => {
        fetch(`/weather?city=${city}`).then(resolve).catch(reject);
    });

    response
        .then((response) => {
            return response.json();
        })
        .then((weather) => {
            document.getElementById("result").innerHTML = `
        <h2 class="city-name">${weather.city}</h2>
        <p class="item">${weather.temperature}</p>
        <p class="item">${weather.conditions}</p>`;
        })
        .catch((err) => console.error(err));
});
