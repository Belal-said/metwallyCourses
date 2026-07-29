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

  return queries
}

queryString("localhost:8000/hi?name=belal&age=25");
//console.log(queries);
