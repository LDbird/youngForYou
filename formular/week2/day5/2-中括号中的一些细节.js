/*
* 中括号中的一些细节问题
*   [xyz]
*   [^xyz]
*   [a-z]
*   [^a-z]
*   1. 中括号中大多数元字符都是字符本身含义，而不是代表特殊元字符
*   2. 中括号中的两位数不代表两位数字，而是代表两个数字当中的一个
*
*
*
*
* */

// let reg = /^.+$/; // 有^和$表示只能是xxx
// console.log(reg.test('1')); // true
// console.log(reg.test('n')); // true
// console.log(reg.test('_')); // true
// console.log(reg.test('...'));  // true


// let reg = /^[.]+$/; // 有^和$表示只能是xxx
// console.log(reg.test('1')); // false
// console.log(reg.test('n')); // false
// console.log(reg.test('_')); // false
// console.log(reg.test('_')); // false
// console.log(reg.test('...'));  // true

// let reg = /^[18]$/;


// let reg = /^[12-65]$/;


/*
* 编写一个正则从18-65岁
* 18-19 1[89]
* 20-59 [2-5]\d
* 60-65 6[0-5]
*
* */

let reg = /^((1[89])|([2-5]\d)|(6[0-5]))$/;


