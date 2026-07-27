console.clear();
/*
1- Read the array, start and end index of the portion that we need to sort
2- Don't continue if end equal or less than start
3- Calculate the midpoint = ( start + end ) / 2
4- Divide the portion of the array into new two arrays ( Recursion )
5- Call yourself twice, one for the left portion, the other for the right portion
6- Merge the two portions
      6.1- Read the array, start, midpoint and end indexies
      6.2- Create two new arrays for each side
      6.3- Compare all items in the arrays and sort it in the original array
      6.4- Move remain items in each array to the original array as is
7- Print the array
*/

// function mergeSort(array) {
//   let arr = [];
//   let start = 0;
//   let end = array.length - 1;
//   //let mid = Math.floor((start + end) / 2);

//   if (end <= start) return;

//   mergeSort(array, start, mid);
//   mergeSort(array, mid + 1, end);
//   merge(array, start, mid, end);
// }

function merge(array, start, end) {
  let mid = Math.floor((start + end) / 2)

  let leftArray = new Array(mid);
  console.log(leftArray.length)
  let rightArray = new Array(end - mid + 1);
  console.log(rightArray.length)

  let i = 0,
    j = 0,
    k = 0;
  for (i = 0; i < leftArray.length; ) {
    leftArray[i] = array[k];
    i++;
    k++;
  }
  console.log(leftArray);

  for (j = 0; j < rightArray.length; ) {
    rightArray[j] = array[k];
    j++;
    k++;
  }

  console.log(rightArray);

  i = j = k = 0;
  while (i < leftArray.length && j < rightArray.length) {
    if (rightArray[j] <= leftArray[i]) {
      array[k] = rightArray[j]
      j++;
    } else {
      array[k] =leftArray[i];
      i++;
    }
    k++
  }

  while (i < leftArray.length) {
    array[k] =leftArray[i]; 
    i++;
    k++;
  }

  while (j < rightArray.length) {
    array[k] = rightArray[j]
    j++;
    k++;
  }
  console.log(array);
}

// merge([3, 5, 7, 8, 2], 0, [3, 5, 7, 8, 2].length-1);
// mergeSort([3, 5, 7, 8, 2]);

function mergeSort(array, start, end){
      if(start >= end) return;

      let mid = Math.floor((start + end) / 2)
      mergeSort(array, start, mid) 
      mergeSort(array, mid+1, end)
      merge(array, start, end)
}

mergeSort([3, 5, 7, 8, 2], 0, [3, 5, 7, 8, 2].length-1)