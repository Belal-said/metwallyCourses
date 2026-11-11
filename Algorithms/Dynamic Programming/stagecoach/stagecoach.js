console.clear();

const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const data = [
    [0, 2, 4, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 7, 4, 6, 0, 0, 0],
    [0, 0, 0, 0, 3, 2, 4, 0, 0, 0],
    [0, 0, 0, 0, 4, 1, 5, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 6, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const n = data.length;
const states = [];
states[n - 1] = { from: "", to: "", cost: 0 };

// for (i ; i >= 0 ; i--) {
//     states[i] = {'from': labels[i], 'to': labels[j], 'cost': Number.MAX_SAFE_INTEGER}
//     for (j ; j < n; j++) {
//         if (data[i][j] === 0) continue;
//         console.log(labels[j])
//         let newCost = data[i][j] + states[j].cost

//         if (newCost < states[i].cost) {
//             states[i].to = labels[j];
//             states[i].cost = newCost
//         }
//     }
// }
for (let i = n - 2; i >= 0; i--) {
    states[i] = {
        from: labels[i],
        to: labels[i + 1],
        cost: Number.MAX_SAFE_INTEGER,
    };
    for (let j = i + 1; j < n; j++) {
        if (data[i][j] === 0) continue;

        let newCost = data[i][j] + states[j].cost;

        if (newCost < states[i].cost) {
            states[i].to = labels[j];
            states[i].cost = newCost;
        }
    }
}

let path = ['A'];
let i = 0;
let j = 0;
while(i < states.length){
    if(states[i].from === path[j]){
        path.push(states[i].to)
        j++
    }
    i++
}


console.log(states);
console.log("Minimum cost:", states[0].cost);
console.log("Minimum path:", path);
