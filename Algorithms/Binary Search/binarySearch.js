function binarySearch(x, key) {
    let low = 0;
    let high = x.length - 1;
    while(low <= high) {
        let mid = Math.floor((high + low) / 2)
        if(key === x[mid]) return mid;
        if(key < x[mid]) {
            high = mid -1
        } else {
            low = mid + 1
        }
    }
    return -1
}

testArray = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(binarySearch(testArray, 6))