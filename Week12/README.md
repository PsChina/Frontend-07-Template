学习笔记

## CSS 排版 ｜ 盒

|源代码|语意|表现|
|:---:|:---:|:---:|
|标签|元素|盒|
|Tag|Element|Box|

HTML代码中可以书写开始标签，结束标签和自封闭标签。


一对起止标签表示一个元素。


DOM树中存储的是元素和其他类型的节点（Node）。


CSS选择器选中的是元素（或伪元素）。


CSS选择器选中的元素，在排版时可能产生多个盒。


排版和渲染的基本单位是盒。


### 盒模型

外边距：margin

内边距：padding

边框：border

宽：width

高：height

怪异盒模型

box-sizing:border-box

width = width + padding + border

标准盒模型

box-sizing:content-box

width = width