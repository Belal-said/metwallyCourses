const http = require("http");
const { Buffer } = require("buffer");
const crypto = require("crypto");
const fs = require("fs");

const server = http.createServer(async (req, res) => {
  let path = req.url.split("?")[0];
  console.log(path);

  let queries = queryString(req.url);
  console.log(queries);

  switch (path) {
    case "/":
      res.end("This is a response body");
      break;
    case "/hi":
      res.end("hello " + queries.name);
      break;
    case "/who":
      if (await checkAuth(req.headers["authorization"])) {
        res.end("http server running on node.js. " + queries.name);
      } else {
        res.statusCode = 403;
        res.statusMessage = "Not authorized";
        res.end('credentials are not valid');
      }
      break;
    case "/login":
      if (await checkAuth(req.headers["authorization"])) {
        let tokens = await generateToken();
        res.end(tokens)
      } else {
        res.statusCode = 403;
        res.statusMessage = "Not authorized";
        res.end('Credentials are not valid!');
      }
      break;
    default:
      res.statusCode = 406;
      res.statusMessage = "Not Acceptable";
      res.end();
  }
});

server.listen(8000, () => {
  console.log("server is running");
});

function queryString(str) {
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

async function checkAuth(auth) {
  if (auth == undefined) return false;
  if (auth.startsWith("Basic ")) {
    auth = auth.replace("Basic ", "");
    let credentials = Buffer.from(auth, "base64").toString();
    credentials = credentials.split(":");
    return (credentials[0] == "belal" && credentials[1] == "belal2023");
  } else if (auth.startsWith("Bearer ")) {
    auth = auth.replace("Bearer ", "");
    let tokens = await fs.promises.readFile('tokens', 'utf-8');
    if (tokens) {
      return (tokens.indexOf(auth) >= 0)
    } else {
      return false
    }
  } else {
    return false
  }
}

/*

client request a token using username and password
server generat the token
store the token in a file
sending the token to the client

setTimeout a few seconds then delete the token from the file

-----

client sending a request using the token
check if the token exists in the file

*/

async function generateToken() {
  let token = crypto.randomBytes(16).toString("hex");
  await fs.promises.writeFile("tokens", token + "\n", "utf-8");
  setTimeout(resetTokens, 20000);
  return token;
}

async function resetTokens() {
  await fs.promises.writeFile("tokens", "", "utf-8");
}
