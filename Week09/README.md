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