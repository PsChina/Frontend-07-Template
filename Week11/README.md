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

1. *
1. div svg｜a
1. .cls
1. #id
1. [attr=value]
1. :hover
1. ::before

### 复合选择器

1. <简单选择器><简单选择器><简单选择器>
1. `*`或者`div`必须写在最前面

### 复杂选择器

1. <复合选择器> \<sp\> <复合选择器>
1. <复合选择器> \"\>\" <复合选择器>
1. <复合选择器> \"\~\" <复合选择器>
1. <复合选择器> \"\+\" <复合选择器>
1. <复合选择器> \"||\" <复合选择器>