// function queryString(str) {
//   let queries = {};
//   let reg = /(.+)\?(.+)/;
//   let allqueries = reg.exec(str);
//   //console.log(allqueries[2]);

//   if (allqueries != null) {
//     // allqueries = param1=val1&&param2=val2
//     let regq = /([^=&?]+)=([^=&]+)/g;

//     let singleq = "";

//     while ((singleq = regq.exec(allqueries[2])) !== null) {
//       // param1=val1 => param1 val1
//       queries[singleq[1]] = singleq[2];
//     }
//   }

//   return queries
// }

// queryString("localhost:8000/hi?name=belal&age=25");
// //console.log(queries);

function checkAuth(auth) {
  if (auth == undefined) return false;
  if (!auth.startsWith("Basic ", ""));

  auth = auth.replace('Basic ', '');
  console.log(auth)

  let credentials = Buffer.from(auth, 'base64').toString();
  console.log(credentials);

  credentials = credentials.split(':');
  console.log(credentials)

  // Hashing passwords to store them in db, Don't store pw as a plain text. Can't go back from hashing to plain text.

  return (credentials[0] == 'belal' && credentials[1] == 'belal2023')
}

checkAuth('Basic YmVsYWw6YmVsYWwyMDIz')