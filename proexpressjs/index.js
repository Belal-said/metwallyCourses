const express = require("express");

const app = express(); // Now we created an application. ( instantiate an Express.js object )

const port = 3030; // Will run locally on port 3030

app.get("/name/:user_name", (req, res) => {
    // In this example, we are processing all URLs by specifying the wildcard * character.
    //res.end("Hello World!"); // The function here called request handler.
    res.status(200);
    res.set("Content-Type", "text/html");
    res.send(`<html> 
            <body>
                <h1>Hello ${req.params.user_name}</h1>
            </body>
        </html>`);
        // res.send() => is a special Express.js method that conventiently
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
