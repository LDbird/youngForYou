1. show() / hide() 显示或者隐藏；参数是动画持续时间
2. slideUp() / slideDown() 滑动收起，下滑展开
3. fadeIn() / fadeOut() 淡入/淡出
4. slideToggle() 和上一次动画相反，如果上一次是slideUp，再执行就是slideDown
5. animate() $(selector).animate(styles,speed,easing,callback)
6. stop() 方法，在动画开始前调用一次，可以清除上一次动画，不论到没到终点，都会停掉
7. finish() 结束本次动画，忽略动画规定的时间，一下子到达动画终点

### 1. show() / hide() 显示或者隐藏；参数是动画持续时间

```javascript
$('#btn').click(function () {
  $('.animate').hide(300);
});

```

```javascript
$('#btn').click(function () {
  $('.animate').show(300);
});
```

### 2. slideUp() / slideDown() 滑动收起，下滑展开

```javascript
$('#btn').click(function () {
  $('.animate').slideUp(300);
});
```

```javascript
$('#btn').click(function () {
  $('.animate').slideDown(300);
});
```

### 3. fadeIn() / fadeOut() 淡入/淡出

```javascript
$('#btn').click(function () {
  $('.animate').fadeOut(300);
});
```

### 4. slideToggle() 和上一次动画相反，如果上一次是slideUp，再执行就是slideDown

```javascript
$('#btn').click(function () {
  $('.animate').slideToggle(300);
});
```

### 5. animate() $(selector).animate(styles,speed,easing,callback)

```javascript
$('#btn').click(function () {
  $('.animate').animate({height: '300px'}, 300);
});
```

### 6. stop() 方法，在动画开始前调用一次，可以清除上一次动画，不论到没到终点，都会停掉
```javascript
$('#btn').click(function () {
  $('.animate').animate({height: '300px'}, 300);
  setTimeout(() => {
    $('.animate').stop(); // 在100ms时停止元素对象的动画，此时元素的高度不是300px
  }, 100)
});
```

### 7. finish() 结束本次动画，忽略动画规定的时间，一下子到达动画终点

```javascript
$('#btn').click(function () {
  $('.animate').animate({height: '300px'}, 300);
  setTimeout(() => {
    $('.animate').finish(); // 在100ms时完成动画，此时元素高度是300px
  }, 100)
});
```


