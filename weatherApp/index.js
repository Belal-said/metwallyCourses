const http = require("http");
const fs = require("fs");
const path = require("path");
//const { fetch } = require("undici-types");

const server = http.createServer(async (req, res) => {
    try {
        let path = req.url.split("?")[0];
        let queries = getQueries(req.url);

        switch (path) {
            case "/":
                const html = fs.readFileSync(
                    "./public/index.html",
                    "utf-8",
                    () => {},
                );
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
                } catch (err) {
                    console.log(err);
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ Error: err.message }));
                }
                break;

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
    const data = await response.json();

    // let data = await fetchData(url);

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

function fetchData(url) {
    return fetch(url).then((response) => response.json());
}
