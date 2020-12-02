学习笔记

# css 知识

1. `display:inline-block` 的元素在同一行显示存在无法对齐的情况需要用 `vertical-align:middle` 来使其对齐。
1. `text-align:center` 用于行内元素或者行内块元素的水平剧中。
1. `line-height` 等于 `height` 用于行内元素或者行内块元素的垂直剧中。

# js 知识

1. `appendChild` 拥有比 `append` 更好的兼容性但是缺点是只能接收一个参数且不接受文本节点。
1. `classList` 比 `className` 用起来更加方便但是存在一定的兼容性问题。(`cssText` 比 `style` 性能更好因为它减少了浏览器回流次数)。
1. `JSON.parse(JSON.stringify())` 是一种简便的克隆方式。

>   JSON.parse(JSON.stringify(obj))深拷贝的问题
>   1. 如果obj里面存在时间对象,JSON.parse(JSON.stringify(obj))之后，时间对象变成了字符串。
>   2. 如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象。
>   3. 如果obj里有函数，undefined，则序列化的结果会把函数， undefined丢失。
>   4. 如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null。
>   5. JSON.stringify()只能序列化对象的可枚举的自有属性。如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor。
>   6. 如果对象中存在循环引用的情况也无法正确实现深拷贝。
