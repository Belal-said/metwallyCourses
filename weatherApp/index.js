const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(async (req, res) => {
    try {
        let path = req.url.split("?")[0];
        let queries = getQueries(req.url);

        switch (path) {
            case "/":
                const html = fs.readFileSync('./public/index.html', 'utf-8', () => {})
                res.end(html);
                break;

            case "/weather":
                const city = queries.city;

                if (!city) {
                    res.end("Please provide a city");
                    break;
                }

                try {
                    const data = await getWeather(city);
                    // const summary = {
                    //     city: data.name,
                    //     country: data.sys.country,
                    //     temperature: `${data.main.temp} °C`,
                    //     feelsLike: `${data.main.feels_like} °C`,
                    //     conditions: data.weather[0].description,
                    //     wind: `${data.wind.speed} m/s`,
                    // };

                    res.writeHead(200, {
                        "Content-Type": "application/json",
                    });

                    res.end(
                        JSON.stringify({
                            city: data.name,
                            temperature: data.main.temp,
                            conditions: data.weather[0].description,
                        }),
                    );

                    //             //res.end(`
                    //     <!DOCTYPE html>
                    //     <html>
                    //     <head>
                    //         <title>Weather</title>
                    //         <style>
                    //             body {
                    //                 font-family: Arial, sans-serif;
                    //                 padding: 40px;
                    //             }
                    //             .card {
                    //                 width: 300px;
                    //                 border: 1px solid #ccc;
                    //                 border-radius: 10px;
                    //                 padding: 20px;
                    //             }
                    //         </style>
                    //     </head>
                    //     <body>
                    //         <div class="card">
                    //             <h2>${data.name}, ${data.sys.country}</h2>
                    //             <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                    //             <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
                    //             <p><strong>Condition:</strong> ${data.weather[0].description}</p>
                    //             <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
                    //         </div>
                    //     </body>
                    //     </html>
                    // //`);
                } catch (err) {
                    console.log(err);
                    res.end("Error" + err.message);
                }

            case "/app.js":
                const js = fs.readFileSync("./public/app.js", "utf8");

                res.writeHead(200, {
                    "Content-Type": "application/javascript",
                });

                res.end(js);
                break;

            case "/style.css":
                const css = fs.readFileSync("./public/style.css", "utf8");

                res.writeHead(200, {
                    "Content-Type": "text/css",
                });

                res.end(css);
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
