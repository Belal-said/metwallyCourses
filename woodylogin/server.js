const http = require("http");
const { Pool } = require("pg");
const { json } = require("stream/consumers");
const crypto = require("crypto");

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};
function decryptPassword(stored) {
    let key = "fb5009b1255e2fa0771e40539da11ca0850118e43bc6182cbc3904a335a59e66";
    const [ivHex, dataHex] = stored.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(dataHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

const server = http.createServer(async (req, res) => {
    console.log("Hi from server");

    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (req.url === "/api/login" && req.method === "POST") {
        let email, password;
        try {
            ({ email, password } = await json(req));
            console.log(email, password);
        } catch {
            console.warn("Error Here");
        }

        try {
            const result = await pool.query(
                `SELECT * FROM tipsee_users WHERE email = $1`,
                [email],
            );
            const user = result.rows[0];
            console.log(user);

            if (password === decryptPassword(user.password)) {
                
                res.writeHead(200, headers);
                res.end(
                    JSON.stringify({ message: "Success", email: user.email }),
                    console.log("Success")
                );
            } else {
                res.writeHead(401, headers);
                res.end(JSON.stringify({ message: "Wrong email or password" }));
            }
        } catch (err) {
            console.log(err);
        }
    }
    console.log("after if");
    return;
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
        console.log("DB connceted successfully");
    })
    .catch((err) => console.log(err));

server.listen(2800, () => {
    console.log("Server is running on 2800");
});
