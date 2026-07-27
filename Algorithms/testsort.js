function merge(arr, start, mid, end) {
    const leftArrayLength = mid - start + 1;
    const rightArrayLength = end - mid;

    // Create temp arrays
    const leftArray = new Array(leftArrayLength);
    const rightArray = new Array(rightArrayLength);

    // Copy data to temp arrays L[] and R[]
    for (let i = 0; i < leftArrayLength; i++)
        leftArray[i] = arr[start + i];
    for (let j = 0; j < rightArrayLength; j++)
        rightArray[j] = arr[mid + 1 + j];

    let i = 0, j = 0;
    let k = start;

    // Merge the temp arrays back into arr[left..right]
    while (i < leftArrayLength && j < rightArrayLength) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of L[], if there are any
    while (i < leftArrayLength) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    // Copy the remaining elements of R[], if there are any
    while (j < rightArrayLength) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}

function mergeSort(arr, start, end) {
    if (start >= end)
        return;

    const mid = Math.floor(start + (end - start) / 2);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
}


// Driver code
const arr = [38, 27, 43, 10];
mergeSort(arr, 0, arr.length - 1);
console.log(arr.join(" "));