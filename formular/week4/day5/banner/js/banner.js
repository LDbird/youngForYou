let bannerRender = (function () {
  // -> 获取后续需要操作的对象或者元素
  let container = $('#container'),
    wrapper = $('.wrapper'),
    arrowLeft = $('.arrowLeft'),
    arrowRight = $('.arrowRight'),
    slideList = null,
    focusList = null;

  // => 轮播图运动的基础参数
  let stepIndex = 0; // stepIndex 记录当前展示块的索引
  let autoTimer = null; // autoTimer 自动轮播的定时器
  let interval = 3000; // interval 间隔多长时间自动切换

  // autoMove：控制轮播图的运动和切换
  /*
  * 索引为1，展示第二张，warpper 的left - 1000;
  * 索引为2， 展示第三章，wrapper的left - 2000；
  * ....
  * warpper的left值其实就是当前要展示的图片索引对应的结果 ：-索引 * 1000
  *
  *
  * */
  function autoMove() {
    stepIndex++;
    if (stepIndex >= slideList.length) {
      // 说明再往后切换没有，现在展示的是克隆的第一张，此时我们让wrapper立刻回到真实的第一张的位置，left = 0，然后stepIndex = 1，这样就可以切换到第二张了
      wrapper.css('left', 0);
      stepIndex = 1;
    }
    wrapper.animate({
      left: -stepIndex * 1000
    }, 200); // 200 是从当前切换到下一张的动画时间 interval是间隔多久切换一次

    // -> 每一次运动完成需要让焦点跟着切换
    changeFocus();
  }

  // changeFocus: 让焦点跟着轮播图切换而切换（运动到克隆的这一张的时候，也需要让第一个li有选中的样式

  function changeFocus() {
    // 当轮播图运动到最后一张（克隆的第一张，我们需要让第一个li有选中样式，之所以使用tempIndex是因为stepIndex对轮播图切换起着很大作用，不能轻易修改）
    let tempInd
  }
})();