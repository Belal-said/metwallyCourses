console.clear()

var searchMatrix = function(matrix, target) {
    let start = 0;
    let end = matrix.length - 1;

    if (target < matrix[0][0] || target > matrix[end].at(-1)) return false

    while (start <= end) {
        let midArray = Math.floor((start + end) / 2)

        if (target < matrix[midArray][0]) {
            end = midArray - 1
        } else if (target > matrix[midArray].at(-1)) {
            start = midArray + 1
        } else {
            // target is within this row's range, so search inside it
            let low = 0;
            let high = matrix[midArray].length - 1;
            while (low <= high) {
                let midEl = Math.floor((low + high) / 2)
                if (target === matrix[midArray][midEl]) return true
                if (target < matrix[midArray][midEl]) {
                    high = midEl - 1
                } else {
                    low = midEl + 1
                }
            }
            return false   // right row, but target isn't in it
        }
    }
    return false   // no row matches
};

console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 1))