学习笔记

## 浏览器总论 ｜ 浏览器工作原理总论

### 浏览器渲染流程

输入 `url` ->  通过 `http` 协议 -> 得到 `html` -> 解析 `html` -> 得到 `dom` 树 -> `css` computing -> 带css 属性的 `dom` -> `layout` -> `dom with position` -> render -> `bitmap`

### 状态机 ｜ 有限状态机

#### 有限状态机

1. 每一个状态机都是一个机器 
    1. 在每一个机器里，我们可以做计算、存储、输出......
    1. 所有的这些机器接受的输入是一致的
    1. 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数(无副作用)
1. 每一个机器知道下一个状态
   1. 每个机器都有确定的下一个状态(Moore)
   1. 每个机器根据输入决定下一个状态(Mealy)

#### JS中的有限状态机(Mealy)


1. 每个函数表示一个状态
1. 函数的参数就是输入
1. 在函数中，可以自由地编写代码
1. 函数的返回值作为下一个状态

```js
function satte(input){
    // 
    return next
}

while(input){
    state = state(input)
}
```



### 使用有限状态机处理字符串

#### 状态机 ｜ 不使用状态机处理字符串（一）

在一个字符串中，找到`a`

```js
function findA(string){
    const {length} = string
    for(let i=0; i<length; i++){
        if(string.charAt(i) === 'a'){
            return i
        }
    }
    return -1
}

function match(string){
  for(let char of string){
    if(char === 'a'){
      reutrn true
    }
  }
  return false
}
```
#### 状态机 ｜ 不使用状态机处理字符串（二）

在一个字符串中找到字符串`ab`

```js
function findAB(string){
    const {length} = string
    for(let i = 0; i < length; i++){
        if(string.charAt(i) === 'a'){
            if(i < length - 1 && string.charAt(i+1) === 'b'){
                return i
            }
        } 
    }
    return -1
}

function match(string){
  let foundA = false
  for(let char of string){
    if(char === 'a'){
      foundA = true
    } else if(foundA && char === 'b'){
      return true
    } else {
      foundA = false
    }
  }
  return false
}
```

#### 状态机 ｜ 不使用状态机处理字符串（三）

在一个字符串中找到字符串`abcdef`


```js
function match(string){
    const { length } = string
  for(let i = 0; i < length; i++){
      if(string.charAt(i) === 'a'){
          if(i < length - 5 && string.charAt(i + 1) === 'b'
          &&
          string.charAt(i + 2) === 'c'
          &&
          string.charAt(i + 3) === 'd'
          &&
          string.charAt(i + 4) === 'e'
          &&
          string.charAt(i + 5) === 'f'
          ){
              return true
          }
      }
  }
  return false
}

function match2(string){
    let foundA = false,
        foundB = false,
        foundC = false,
        foundD = false,
        foundE = false
    for(let char of string){
        if(char === 'a'){
            foundA = true
        } else if (foundA && char === 'b'){
            foundB = true
        } else if (foundB && char === 'c'){
            foundC = true
        } else if(foundC&& char === 'd'){
            foundD = true
        } else if(foundD && char === 'e'){
            foundE = true
        } else if(foundE && char === 'f'){
            return true
        } else {
        foundA = foundB = foundC = foundD = foundE = false
        }
    }
  return false
}
```

#### 状态机 ｜ 使用状态机处理字符串（一）

```js
function match(string){
    let state = start
    for(let c of string){
        state = state(c)
    }
    return state === end
}

function start(c){
    if(c === 'a'){
        return foundA
    } else {
        return start
    }
}

function foundA(c){
    if(c === 'b'){
        return foundB
    } else {
        return start(c)
    }
}

function foundB(c){
    if(c === 'c'){
        return foundC
    } else {
        return start(c)
    }
}

function foundC(c){
    if(c === 'd'){
        return foundD
    } else {
        return start(c)
    }
}

function foundD(c){
    if(c === 'e'){
        return foundE
    } else {
        return start(c)
    }
}

function foundE(c){
    if(c === 'f'){
        return end
    } else {
        return start(c)
    }
}

function end(){
    return end
}

```

#### 状态机 ｜ 使用状态机处理字符串（二）


1. 使用状态机查找 `abcabx`

```js
function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA
    } else {
        return start
    }
}

function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start(c)
    }
}

function foundB(c) {
    if (c === 'c') {
        return foundC
    } else {
        return start(c)
    }
}

function foundC(c) {
    if (c === 'a') {
        return foundA2
    } else {
        return start(c)
    }
}

function foundA2(c) {
    if (c === 'b') {
        return foundB2
    } else {
        return start(c)
    }
}

function foundB2(c) {
    if (c === 'x') {
        return end
    } else {
        return foundB(c)
    }
}


function end() {
    return end
}
```


1. 使用状态机查找 `abababx`

```js
function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}

function start(c) {
    if (c === 'a') {
        return foundA1
    } else {
        return start
    }
}
function foundA1(c) {
    if (c === 'b') {
        return foundB1
    } else {
        return start(c)
    }
}
function foundB1(c) {
    if (c === 'a') {
        return foundA2
    } else {
        return start
    }
}

function foundA2(c) {
    if (c === 'b') {
        return foundB2
    } else {
        return start(c)
    }
}

function foundB2(c) {
    if (c === 'a') {
        return foundA3
    } else {
        return start
    }
}

function foundA3(c) {
    if (c === 'b') {
        return foundB3
    } else {
        return start(c)
    }
}

function foundB3(c) {
    if (c === 'x') {
        return end
    } else {
        return foundB2(c)
    }
}

function end() {
    return end
}
```

## HTTP请求 ｜ HTTP协议解析

### ISO-OSI七层网络模型

1. 应用层

1. 表示层

1. 会话层

1. 传输层

1. 网络层

1. 数据链路层

1. 物理层

------------

http 包括了 （应用、表示、会话）

TCP 是传输层

internet 网络层

4G/5G/wifi 包括了 （数据连句层、物理层）

###  TCP/IP 基础知识

流： 传输数据的概念是流，是一种没有明显分割单位的一种东西，例如水流、物流等。

端口： TCP 协议是被计算机里面的软件所使用的，每一个软件都会从网卡去拿数据，具体哪一个数据是分配给哪一个软件的呢，这个就需要用到端口这个概念，计算机是根据各个不同的端口将数据分给不同的软件的。

包： TCP 传输的是一个一个的数据包的概念， 每一个数据包的大小不是固定的，可大可小，这取决于网络中间设备的传输能力。

IP地址：ip 地址是明确了这个包应该从哪里到哪里，即通过ip地址找到对应的计算机。

libnet/libpcap： 

1. libnet 负责构造IP包并且发送。

1. labpcap 负责抓取所有流经网卡的IP包。如果用交换机而不是路由器组网，如果使用底层的labcap 的包我就能抓到本来就不属于发给我的包，实际上在正常的逻辑里，网卡会把这些包都给丢去，但是我用的如果是一个IP层这样的一个基础库，我就都能把它抓出来，这个是特殊的IP协议的处理需要用到的技术。

### HTTP

HTTP 是由一个 `Request` 和 一个 `Response` 组成的，对于TCP这种全双工通信协议，HTTP显得特别有意思，它只能由客户端发送一个 `Request` 和服务端返回一个 `Response` 来完成一次通信，所以每一个 `Request` 它一定对应着一个 `Response`， 如果 `Response` 多了或者是 `Request` 多了，那都说明协议出错。虽然他做了更加严格的规定但是在在实践中发现这种模式还不错，所以 `HTTP` 成为了互联网上最流行的传输协议。


## HTTP请求 ｜ 服务端环境准备

```js
const http = require('http')

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end('Hello world\n')
    })
}).listen(8080)

console.log('server started')
```

HTTP 协议是一个文本行协议，与二进制协议不同的是文本形的协议所有的内容都是字符串它的每一个字节都会被理解成字符串的一部分，比如说要传输一个1不会把这个1变成一个1的比特传过去，也不会把它放到一个字节里面传过去。而是会用一个字符1（Unicode 或者 ASCII 编码）

HTTP 协议 request 部分组成

POST /HTTP/1.1 （Request line）
Host:127.0.0.1 （Headers）
Content-Type:application/x-www-form-uilenconded （Headers）

field1=aaa&code=x%3D1 （Body, 格式由Content-Type 决定）

HTTP协议里面所有的换行都是由两个字符组成 `\r\n`

## HTTP请求 | 实现一个HTTP的请求

```js
const net = require('net');

class Request {
    constructor(options) {
        this.method = options.method || 'GET'
        this.host = options.host
        this.port = options.port || 80
        this.path = options.path || '/'
        this.body = options.body || {}
        this.headers = options.headers || {}
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }

        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body)
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map((key) => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        }

        this.headers['Content-Length'] = this.bodyText.length
    }
    send() {
        return new Promise((resolve, reject) => {
            // ...
        })
    }
}

void async function () {
    let request = new Request({
        method: 'POST', // HTTP 协议要求
        host: '127.0.0.1',// TCP 协议的要求
        port: '8888', // TCP 协议的要求
        path: '/', // HTTP 协议要求
        headers: { // HTTP 协议要求
            ['X-Foo2']: 'customed'
        },
        body: { // HTTP 协议要求
            name: 'Ps'
        }
    })
    let response = await request.send()

    console.log(request)
}();
```

HTTP 请求总结

1. 设计一个HTTP请求类
1. content type 是一个必要的字段
1. body 是 kv 格式
1. 不同的 content-type 影响 body 的格式

## HTTP请求 ｜ send 函数的编写了解 response 格式

send 函数总结

1. 在Request的构造函数中收集必要的信息
1. 设计一个 send 函数，把请求真实发送到服务器。
1. send 函数是异步的所以返回一个Promise

```

```

HTTP 协议 response 部分组成

HTTP/1.1 200 OK (state line)
Content-Type:text/html (headers)
Date:Mon,23 Dec 2019 06:46:19 MGT (headers)
connection:keep-alive (headers)
Transfer-Encoding:chunked (headers)

26
`<html><body>Hello World</body></html>`
0






