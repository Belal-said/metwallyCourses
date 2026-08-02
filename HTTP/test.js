function queryString(str) {
    let queries = {};

    let reg = /.+\?(.+)/;
    let allqueries = reg.exec(str);
    console.log(allqueries);

    if (allqueries != null) {
        // allqueries[1] = param1=val1&param2=val2
        let regq = /([^=&]+)=([^=&]+)/g;
        
        let singleq = "";
        while ((singleq = regq.exec(allqueries[1])) !== null) {
            queries[singleq[1]] = singleq[2];
        }
    }
    return queries;
}

let queries = queryString("http://localhost:8000/hi?name=ahmed&age=12");
console.log(queries);
