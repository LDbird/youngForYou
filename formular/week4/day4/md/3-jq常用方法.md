jquery方法只能jq对象或者jq($或者jQuery)调用，同样原生对象的方法也只能原生对象调用

``` javascript
let $tabBox = $('.tabBox');
console.log($tabBox);
// 1. height() 不传参时时获取元素对象的高度，传参是设置高度
console.log($tabBox.height());

// 2. width() 不传参获取元素对象的宽度、传参是设置宽度
console.log($tabBox.width());

// 3. offset() 获取当前元素距离body顶部和左侧的距离，返回一个对象
console.log($tabBox.offset());

// 4. scrollTop() / scrollLeft() 获取纵向/横向滚动条卷曲的距离
$(document.body).scrollTop(100); // 传参设置，不传参获取

// 5. innerHeight() / innerWidth() 获取当前元素的可视区域的高度/宽度 等价于 clientHeight/clientWidth

console.log($tabBox.innerHeight());
console.log($tabBox.innerWidth());

// 6. outerWidth()/outerHeight() 获取/设置当前元素的包含边框的高度，等价于offsetWidth/offsetHeight.
console.log($tabBox.outerHeight());
console.log($tabBox.outerWidth());
console.log($tabBox.outerWidth(true)); // 传递参数true表示获取时需要加上margin值

// 7. hasClass() 当前元素是否有某个类名
console.log($tabBox.hasClass('tabBox')); // true

// 8. addClass()  为当前jq元素追加类名
$tabBox.addClass('classByJQ');

// 9. removeClass() 从当前jq对象中移除类名
setTimeout(() => $tabBox.removeClass('classByJQ'), 2000);

// 10. append() 向元素末尾添加一个元素，容器.appendTo(元素)
$('#contextFilter').append('<p>这是一个追加的元素</p>');

// 11. appendTo 将元素插入到某个容器中 元素.appendTo(容器)
$('<i>appenTo</i>').appendTo($('#contextFilter'));

// 12. prepend()/prependTo() 向容器开头添加内容
$('#contextFilter').prepend($('<strong>开头</strong>'));
$('<strong>开头2</strong>').prependTo($('#contextFilter'));

// 13. before() / after() 向当前元素之前或者之后添加元素
$('#contextFilter').before($('<div>before增加的</div>'));
$('#contextFilter').after($('<div>after增加的</div>'));

// 14. insertAfter() / insertBefore() 将元素插入到指定元素后/前
$('<div>insertBefore</div>').insertBefore($('#fields'));
$('<div>insertAfter</div>').insertAfter($('#fields'));
// 注意，插入后这两个div和 #fields 是兄弟关系

// 15. replaceAll(selector) 用调用该方法的对象去替换选择器匹配到的内容
// $('<ol></ol>').replaceAll('ul'); // 用ol替换素有的ul

// 16. 元素.remove() 把元素移除
// $('#fields').remove();
console.log('++++++++++++++++++++++++++++++++++++++++++++');
// 17. next 获取下一个弟弟; nextAll 获取所有的弟弟
console.log($('.tabBox').next());
console.log($('.tabBox').nextAll());

// 18. prev 上一个哥哥; prevAll所有的哥哥
console.log($('#contextFilter').prev());
console.log($('#contextFilter').prevAll());

// 19. children(selector) 把元素下满足selector的元素获取到
console.log($('ul.header').children('.active'));

// 20. filter(selector) 在同级中过滤除满足条件的
console.log($('ul.header li').filter('.active'));

// 21. find(selector) 在后代中查找

console.log($('ul').find('li.active'));

// 22. css('width') 获取宽度；
        css('width', '200px') 设置宽度
        css({width: '200px', height: '200px', color: 'red'); // 批量设置

console.log($('ul').css('width'));
$('ul').css('width', '300px');
$('ul').css({height: '100px', color: 'red'});

// 23. text() 不传递是获取元素的innerText，传参是设置元素的innerText
console.log($('.header li.active').text())
$('.header li.active').text('哈哈哈哈哈')

// 24. html() 不传递是获取元素的innerHTML，传参是设置元素的innerHTML
console.log($('.header li.active').HTML())
$('.header li.active').HTML('<i>hajhahahh</i>')
//
```