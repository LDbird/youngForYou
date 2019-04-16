// 1. show() / hide() 显示或者隐藏；参数是动画持续时间
// 2. slideUp() / slideDown() 滑动收起，下滑展开
// 3. fadeIn() / fadeOut() 淡入/淡出
// 4. slideToggle() 和上一次动画相反，如果上一次是slideUp，再执行就是slideDown
// 5. animate() $(selector).animate(styles,speed,easing,callback)
// 6. stop() 方法，在动画开始前调用一次，可以清除上一次动画，不论到没到终点，都会停掉
// 7. finish() 结束本次动画，忽略动画规定的时间，一下子到达动画终点


$('#btn').click(function () {
  // $('.animate').hide(300);
  $('.animate').show(300);
  // $('.animate').slideUp(300);
  // $('.animate').slideDown(300);
  // $('.animate').slideToggle(300);
  $('.animate').animate({height: '300px'}, 300);
  setTimeout(() => {
    // $('.animate').stop(); // 在100ms时停止元素对象的动画，此时元素的高度不是300px
    $('.animate').finish(); // 在100ms时完成动画，此时元素高度是300px
  }, 100)
});

$('#btn').click(function () {
  // $('.animate').hide(300);
  $('.animate').show(300);
  // $('.animate').slideUp(300);
  // $('.animate').slideDown(300);
  // $('.animate').slideToggle(300);
  $('.animate').animate({height: '300px'}, 300);
  setTimeout(() => {
    // $('.animate').stop(); // 在100ms时停止元素对象的动画，此时元素的高度不是300px
    $('.animate').finish(); // 在100ms时完成动画，此时元素高度是300px
  }, 100)
});


