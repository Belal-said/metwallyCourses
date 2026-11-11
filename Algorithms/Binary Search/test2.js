console.clear()

var findMedianSortedArrays = function(nums1, nums2) {
    let mergedArray = [];

    if(nums1.length === 0 ) {
        mergedArray = nums2
    } else if (nums2.length === 0) {
        mergedArray = nums1
    } else {
        mergedArray = [...nums1, ...nums2].sort((a, b) => a - b);
    }
    
    console.log(mergedArray)
    console.log(mergedArray.length)

    if(mergedArray.length === 1) return mergedArray[0]

    let median;

    let low = 0;
    let high = mergedArray.length - 1;
    let mid = Math.floor((low + high) / 2);

    if(mergedArray.length % 2 !== 0) {
        // median = (mergedArray[mid - 1] + mergedArray[mid + 1]) / 2
        median = (mergedArray[mid])
        return median
    } else {
        median = (mergedArray[mid] + mergedArray[mid + 1]) / 2
        return median
    }
};

console.log(findMedianSortedArrays([1,2,3,4,5], [6,7,8,9,10,11,12,13,14,15,16,17]))