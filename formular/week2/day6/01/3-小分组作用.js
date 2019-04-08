/*
* 分组的作用：
*   1. 改变默认的优先级
*   2. 分组引用
*   3. 分组捕获
* */

// => 改变默认优先级
// let reg = /^18|19$/;
// console.log(reg.test('18')); // true
// console.log(reg.test('19')); // true
// console.log(reg.test('1819')); // true
// console.log(reg.test('189')); // true
// console.log(reg.test('819')); // true
// console.log(reg.test('119')); // true
// console.log(reg.test('181')); // true
// console.log(reg.test('182222219')); // true

// let reg = /^(18|19)$/;
// console.log(reg.test('18')); // true
// console.log(reg.test('19')); // true
// console.log(reg.test('1819')); // false
// console.log(reg.test('189')); // false
// console.log(reg.test('181')); // false
// console.log(reg.test('819')); // false
// console.log(reg.test('119')); // false
/*
* test 方法用于验证字符串是否符合正则，如果如何就返回true，不符合返回false
*
*
* */

// => 分组引用

// let reg = /^([a-z][a-z]\2\1)/; // 正则中出现的\1代表和第一个分组出现一模一样的内容
// console.log(reg.test('oppo')); // true
// console.log(reg.test('LEVEL')); // true
// console.log(reg.test('poop')); // true

// => 正则捕获
// => 编写一个正则匹配身份证号码

// let reg = /^d{17}(\d|X)$/; // 简单：只能匹配是否符合格式，不能提取出身份证中的一些信息
var str = '130206199207072131';
// 130206199207072131
// 130206 地域
// 19920707 出生年月
// 2131 倒数第二位：奇数=男 偶数=女

// let reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(?:\d|X)/;
// console.log(reg.test(str));
// console.log(reg.exec(str)); /*
/* ["130206199207072131",
 "130206",
 "1992",
 "07",
 "07",
 "3",
 index: 0,
 input: "130206199207072131"
 ]*/

// => EXEC实现的是正则的捕获，获取的结果是一个数组，如果不匹配正则，返回的结果是null。如果匹配到，这返回一个数组，捕获的时候不仅把大正则匹配的信息捕获到，而且每一个小分组中的内容也捕获到，数组的第一项是大正则匹配到的内容，后面依次是正则分组匹配到的内容

/*
* 正则捕获使用的是正则中的EXEC方法：
* 1. 如果可以匹配，获取的结果是一个数组，如果不匹配获取的结果是null
* 2. 如果我们只在匹配的时候，想要获取大正则中部分信息，我们可以把这部分使用小括号包起来，形成一个分组，这样在捕获的时候，不仅可以把大正则匹配的信息捕获到，而且还单独的把小分组匹配的信息也捕获到了（分组捕获）
* 3. 有时候写小分组不是为了捕获信息，只是为了改变优先级或者进行分组引用，此时我们可以在分组前面加上“?:”，代表只去匹配，但是不把这个分组内容
*
* */