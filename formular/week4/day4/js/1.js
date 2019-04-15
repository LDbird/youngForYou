/*
* 类库、插件、UI组件、框架
* 1. 类库：jq/zepto... 提供一些真实项目中常用的方法，任何项目都可以把类库导入进来，调取里面的方法实现自己需要的业务逻辑。
* 2. 插件：具备一定的业务功能，例如我们可以封装轮播图插件，选项卡插件，模态框插件等（插件规定了当前这个功能的样式、结构，把实现功能的js进行封装，以后想实现这个功能直接导入插件即可）siwper/iscroll/query-dialog/jquery-drag/jquery-datapicker/e-charts....
* 3. UI组件：把结构、css、js全部都封装好了，我们想实现一个功能直接导入进来即可（偶尔需要我们修改一下）bootstarp....
* 4. 框架：具备一定的编程思想，要求我们按照框架的思想开发，一般框架中提供了常用的类库方法，提供了强大的功能插件，有的也提供了强大的UI组件React(React native) Vue Angular Backbone
*
*
* jquery (jq) 非常优秀的js类库：
*   -> 基于原生js封装的一个类库，提供了很多的方法，而且这些方法是兼容所有浏览器的【jq 2.0+ 不再兼容ie8及以下】
*   -> jq版本
*   v1（常用的） 1.8.3 1.93 1.11.3
*   v2
*   v3
*   v4
*
*
* */

(function () {
  var version = '1.11.3',
  jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context); // 创建了一个init这个类的实例，也相当于创建了jQuery这个类的实例（因为后面的时候，让init.prototype = jQuery.prototype
  };

  // => jQuery 是一个类，在它的原型上提供了很多的属性和方法，提供jq的实例实例调取使用
  jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery, // 当前类型的原型重定向后，自己开辟的堆内存中是没有constructor的，需要手动增加保证它的完整性,
    filter: function () {}
  };

  // => 给jq的原型上增加extend方法，同时把jq当做一个普通的对象，给这个对象设置了一个私有的方法
  /*
  * jq是一个类（也是一个普通对象）：函数的两种角色，jq是一个类库提供了很多的方法，其中这些方法有两部分。
  * 1. 放到jq原型上的（jQuery.fn/jQuery.prototype)，这里面的方法是供jq的实例调取使用的。
  * 2. 把jq当做一个普通的对象，在对象上设置一些私有的属性和方法，这些方法以后用的时候就直接jQuery.xxx()执行即可。
  *
  *
  * */
  jQuery.extend = jQuery.fn.extend = function () {
    // extend 是把一个对象中的属性和方法扩展到指定的对象上
  };
  jQuery.extend({
    isFunction: function (obj) {},
    isArray: function () {}
  });
  // jQuery: {extend: ..., isFunction: ...,isArray:...}
  jQuery.fn.extend({find: function() {}})
  // jQuery.prototype: {find: function () {}, ....}

  var init = jQuery.fn.init = function (selector, context) {};
  init.prototype = jQuery.fn; // 把init当做一个类，但是让这个类的原型指向了jQuery.prototype（init这个类的实例最后找到的也是jQuery的原型上的方法，或者说init的实例其实也jQuery的实例）
  window.jQuery = window.$ = jQuery;
})();