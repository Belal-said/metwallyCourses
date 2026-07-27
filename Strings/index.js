// function countOccurrences(str, char) {
//   // your code here
//   let index = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] == char) index += 1;
//     return index;
//   }
// }

console.clear();

/* 
// let str = "node.js is great";

// function toTitleCase(str) {
//   // your code here
//   str = str.trim();
//   str = str.split(" ");

//   let result = [];

//   for (let i = 0; i < str.length; i++) {
//     let word = str[i];
//     let firstChar = word[0];
//     let firstCharCode = firstChar.codePointAt(0);
//     let newCharCode = 0;

//     if (firstCharCode >= 97 && firstCharCode <= 122) {
//       newCharCode = firstCharCode - 32;
//     }

//     firstChar = String.fromCharCode(newCharCode);
//     word = word.replace(word[0], firstChar);
//     result.push(word);
//   }

//   str = result.join(" ");
//   console.log(str);
// }

// toTitleCase(str);
*/

/* 

function toTitleCase(str) {
   // your code here
  str = str.trim();
  str = str.split(" ");

  let result = [];

  for (let i = 0; i < str.length; i++) {
    let word = str[i];
    let firstChar = str[i][0].toUpperCase();
    word = word.replace(word[0], firstChar);
    result.push(word);
  }

  str = result.join(" ");
  return str
}

*/

// function replaceAll(str, oldChar, newChar) {
//       for (let i = 0; i < str.length; i++){
//             if (str[i] == oldChar) str.replace(newChar);
//             else newStr.push(str[i]);
//       }
//       newStr = newStr.join()
//       console.log(newStr);
// }

// let str = "Hello, World!";
// function truncate(str, maxLen) {
//   // your code here
//   if (maxLen >= str.length) console.log(str);
//   if (maxLen < str.length) {
//     str = str.substr(0, maxLen) + "...";
//     console.log(str);
//   }
// }
// truncate("Hello, World!", 7);
