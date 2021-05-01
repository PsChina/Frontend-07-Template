学习笔记


## 实现一个线上服务器

`ssh root@47.107.154.169 -22`

`mkdir server`

`cd ./server`

`npx express-generator`

express

local bash
```bash
ssh root@47.107.154.169 -22
```

server bash
```bash
mkdir server

cd ./server

npx express-generator
```

删掉 `views`、`routes` 以及 `app.js` 里面与 `views`、`routes` 相关的代码。

在 `public` 里面新增 `index.html`


index.html

```html
<div>hello world</div>
```

部署命令 (local bash)

```bash
scp -P 22 -r ./* root@47.107.154.169:/root/server
```

运行
server bash

```bash
cd server/

npm start
```

### 编写简单的发送请求功能


publish-server

server.js
```js
let http = require('http')

http.createServer(function (req, res) {
    console.log(req)
    res.end("hello world")
}).listen(8082)
```

publish-tool

publish.js
```js
let http = require('http')

let request = http.request({
    hostname: '127.0.0.1',
    port: 8082
}, response => {
    console.log(response)
})

request.end()
```

