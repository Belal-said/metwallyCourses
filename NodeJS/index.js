console.clear();

// factorial

// !5 = 5 * 4 * 3 * 2 * 1

// inputs = n
// processing = n * n-1 * n-2 * ... * 1
// output = fact

// const n = 10;
// let fact = 1;

// for (let i = 2; i <= n; i++) {
//       fact = fact * i 
// }

// console.log(fact)

// prime numbers from 1 to n
// input = n
// processing = n % i = 

// prime number is dividable by one and itself

// const n = 30;

// for(let i = 2; i <= n; i++){
//       let isPrime = true;

//       for(let j = 2; j < i; j++){

//             if(i % j == 0){
//                   isPrime = false
//                   break
//             }

//       }

//       if(isPrime){
//             console.log(i)
//       }
// }


// let colors = ['Black', 'White', 'Grey', 'Red', 'Green'] // Short hand for Array literal

// console.log( colors[0] )

// colors[2] = 'Gray'

// console.log( colors[2] )
// console.log( colors.length )
// console.log( colors[colors.length - 1] )

// colors.push('Yellow')
// console.log( colors )

// function getByIndex(arr, i) {
//   i = arguments[arguments.length-1];
//   console.log(i)

//   arr = [arguments[0]];

//   for (let j = 1; j < arguments.length - 1; j++) {
//       arr.push(arguments[j])
//       console.log(arr)
//   }

//   return arr[i]
// }
// let result = getByIndex();
// console.log(getByIndex("Black","White","Gray","Red","Green", 3))


// function getByIndex(arr, i) {
//       const values = [];
      
//       for (let j = 0; j < arguments.length - 1; j++) {
//             values.push(arguments[j]);
//       }
      
//       i = arguments[arguments.length - 1];
//       return values[i];
// }

// function updateElement(arr , i, val) {
//       i = arguments[arguments.length - 2];
//       val = arguments[arguments.length - 1]
//       arr = arguments.splice(0, arguments.length-2)
//       console.log(arr)
//       // arr[i] = val
//       // return arr;
// }

// console.log(updateElement("Black","White","Grey", 2, "Gray"))

// let obj = {};

// obj.name = "Object Name"
// obj.info = "Info Info Blah Blah"
// obj.printInfo = function() {
//       console.log(this.name, "+", this.info)
// }

// obj.printInfo();

// let string = "Belal Saeed Abdelfattah Ahmed";
// string = string.split(' ');
// console.log(string)

// console.log(__dirname);
// console.log(__filename);
// console.log(exports);
// console.log(require);

console.log( arguments )

for(let i = 0; i < arguments.length; i++){
      console.log(arguments[i])
}