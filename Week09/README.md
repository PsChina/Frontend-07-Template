学习笔记

## HTML解析｜ HTML parse 模块的文件拆分

1. 为了方便管理，我们把 parser 单独拆到文件中。
1. parser 接受 HTML 文本作为参数，返回一颗 DOM 树。

## HTML解析 | 用 FSM 实现 HTML 的分析

```js
const EOF = Symbol("EOF")

function data(c) {
    
}

module.exports.parserHTML = function parserHTML(html) {
    let state = data
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF)
}
```

1. 我们用 FSM 来实现 HTML 的分析
1. 在 HTML 标准中，已经规定了 HTML 的状态
1. Toy-Browser 只挑选其中一部分状态，完成一个最简版本


## HTML 解析 ｜ 解析标签

1. 开始标签
1. 结束标签
1. 自封闭标签

```js
const EOF = Symbol("EOF")

let currentToken = {}

function data(c) {
    if (c == '<') {
        return tagOpen
    } else if (c == EOF) {
        return
    } else {
        return data
    }
}

function tagOpen(c) {
    if (c == '/') {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c)
    } else {
        return
    }
}
// \t 下一个tab \n 换行 \f 换页
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '/') {
        return selfClosingStartTag
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName
    } else if (c == '>') {
        return data
    } else {
        return tagName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '>') {
        return data
    } else if (c == '=') {
        return beforeAttributeName
    } else {
        return beforeAttributeName
    }
}

function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true
        return data
    } else if (c == 'EOF') {

    } else {

    }
}





module.exports.parserHTML = function parserHTML(html) {
    let state = data
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF)
}
```

1. 在这一步暂时忽略了属性

## HTML 解析 ｜ 创建元素

1. 在状态机中，出了状态迁移，我们还要加入业务逻辑
1. 我们在标签结束状态提交标签token

## HTML 解析 | 处理属性

1. 属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理

1. 处理属性和处理标签类似 

1. 当属性结束时，我们把属性加到标签 Token 上

## HTML 解析 ｜ 用 token 构建DOM树

总结：

1. 从标签构建 DOM 树的基本技巧是使用栈。
1. 遇到开始标签时创建元素并且入栈，遇到结束标签时出栈。
1. 自封闭节点可视为入栈后立即出栈。
1. 任何元素的父元素都是它入栈前的栈顶元素。

## HTML 解析 ｜ 将文本节点加到 DOM 树

1. 文本标签与自封闭标签类似
1. 多个文本节点需要合并

## CSS 计算 | 收集 CSS 规则 

### 环境准备

```bash
npm i css
```

1. 遇到 style 标签时， 我们把 css 规则保存起来 
1. 这里我们调用 css Parser 来分析 CSS 规则
1. 这里我们必须要仔细研究此库分析 CSS 规则的格式


## CSS 计算 ｜ 添加调用

1. 当我们创建一个元素后，立即计算CSS
1. 理论上，当我们分析一个元素时，所有CSS规则已经收集完毕
1. 在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算的情况，这里我们忽略

## CSS 计算 ｜ 获取父元素序列

1. 在 computeCSS 函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
1. 我们从上一步骤的 stack，可以获取本元素所有的父元素
1. 因为我们首先获取的是“当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外