学习笔记

## 单元格测试工具 ｜ Mocha （一）

全局安装 `mocha`

```bash
npm install --global mocha
```


test.js
```js
var assert = require('assert')
var add = require('../add.js')

describe('add function testing', function () {
    it('1+2 shuld be 3', function () {
        assert.equal(add(1, 2), 3)
    })


    it('-5+2 shuld be -3', function () {
        assert.equal(add(-5, 2), -3)
    })
})

```

add.js
```js
function add(a, b) {
    return a + b
}

module.exports = add
```


## 单元格测试工具 ｜ Mocha （二）

单元格测试适用es6标准 `export`

```bash
npm install --save-dev @babel/core @babel/register
```
.babelrc
```json
{
    "presets":["@babel/preset-env"]
}
```

运行：

（需要本地安装 mocha npm i -D mocha）

```bash
./node_modules/.bin/mocha --require @babel/register
```

优化:

package.json
```json
{
  "scripts": {
    "test": "mocha --require @babel/register"
  }
}
```

