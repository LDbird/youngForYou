/*
* => 时间字符串格式化
*   "2018/4/30 17:50:23" => '04-30 15:50'
*   
*
*
* */

// let str = "2018/4/30 17:50:23";
// let reg = /(?:\/| |:)/g;
// let ary = str.split(reg);
//
// let [,month, day, hour, minu] = ary;
// let result = `${month}-${day} ${hour}:${minu}`;
// console.log(result);

let str = "2018/4/30 17:50:23";
// 1. 获取时间字符串中的所有数字（split）
let ary = str.match(/\d+/g).map((item) => {
  return item < 10 ? '0' + item : item;
});
//   ["2018", "04", "30", "17", "50", "23"]

// 2. 指定最后想要的时间格式，我们基于这个数组中的内容，帮你拼接

let tmp = '{0}年{1}月{2}日 {3}时{4}分{5}秒';
let tmpReg = /\{(\d)\}/g;
let result = tmp.replace(tmpReg, function (...arg) {
  let [, index] = arg; // index:每一次正则匹配小分组捕获的结果（也就是那个数字）
  return ary[index];
});
console.log(result); //
// >> 连接词：回环

String.prototype.myFormatTime = function (template = '{0}年{1}月{2}日 {3}时{4}分{5}秒') {
  let ary = this.match(/\d+/g).map(item => item < 10 ? '0' + item : item);

  return template.replace(/\{(\d)\}/g, (...[, index]) => ary[index] || '00')
};

console.log("2018/4/30 17:50:23".myFormatTime('{3}:{4}:{5}'));