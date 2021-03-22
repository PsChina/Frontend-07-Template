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
1. @keyframes: https://www.w3.org/TR/css-animations-1/
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

### 逻辑型

1. :not伪类
1. :where :has

## CSS 选择器 | 伪元素

常用的伪元素

1. ::before
1. ::after
1. ::first-line
1. ::first-letter

伪元素分为两类，一类是添加一个不存在的元素，另一类是用一个不存在的元素将一些文本括起来的一个集合。

```html
<div>
<::before/>
content conent content
content conent content
<::after>
</div>
```

```html
<div>
<::first-letter>c</::first-letter>ontent conent content
content conent content
</div>
```

```html
<div>
<::first-line>content conent content</::first-line>
content conent content
</div>
```


### first-line

1. font系列
1. color系列
1. background系列
1. word-spacing
1. letter-spacing
1. text-decration
1. text-transform
1. line-height


### first-tetter

1. font系列
1. color系列
1. background系列
1. text-decoration
1. text-transform
1. letter-spacing
1. word-sapcing
1. line-height
1. float
1. certical-align
1. 盒模型系列 


```js
    function match(selector, element, isRepeate) {
        if (!(selector instanceof Array)) {
            selector = selector.split(' ')
        }
        while (selector.length) {
            const item = selector.pop()
            const sSelector = item.match(/(#|\.)*[a-zA-Z\-_0-9]+/g)
            if (sSelector.length > 1) {
                do {
                    if (analyse(sSelector.pop(), selector, element, !isRepeate) === false) {
                        return false
                    }
                } while (sSelector.length)
                if (selector.length) {
                    return match(selector, element.parentElement, true)
                } else {
                    return true
                }
            } else {
                return analyse(item, selector, element, !isRepeate)
            }
        }
        return false
    }

    function analyse(item, selector, element, onlyCurrent) {
        const char = item.charAt(0)
        if (char === '.') {
            if (element.className.split(' ').includes(item.substring(1))) {
                if (selector.length) {
                    return match(selector, element.parentElement, true)
                } else {
                    return true
                }
            }
        } else if (char === '#') {
            if (element.id === item.substring(1)) {
                if (selector.length) {
                    return match(selector, element.parentElement, true)
                } else {
                    return true
                }
            }
        } else if (char.match(/[a-zA-Z_]/)) {
            if (element.tagName === item.toUpperCase()) {
                if (selector.length) {
                    return match(selector, element.parentElement, true)
                } else {
                    return true
                }
            }
        }
        if (element.parentElement && !onlyCurrent) {
            return analyse(item, selector, element.parentElement)
        }
        return false
    }
```