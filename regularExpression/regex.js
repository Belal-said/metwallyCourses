let str = "Almondo-Petro 20"

let reg = /[a-zA-Z0-9-]/g;
console.log(reg.test(str));

console.log(str.match(reg).join('\n'))