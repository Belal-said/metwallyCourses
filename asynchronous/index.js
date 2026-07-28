console.log("1");

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(function () {
  console.log("nextTick 1");
});

console.log("2");

process.nextTick(function () {
  console.log("nextTick 2");
});
