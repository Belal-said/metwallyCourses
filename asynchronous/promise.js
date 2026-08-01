// let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve("done"), 0);
// });

// promise.then((value) => console.log(value))

// for (let i = 0; i < 50; i++) {
//     console.log(i)
// }

// new Promise((resolve, reject) => {
//     setTimeout(() => resolve("value"), 2000);
// })
//     .finally(() => console.log("Promise ready"))
//     .then((result) => console.log(result));

// Promise.all( [
//   new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
//   new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
//   new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
// ]).then((value) => console.log(value));

let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests)
  .then(responses => responses.forEach(
    response => console.log(`${response.url}: ${response.status}`)
  ));