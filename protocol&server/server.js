const http = require("http");

const server = http.createServer((req, res) => {
  let queries = queryString(req.url);
  console.log(queries.name);

  //   switch (req.url) {
  //     case "/":
  //       res.end("This is a response body");
  //       break;
  //     case ("/hi" + queries):
  //       res.end("hello " + queries[name]);
  //       break;
  //     case "/who":
  //       res.end("http server running on node.js. " + queries.name);
  //       break;
  //     default:
  //       res.statusCode = 406;
  //       res.statusMessage = "Not Acceptable";
  //       res.end();
  //   }
  res.end("hi " + queries.name);
});

server.listen(8000, () => {
  console.log("server is running");
});

// domain:port/path?param1=val1&&param2=val2

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
