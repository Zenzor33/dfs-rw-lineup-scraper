// nums = [3, 2, 4];
// target = 6;

// may not use the same element twice

// var twoSum = function (nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     let num1 = nums[i];
//     for (let j = 0; j < nums.length; j++) {
//       let num2 = nums[j];
//       if (num1 + num2 === target && i != j) return [i, j];
//     }
//   }
// };

// console.log(twoSum(nums, target));

let x = 1000021;
let z = 1200001;

var isPalindrome = function (x) {
  let y = x.toString();
  for (let i = 0; i < y.length; i++) {
    // loop forward and loop backward, compare character
    console.log(`y[${i}]: ${y[i]}`);
    console.log(`y[${y.length - 1 - i}]: ${y[y.length - 1 - i]}`);
    if (y[i] !== y[y.length - 1 - i]) return false;
  }
  return true;
};

console.log(isPalindrome(x));
