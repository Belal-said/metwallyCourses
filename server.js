const http = require("http");
const { Buffer } = require("buffer");
const crypto = require('crypto');
const fs = require('fs');

const server = http.createServer( async (req, res) => {
    //console.log(req.headers);
   // console.log(req.url);
    let path = req.url.split("?")[0];
    let queries = queryString(req.url);
    //console.log(queries);

    if (req.headers["accept-encoding"]) {
        res.statusCode = 401;
        res.statusMessage = "Bad Request";
        res.end("We will not serve you");
        return;
    }

    switch (path) {
        case "/":
            res.end("This is a response body");
            break;
        case "/hi":
            res.end("hello " + queries.name);
            break;
            case '/login':
                  if(checkAuth(req.headers['authorization'])){
                  let token = await generateToken();
                  console.log(token)
                  res.end(token)
            } else {
                  res.statusCode = 406;
                  res.statusMessage = "Not Authorized"
                  res.end('Creadentials are not valid');
            }
            break;
        case "/who":
            if( await checkAuth(req.headers['authorization'])){
                  res.end("http server running on node.js");
            } else {
                  res.statusCode = 406;
                  res.statusMessage = "Not Authorized"
                  res.end();
            }
            break;
        default:
            res.statusCode = 406;
            res.statusMessage = "Not Accepted";
            res.end();
            break;
    }
});

server.listen(8000, () => {
    console.log("server is running on port 8000");
});

// domain:port/path?param1=val1&param2=val2

function queryString(str) {
    let queries = {};

    let reg = /.+\?(.+)/;
    let allqueries = reg.exec(str);

    if (allqueries != null) {
        // allqueries[1] = param1=val1&param2=val2
        let regq = /([^=&]+)=([^=&]+)/g;

        let singleq = "";
        while ((singleq = regq.exec(allqueries[1]))) {
            queries[singleq[1]] = singleq[2];
        }
    }
    return queries;
}

async function checkAuth(auth) {
      if(auth == undefined) return false;
      if(auth.startsWith('Basic ')){
            auth = auth.replace('Basic ', '');
            let credentials = Buffer.from(auth, 'base64').toString();
            credentials = credentials.split(':');
            return (credentials[0] === 'belal' && credentials[1] === '12345678')
      }else if(auth.startsWith('Bearer ')){
            auth = auth.replace('Bearer ', '')
            let tokens = await fs.promises.readFile('./tokens', 'utf-8')
            tokens = tokens.trim();
      
            if(tokens === auth) {
                  return true
            } else {
                  return false
            }
      } else {
            return false
      }
}

async function generateToken() {
      let token = crypto.randomBytes(16).toString('hex');
      console.log(token)

      await fs.promises.writeFile('tokens', token, 'utf-8')
      setTimeout(resetTokens, 30000)
      return token
}

async function resetTokens(){
      await fs.promises.writeFile('tokens', '', 'utf-8')
}