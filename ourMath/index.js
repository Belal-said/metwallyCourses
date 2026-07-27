/*
avg function
inputs: nums[] OR ...nums
processes: 
      - sum all nums
      - divide sum on nums.length
output: return result
*/

exports.avg = function avg(...nums){
      let result = 0;
      for(let i =0; i < nums.length; i++){
            result += nums[i]
      }
      result /= nums.length;
      return result
}

/*
union set
inputs: 2 arrays .. firstArray .. secondArray
processes:
      - copy firstArray elements to the result
      - copy from secondArray to the result all elements that is not included in the firstArray
output: return result
*/

exports.unionTwoSets = function unionTwoSets(firstArray, secondArray){
      let result = []; 
      for(let i = 0; i < firstArray.length; i++){
            result.push(firstArray[i])
      }
      for(let i = 0; i < secondArray.length; i++){
            if(!result.includes(secondArray[i])){
                  result.push(secondArray[i])
            }
      }
      return result;
}

/*
union set
inputs: 2 arrays .. firstArray .. secondArray
processes:
      - for each item in first array:
            - if the item included in the second set
            - push it to result
output: return result
*/

exports.intersection = function inersection(firstArray, secondArray){
      let result = [];

      for (let i = 0; i < firstArray.length; i++){
            if(secondArray.includes(firstArray[i])){
                  result.push(firstArray[i])
            }
      }

      return result;
}

/*
max
inputs: ...nums
process: 
      - temp var = the smallest number value
      - for each item in nums
            - if item > temp then temp = item
output: return max
*/

exports.maxNumber = function maxNumber(...nums){
      let temp = Number.NEGATIVE_INFINITY;
      for(let i = 0; i < nums.length; i++){
            if(nums[i] > temp) temp = nums[i]
      }
      return temp
}