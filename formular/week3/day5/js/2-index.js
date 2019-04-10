let flowRender = (function () {
  let listBox = document.getElementById('flowBox');
  let flowList = listBox.getElementsByTagName('li');
  let page = 0;
  let isRun = false;
  let winH= document.documentElement.clientWidth;

  // 获取数据
  let queryData = function () {
    if (isRun) return;
    isRun = true;

    // => 每次请求数据时就把page累加，这样真实的项目中从服务器获取的的数据就是不一样的（我们今天加载10页就不在加载了，提示没有更多数据，但是真实项目中具体页数需要根据需求来定。
    if (page > 10) {
      // 我感觉这部分内容是最后渐进增强的
      alert('没有更多数据了');
      window.onscroll = null;
    }
    page++;

    // ajax 请求数据
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `json/data.json?page=${page}`, false);
    xhr.onreadystatechange = function () {
      if (+xhr.readyState === 4 && xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        // 拿到数据，我们需要在这里构造绑定数据
        insertHTML(data);
        // 在完成数据绑定后我们把isRun重置，以便再次请求
        isRun = false;
      }
    };
    xhr.send(null);
  };

  // 按照真实内容高度给三个li排序
  let sortLi = function () {
    let flowListAry = Array.from(flowList);

    if (flowList[0].offsetHeight === 0) {
      // 页面初次加载的时候，li里面是没有任何内容的，此时的顺序就是默认顺序，不需要排序了
      return flowListAry;
    }
    return flowListAry.sort(
      (a, b) => a.offsetHeight - b.offsetHeight
    )
  };

  // 拼接html模板字符串
  let queryHTML = function ({id, pic, link, title}) {
    return `<a href="${link}">
      <div><img data-src="${pic}" alt=""></div>
      <span>${title}</span>
    </a>`
  };

  // 每三个一组，遍历获取的数据，将数据一次增加到页面中
  let insertHTML = function (result) {
    for (let i = 0; i < result.length; i += 3) {
      let ary = [
        result[i],
        result[i + 1],
        result[i + 2]
      ];

      // 给三个li排序，按照这三个li的真实的高度排序，
      let flowListAry = sortLi();

      // 排好序后，排在第一个的说明就是高度最小的li，我们需要最先给内容高度最小的追加内容，然后给内容高度第二的追加，最后给内容高度最大的追加。
      ary.forEach((data, index) => {
        data
          ? flowListAry[index].innerHTML += queryHTML(data)
          : null
      });
    }
  };

  // => 加载更多
  let loadMore = function () {
    let pageH = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;

    if ((pageH - winH) <= (scrollTop + 200)) {
      queryData();
    }

  };

  // => 懒加载
  let lazyLoad = function () {
    let imgList = document.querySelectorAll('img');
    let imgAry = Array.from(imgList);

    for (let i = 0; i < imgAry.length; i++) {
      let item = imgAry[i];
      let imgOffsetTop = item.offsetTop;
      let winH = document.documentElement.clientHeight;
      let winScrlTop = document.documentElement.scrollTop;
      let dataSrc = item.getAttribute('data-src');
      if (
        (imgOffsetTop - winH - winScrlTop + 100) <= 0 &&
        !item.src
      ) {
        let newImg = document.createElement('img');
        newImg.src = dataSrc;
        newImg.onload = function () {
          item.src = dataSrc;
        }
      }
    }
  };

  return {
    init() {
      queryData();
      lazyLoad();
      window.onscroll = function () {
        loadMore();
        lazyLoad();
      }
    }
  }
})();

flowRender.init();