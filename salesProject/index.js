const http = require("http");
const fs = require("fs");
const { Pool } = require("pg");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

function fillRow(template, user) {
    let output = template.replace(/{%USERNAME%}/g, user.name);
    output = output.replace(/{%USERID%}/g, user.id);
    output = output.replace(/{%USEREMAIL%}/g, user.email);
    return output;
}

const row = fs.readFileSync("./row-template.html", "utf-8");
const userOverview = fs.readFileSync("./index.html", "utf-8");

const server = http.createServer(async (req, res) => {
    if (req.url === "/users") {
        try {
            const users = await pool.query(
                `SELECT id, email, name FROM tipsee_users WHERE id BETWEEN 2500 AND 3000`,
            );
            const data = users.rows;
            await fs.promises.writeFile("./data.json", JSON.stringify(data));

            const rowsHtml = data.map((user) => fillRow(row, user)).join("");
            const output = userOverview.replace("{%USER%}", rowsHtml);

            res.setHeader("Content-Type", "text/html");
            res.statusCode = 200;
            res.end(output);
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
        }
    } else {
        res.end("page not found");
    }
});

const pool = new Pool({
    host: `tipsee-002.postgres.database.azure.com`,
    port: 5432,
    database: `postgres`,
    user: `it_belal_read_only`,
    password: `zPFwTP4gNo1H0PIh1VxOIsJV`,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then(() => {
        console.log(`DB connected successfully`);
    })
    .catch((err) => console.log(err));

const PORT = 7000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
