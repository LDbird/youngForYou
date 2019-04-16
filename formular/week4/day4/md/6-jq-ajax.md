```javascript
$.ajax({
  url: 'data/product.json', // 接口地址
  method: 'GET', // http method
  dataType: 'json', // 数据类型为 JSON
  async: false, // 异步与否，默认异步
  success: function (result) { // 如果请求成功执行的操作
    console.log(result);
  },
  error: function (err) { // 如果失败，需要进行的操作
    console.log(err);
  }
});
```

+ $.ajax() 是通过$调用的，说明ajax方法是定义在jQuery自身上的，而css，html，animate等都是定义在jq原型上的方法。