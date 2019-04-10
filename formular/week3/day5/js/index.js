let flowRender = (function () {
  let listBox = document.getElementById('flowBox');
  let flowList = listBox.getElementsByTagName('li');
  let isRun = false;
  let page = 0;
  let count = 0;

  // 获取数据
  let queryData = function () {
    if (isRun) return;
    isRun = true;

    // => 每次请求新数据都把page累加，这样真实项目中从服务器获取的数据就是不一样的（加载10页就不在加载，提示没有更多数据，具体页数根据项目需求来定）
    if (page > 10) {
      alert('没有更多数据了');
      window.onscroll = null;
      return
    }
    page++;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `json/data.json?page=${page}`, false);
    xhr.onreadystatechange = function () {
      if (+xhr.readyState === 4 && +xhr.status === 200) {
        // do sth to insert the day to each li
        let data = JSON.parse(xhr.responseText);
        insertHTML(data)
      }
    };
    xhr.send(null);
  };


  let queryHTML = function ({id, pic, link, title}) {
    return `<a href="${link}" target="_blank">
      <div><img data-src="${pic}" alt=""></div>
      <span>${title}</span>
    </a>`
  };

  // => 为三个li进行排序，按照内容的高度进行排序
  let sortLi = function () {
    let flowListAry = Array.from(flowList);

    if (flowList[0].offsetHeight === 0) {
      // 第一次：还没有加入任何内容，此时的顺序就是默认顺序
      return flowListAry;
    }
    return flowListAry.sort((a, b) => a.offsetHeight - b.offsetHeight);
  };

  // 每三个为一组，迭代所有的数据依次增加到页面中
  let insertHTML = function (result) {
    // result 就是从服务器获取的数据

    for (let i = 0; i < result.length; i += 3) {
      let item1 = result[i],
        item2 = result[i + 1],
        item3 = result[i + 2];

      // 给li排序，并且向每个li中追加内容
      let flowListAry = sortLi();
      item1 ? flowListAry[0].innerHTML += queryHTML(item1) : null;
      item2 ? flowListAry[1].innerHTML += queryHTML(item2) : null;
      item3 ? flowListAry[2].innerHTML += queryHTML(item2) : null;

    }
    isRun = false;
  };


  // => 加载更多
  let loadMore = function () {
    let winH = document.documentElement.clientHeight;
    let pageH = document.documentElement.scrollHeight;
    let scrollT = document.documentElement.scrollTop;

    if ((pageH - winH + 100) <= (scrollT + 100) ) {
      queryData();
    }
  };

  // => 懒加载
  let lazyLoad = function () {
    let imgList = document.querySelectorAll('img');
    let imgAry = Array.from(imgList);
    imgAry.forEach(item => {
      let imgOffsetTop = item.parentNode.offsetTop;
      let winH = document.documentElement.clientHeight;
      let winScrollTop = document.documentElement.scrollTop;
      let dataSrc = item.getAttribute('data-src');
      if ((imgOffsetTop - winH - winScrollTop) <= -200 && !item.src) {
        let newImg = document.createElement('img');
        newImg.src = dataSrc;
        newImg.onload = function () {
          item.src = dataSrc;
        }
      }
    })
  };
  return {
    init: function () {
      queryData();
      lazyLoad();
      window.onscroll = () => {
        loadMore();
        lazyLoad();
      };
    }
  }
})();
flowRender.init();