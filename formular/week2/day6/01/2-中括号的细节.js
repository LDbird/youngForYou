/*
* 中括号的一些细节
* [xyz]
* [^xyz]
* [a-z]
* [^a-a]
*
* 1. 中括号中出现的字符一般都是代表本身含义的
* 2. 中括号中出现的两位数，而是代表两个数字中的任意一个
*
*
* */

// let reg = /^.+$/; // 一个正则设置了^和$，那么代表的含义其实就只能是xxx
// console.log(reg.test('n')); // => true
// console.log(reg.test('1')); // => true
// console.log(reg.test('nn')); // => true
// console.log(reg.test('\n')); // => false

// >> 连接词：出现在[]里面的字符大多都是字符的本身含义，例如这里对的.就是一个.
// let reg = /^[.]+$/;
// console.log(reg.test('n')); // => false
// console.log(reg.test('1')); // => false
// console.log(reg.test('nn')); // => false
// console.log(reg.test('\n')); // => false
// console.log(reg.test('...')); // => true

// let reg = /^[\d]$/; // \d 在这里依然是0-9中的一个数字
// console.log(reg.test('0')); // => true
// console.log(reg.test('d')); // => false

// let reg = /^[18]$/; // => 不加^和$代表字符串只要包含xxx即可
// console.log(reg.test('18')); // false
// console.log(reg.test('8')); // => true
// console.log(reg.test('1')); // => true


// let reg = /^[12-65]$/;
// console.log(reg.test('13')); // => false
// console.log(reg.test('1')); // => true
// console.log(reg.test('2')); // true
// console.log(reg.test('7')); // => false
// console.log(reg.test('3.5')); // false
// // !! 注意这个正则不是表示12-65，而是表示 1或者2-6或者5

// 年龄 18-65之间

/*
* 18-19 1[89]
* 20-59 [2-5]\d
* 60-65 5[0-5]
* */

let reg = /^(1[89])|([2-5]\d)|(6[0-5])$/;

// => 需求：编写一个规则，匹配"[object AAA]"
let reg2 = /^\[object .+]$/


















