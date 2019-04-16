// I 对象法
let str = 'zhufengpeixun@mabin@professional';
let obj = {};
for(let i = 0; i < str.length; i++) {
  let char = str[i];
  if (char in obj) {
    obj[char]++;
  } else {
    obj[char] = 1;
  }
}
// => 获取出现最多的次数
let max = 0, letter = '';
for (let key in obj) {
  if (obj[key] > max) {
    max = obj[key]
    letter = key
  }
}
console.log(max, letter);

// 方法2：利用Object.entries 把对象转成数组，然后再按照降序排列
let entries = Object.entries(obj);
entries.sort((a, b) => b[1] -a[1]);
console.log(entries[0]);
