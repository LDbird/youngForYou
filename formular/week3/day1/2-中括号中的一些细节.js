/*
* 中括号的一些细节
* [xyz]
* [^xyz]
* [a-z]
* [^a-z]
* 1. 中括号中出现的元字符一般都是代表本身含义
* 2. 中括号中出现的两位数不是两位数，而是两个数字中的任意一个
*
* */

// let reg = /^.+$/; // 一个正则如果设置了^和$，那么代表的含义是：只能是xxx
//
// console.log(reg.test('n')); // true
// console.log(reg.test('1')); // true
// console.log(reg.test('nn')); // true
// console.log(reg.test('\n')); // false 正则中的元字符.表示除 \n 以外的任意字符

// let reg = /^[.]$/;
//
// console.log(reg.test('n')); // false
// console.log(reg.test('1')); // false
// console.log(reg.test('nn')); // false
// console.log(reg.test('\n')); // false
// console.log(reg.test('...')); // true 
// // 出现在方括号中的点 [.] 不再表示除\n 以外的任意字符了，而是表示一个普通的点

// let reg = /^[18]$/;
// // => 写在方括号([]) 中的两个数字不是表示一个两位数，而是表示这两个数字中的一个，所以这个正则的意思是：以一个数字1或8开头并且以一个数字1或者8结尾（想一个数字既是开头又是结尾，说明这个只能有一个，而且这个数字只能是1或者8）
// console.log(reg.test('18')); // false
// console.log(reg.test('1')); // true
// console.log(reg.test('8')); // true


let reg = /^[12-65]$/;
console.log(reg.test('13')); // false
console.log(reg.test('7')); // false
// 这个正则不是表示 12-65 而是表示 1或者2-6或者5


// => 需求：输入的值要在 18 - 65岁
/*
* [18-65] 不是代表18-65;方括号里面的两个数字，不是代表一个两位数，而是代表两个数字的当中的任意一个，如果想表示一个两位数或者多位数就要把他们拆分成多个一位数字，
* 1[89]
* [2-5][0-9]
* 6[0-5]
*
*
* */