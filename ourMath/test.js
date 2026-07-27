const ourMath = require('./index.js');

let average = ourMath.avg(1, 2, 3, 4, 5, 6, 7, 8, 9);

if(average === 5){
      console.log('test success')
} else {
      console.log('test fail')
}

let newSet = ourMath.unionTwoSets([1,2,3], [2,3,4])
console.log(newSet)

let newSetIntersect = ourMath.intersection([1,2,3], [2,3,4])
console.log(newSetIntersect)

let maxValue = ourMath.maxNumber(20, 786, 3433);
console.log(maxValue);

