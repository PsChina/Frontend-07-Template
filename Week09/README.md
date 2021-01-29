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