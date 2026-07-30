const http = require("http");

const server = http.createServer(async (req, res) => {
    try {
        let path = req.url.split("?")[0];
        let queries = getQueries(req.url);

        switch (path) {
            case "/":
                res.statusCode = 200;
                res.end("Hi this page is for welcome");
                break;

            case "/weather":
                const city = queries.city;

                if (!city) {
                    res.end("Please provide a city");
                    break;
                }
                try {
                    const data = await getWeather(city);
                    const summary = {
                        city: data.name,
                        country: data.sys.country,
                        temperature: `${data.main.temp} °C`,
                        feelsLike: `${data.main.feels_like} °C`,
                        conditions: data.weather[0].description,
                        wind: `${data.wind.speed} m/s`,
                    };

                    res.end(JSON.stringify(summary));
                } catch (err) {
                    console.log(err);
                    res.end("Error" + err.message)
                }
                break;

            default:
                res.end("Page not found");
                break;
        }
    } catch (err) {
        console.log(err);
    }
});

function getQueries(str) {
    let queries = {};
    let reg = /(.+)\?(.+)/;
    let allqueries = reg.exec(str);
    //console.log(allqueries[2]);

    if (allqueries != null) {
        // allqueries = param1=val1&&param2=val2
        let regq = /([^=&?]+)=([^=&]+)/g;

        let singleq = "";

        while ((singleq = regq.exec(allqueries[2])) !== null) {
            // param1=val1 => param1 val1
            queries[singleq[1]] = singleq[2];
        }
    }
    return queries;
}

// Hit the weather API
async function getWeather(city) {
    const apiKey = "9e189ebd21e59a37dbb93c0659bbcb7e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = response.json();

    if (!response.ok) {
        const err = new Error(data.message);
        throw err;
    }

    return data;
}

const port = 5000;
server.listen(port, () => {
    console.log("Server is running on port 5000");
});
