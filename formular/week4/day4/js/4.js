$(function ($) {
  // 获取元素：
  let $tabList = $('.tabBox > .header > li'),
    $divList = $('.tabBox > div');

  // 为选项卡头绑定点击事件
  $tabList.on('click', function () {
    let index = $(this).index(); // 获取当前点击的li的索引
    // $(this).addClass('active')
    //   .siblings()
    //   .removeClass('active');
    // $divList.eq(index).addClass('active')
    //   .siblings().removeClass('active');

    // 一行写法
    $(this).addClass('active')
      .siblings()
      .removeClass('active')
      .parent()
      .nextAll()
      .eq(index)
      .addClass('active')
      .siblings()
      .removeClass('active')
  })
});