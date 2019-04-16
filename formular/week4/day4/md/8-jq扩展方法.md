## 扩展jq的方法

### 1. 向jQuery自身添加方法 => $.extend({functionName: function, ....})

```javascript
$.extend({
  sayName() {
    console.log('my name is bingo');
  }
});
$.sayName();

// $('.header').sayName(); // $(...).sayName is not a function 【因为方法是添加jq类型本身上的，只有jq自己能调用】
```

### 2. 向jq原型上添加方法 => $.fn.extend({functionName: function () {});

```javascript
$.fn.extend({
  sayHello() {
    console.log('hello ');
  }
});
$('.header').sayHello();
```