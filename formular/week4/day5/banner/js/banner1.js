/*
* I. 目标：
*   1. 绑定数据
*   2. 实现轮播
* */

let bannerRender = (function () {
  // 获取元素：
  let $container = $('#container'),
    $wrapper = $('.wrapper'),
    $focus = $('.focus'),
    $arrowLeft = $('.arrowLeft'),
    $arrowRight = $('.arrowRight'),
    $slideList = null,
    $focusList = null;

  // 轮播图基础参数
  let stepIndex = 0; // 记录当前要显示的图片的索引
  let autoTimer = null; // 记录自动轮播定时器id（因为我们后面还要鼠标放上去的时候停止轮播，停止轮播需要清除定时器，而清除定时器需要知道定时器id）
  let interval = 3000; // 自动轮播间隔，3000只是一个默认值，根据真实项目的需求调整；

  // queryData 获取数据
  function queryData(successFn, errorFn) {
    $.ajax({
      method: 'GET',
      url: 'json/banner.json',
      async: false,
      dataType: 'json',
      success: function (data) {
        // 这里就已经拿到数据了，data就是我们从服务端拿到的数据，并且jquery已经帮我们处理成对象了
        // 思考：我们在这里是不是就可以执行绑定数据的操作了
        successFn(data)
      },
      error: errorFn
    })
  }

  // bindHTML 绑定数据
  function bindHTML(data) {
    // 1. 设置slideStr、focusStr空字符串
    let slideStr = ``; // wrapper里面的图片
    let focusStr = ``; // 轮播图下面的小点点

    // 2. 遍历数据，拼接图片和焦点
    data.forEach((item, index) => {
      let {img, desc} = item;
      slideStr += `<div class="slide">
<img src="${img}" alt="${desc}">
</div>`;
      focusStr += `<li class="${index === 0 ? 'active' : ''}"></li>`
      // 默认第一个焦点时选中的，所以当index为0时表示第一个焦点
    });

    // 3. 为了实现无缝拼接，还需要把wrapper下的第一张图片复制一份到容器末尾，所以我们这里需要在slideStr末尾多拼接一份第一个
    slideStr += `<div class="slide">
<img src="${data[0].img}" alt="${data[0].desc}">
</div>`;

    // 4. 插入页面内
    $wrapper.html(slideStr);
    $focus.html(focusStr);

    // 5. 因为我们说jq获取的元素时静态集合，所以需要在绑定数据后再获取wrapper下的图片集合以及轮播图上的小焦点集合
    $slideList = $('.wrapper .slide');
    $focusList = $('.focus > li');

    // 6. 动态计算wrapper的宽度，$slideList有多少个，wrapper的宽度就应该有多少个图片的宽度（每个图片宽1000）
    $wrapper.css({
      width: $slideList.length * 1000
    })
  }

  // 执行请求+绑定数据
  queryData(bindHTML);

  // autoMove 控制轮播图自动轮播
  function autoMove() {
    // 1. 因为stepIndex记录的是当前展示的图片，所以轮播下一张需要先给stepIndex++
    stepIndex++;

    $wrapper.animate({
      left: -stepIndex * 1000
    }, 200)
  }

  autoTimer = setInterval(autoMove, interval);
})();