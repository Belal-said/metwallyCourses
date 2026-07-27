const os = require('os');

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.uptime() / 60 / 60);