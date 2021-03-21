学习笔记

## 重学HTML ｜ HTML定义 XML 与 SGML

HTML的定义：XML 与 SGML

发展到 HTML5.0 以后就越来越独立于 XML 与 SGML 了是接受了 XML 与 SGML 灵感的独立语言

### DTD 与 XML namespace

1. http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd
1. http://www.w3.org/1999/xhtml

当我们用 `&nbsp` 来进行排版的适合会出现分词问题原因是 `&nbsp` 是 no-break space 它不会把两端的词打断。
建议使用 css 里面 white space

`&#955` 或者 `&lambda` 是 lambda 表达式


`&quot` 双引号 


`&amp` & 符号


`&lt` 小于号


`&gt` 大于号


## 重学 HTML ｜ HTML 标签语义


`main` 表示主体


`p` 段落


`nav` 导航栏


`aside` 侧边栏


`article` 文章 一般在主体内就是文章


`em` 是表示重音词汇，且加粗。


`strong` 是单纯的加粗并不改变语义结构。


`figure` 图片文字组合


`img` 图片


`figcaption` 文字


`hgruop` 配合 `h1-h6` 使用


`code` 配合 `pre` 使用


`dfn` 定义


`samp` 示例、样本


## 重学 HTML | HTML 语法

### 合法元素

- Element:`<tagname>...<tagename>`
- Text: `text`
- Commentt:`<!-- comments -->`
- DocumentType: `<!Docutype html>`
- ProcessingInstruction: `<?a 1?>`
- CDATA:`<![CDATA[]]>`


### 字符引用

- `&#161;`
- `&amp;`
- `&lt;`
- `&quot;`

## 浏览器API ｜ DOM API

![node](./node.png)

### 导航类操作

- parentNode  parentElement
- childNodes children
- firstChild firstElementChild
- lastChild lastElementChild
- nextSibling nextElementSibling
- previousSibling previusElemeneSibling

### 修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

### 高级操作

- compareDocumentPosition 是用于比较两个节点中关系的函数
- cintains 检查一个节点是否包含另一个节点的函数
- isEqualNode 检查两个节点是否完全相同
- isSameNode 检查两个节点是否是同一个节点，实际上在 javaScript 中可以使用 `===`
- cloneNode 复制一个节点，如果传入 true， 则会连同子元素做深拷贝。

## 浏览器 API ｜ 事件 API

addEventListener(type,listener,options|boolean)


- type:事件名
- listener:回调函数
- capture:是否捕获/冒泡 
- options:
    - capture:是否捕获/冒泡 
    - once:是否只响应一次
    - passive:是否存在副作用，默认是false，onScroll 设置为 true 会提高性能，如需要阻止默认行为则需设置为false。

### Event：冒泡与捕获

浏览器的事件冒泡捕获机制是一定会发生的于是否添加回调函数无关。


浏览器是一定会先发生捕获然后再进行冒泡


第三个参数 capture 默认情况下是在捕获阶段不执行，冒泡阶段执行。


如果 capture 为 true 则会在捕获阶段执行，然后再冒泡。

## 浏览器API ｜ Range API


### Range API

创建 Range 的方法
```js
// 1
var range = new Range()
range.setStart(element,9)
range.setEnd(element,4)
// 2
var range = document.getSelection().getRangeAt(0)
```
便捷方法
```js
range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter
range.selectNode
range.selectNodeContents
```
主要操作

```js
var fragment = range.extractContents() // 从 dom 树上把 range 选取的内容摘下来
range.insertNode(document.createTextNode('aaaa')) // 在 range 的位置插入一个新节点
```


```js
    function reverseChildren(element) {
        const range = new Range()
        range.selectNodeContents(element)
        const fragment = range.extractContents()
        const childNodes = fragment.childNodes
        let l = childNodes.length
        while (l-- > 0) {
            fragment.appendChild(childNodes[l])
        }
        element.appendChild(fragment)
    }
    reverseChildren(ul)
```

## 浏览器 API ｜ CSSOM

### document.styleSheets

- doument.styleSheets
- 案例


### Rules

- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p {color:pink}", 0)
- document.styleSheets[0].removeRule(0)

Rule

- CSSStyleRule
- CSSCharsetRule
- CSSImportRule
- CSSMediaRule
- CSSFontFaceRule
- CSSPageRule
- CSSKeyframesRule
- CSSKeyframeRule
- CSSSupportsRule
- ......

CSSStyleRule

- selectorText String
- style K-V 结构

getComputedStyle

- window.getComputedStyle(elt,pseudoElt);
    - elt 想要获取的元素
    - pseudoElt 可选，伪元素

## 浏览器 API ｜ CSSOM View

### window 

- window.innerHeight, window.innerWidth
- window.outerWith, window.outerHeight
- window.devicePixelRatio
- window.screen
    - window.screen.width
    - window.screen.height
    - window.screen.availWidth
    - window.screen.availHeight

### Window API

- window.open("about:blank","_blank","width=100,height=100,left=100,right=100")
- moveTo(x,y)
- moveBy(x,y)
- resizTo(x,y)
- resizBy(x,y)


### scroll

只在 有滚动条的情况下生效

- scrollTop
- scrollLeft
- scrollWidth
- scroll(x,y)
- scrollBy(x,y)
- scrollIntoView()

window
- scrollX
- scrollY
- scroll(x,y)
- scrollBy(x,y)

### layout

- getClientRects() 获取所有生成的盒
- getBoundingClientReact() 获取所有所有生成的盒包含的区域


