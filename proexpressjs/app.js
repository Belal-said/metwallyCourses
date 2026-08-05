const express = require("express");
const path = require("path");
const favicon = require("static-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const routes = require("./routes/index.js");
const users = require("./routes/users.js");

const app = express(); // Now we created an application. ( instantiate an Express.js object )

// app.set('port', process.env.PORT || 3001) => Better if other files have access to this file.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// app.use(cookieParser);
app.use(require("less-middleware")(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

console.log('before')
app.use("/", routes.index);
app.use("/users", users.index);
console.log('after')

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next();
});

if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: err,
    });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log('Server is running on ' + PORT)
})
