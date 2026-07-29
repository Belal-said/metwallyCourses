const http = require("http");
const { hostname } = require("os");

let interval;

function login() {
    const options = {
        method: "GET",
        hostname: "127.0.0.1",
        port: 8000,
        path: "/login",
        headers: {
            "user-agent": "node.js",
            authorization: "Basic YmVsYWw6YmVsYWwyMDIz",
        },
    };
    createRequest(options, (data) => {
        console.log(data);
        interval = setInterval(who, 8000, data);
    });
}

function who(token) {
    const options = {
        method: "GET",
        hostname: "127.0.0.1",
        port: 8000,
        path: "/who",
        headers: {
            "user-agent": "node.js",
            authorization: "Bearer " + token,
        },
    };
    createRequest(options, (data, res) => {
        console.log(data);
        if (res.statusCode == 403) {
            clearInterval(interval)
        }
    });
}

function createRequest(options, cb) {
    let request = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunck) => {
            data += chunck;
        });
        res.on("close", () => {
            if (cb) cb(data, res);
            console.log(data);
        });
    });

    request.on("error", (err) => {
        console.log(err.message);
    });
    request.end();
}

login();
