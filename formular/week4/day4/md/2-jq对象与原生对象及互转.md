## 2-jq对象与原生对象及互转


###  jquery 对象
我们通过$()方法获取都是jquery对象，都是jQuery的一个实例;每个jq对象是一个类数组对象，其中有索引的表示获取的元素对象（原生对象），属性length表示本次获取到的元素个数。

```javascript
 [
    0: p
    context: document
    length: 1
    prevObject: m.fn.init [document, context: document]
    selector: "#contextFilter p:contains("钱")"
    __proto__: Object(0)
]
```

+ 用jq获取元素对象或者元素集合，不管能不能获取到都会返回一个对象，而原生js方法如果获取不到会返回null。如果想判断jq是否获取到元素了，应该判断jq对象的length属性，如果为0，表示没有获取到。

// 1. 原生js对象转jq对象：把原生对象作为一个参数传递给$()方法 => $(原生js元素对象)，

```javascript
let tabBox = document.getElementById('tabBox');
console.log(tabBox);
console.log($(tabBox));
```

// 2. jq对象转原生对象：jq对象的里面的索引对应的都是原生对象，可以使用[索引]或者get(索引)获取。

```javascript
console.log($('#tabBox li')[0]);
console.log($('#tabBox li').get(0));
```