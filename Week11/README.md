学习笔记

## CSS 总论 ｜ CSS 语法的研究

CSS 

1. at-rules
1. rule

at-rules

1. @charset
1. @import
1. @media
1. @page

rule

## CSS 总论 ｜ CSS @规则的研究

at-rule 

1. @charset: https://www.w3.org/TR/css-syntax-3/
1. @import: https://www.w3.org/TR/css-cascade-4/
1. @media: https://www.w3.org/TR/css3-conditional/
1. @page: https://www.w3.org/TR/css-page-3/
1. @counter-style: https://www.w3.org/TR/css-counter-styles-3
@keyframes: https://www.w3.org/TR/css-animations-1/
1. @fontface: https://www.w3.org/TR/css-fonts-3/
1. @supports: https://www.w3.org/TR/css3-conditional/
1. @namespace: https://www.w3.org/TR/css-namespaces-3/

## CSS 总论 ｜ CSS 规则的结构

1. 选择器
1. 声明
    1. Key
    1. Value

```css
div{
    background:blue;
}
```

1. Selector
    1. https://www.w3.org/TR/selector-3/
    1. https://www.w3.org/TR/selectors-4/

1. Key
    1. Properties
    1. Variables: https://www.w3.org/TR/css-variavles/

1. Value
    1. https://www.w3.org/TR/css-values-4/

## CSS 总论 ｜ 收集标准

`www.w3.org/TR`这个网站可以搜索所有的CSS标准和提案

```js
Array.prototype.slice.call(document.querySelector('#container').children).filter(e=>e.getAttribute('data-tag').match(/css/).map(e=>({name:e.children[1].innerText,url:e.children[1].children[0].href})))
```

## CSS 总论 ｜ 总结

1. CSS 语法
1. at-rule
1. selector
1. variables
1. value
1. 实验

## CSS 选择器 ｜ 选择器语法

### 简单选择器

1. `*`
    选择任意元素
1. div svg｜a
    svg html 和 MathML 都有各自的命名空间 除了 svg 的 a 和 html 的 a 有冲突以为其实他们名字都不一样。
1. .cls
    class 选择器
1. #id
    id选择器
1. [attr=value]
    属性选择器
1. :hover
    伪类选择器
1. ::before
    伪元素选择器

### 复合选择器

1. <简单选择器><简单选择器><简单选择器>
1. `*`或者`div`必须写在最前面

### 复杂选择器

1. <复合选择器> \<sp\> <复合选择器>
1. <复合选择器> \"\>\" <复合选择器>
1. <复合选择器> \"\~\" <复合选择器>
1. <复合选择器> \"\+\" <复合选择器>
1. <复合选择器> \"||\" <复合选择器>

## CSS 选择器 ｜ 选择器的优先级

1. 简单选择器
```css
/*1        2*/
#id div.a#id {
    /**/
}
/*
[0,2,1,1]
style id class tagName
s = 0 * N^3 + 2 * N^2 + 1 * N^1 + 1 * N^0
取N = 1000000
S = 2000001000001
一般取 N = 256 的整次幂
*/
```

## CSS选择器 ｜ 伪类

### 链接/行为

1. :any-link
1. :link :visited
1. :hover
1. :active
1. :focus
1. :target

### 树结构

1. :empty
1. :nth-child()
1. :nth-last-child()
1. :first-child :last-child :only-child

以上的选择器中 会增加 css 回溯计算的复杂性 降低性能。特别是`:nth-last-child()`

### 逻辑形

1. :not伪类
1. :whiere :has
