const http = require('http');

const server = http.createServer((req, res) => {
      console.log(req.url)
      res.end('This is a response body')
});

server.listen(8000, () => {
      console.log('server is running')
})