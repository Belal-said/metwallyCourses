// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("done"), 0);
// });

// promise.then((value) => console.log(value))

// for (let i = 0; i < 50; i++) {
//     console.log(i)
// }

new Promise((resolve, reject) => {
    setTimeout(() => resolve("value"), 2000);
})
    .finally(() => console.log("Promise ready"))
    .then((result) => console.log(result));
