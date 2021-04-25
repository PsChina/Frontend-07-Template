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

## 单元测试工具 | code coverage

code coverage 代表我们的测试覆盖了源文件里面的哪些代码

nyc 工具

```bash
npm i nyc -D
```

运行命令

```bash
nyc ./node_modules/.bin/mocha
```

适用标准语法需要：

1. 添加 `.nycrc`
    .nycrc
    ```json
    {
        "extends":"@istanbuljs/nyc-config-babel"
    }
    ```

1. 下载 `@istanbuljs/nyc-config-babel` 依赖

    ```bash
        npm i @istanbuljs/nyc-config-babel -D
    ```

1. 在 `.babel` 里面加上 `plugin:["istanbul"]`

    ```bash
    npm i babel-plugin-istanbul -D
    ```


1. 把命令加在 `package.json` 命令行内

package.json
 ```json
{
  "scripts": {
    "coverage": "nyc mocha"
  }
}
 ```


写测试用例的时候运行 `npm run coverage`


进行单元格测试的时候运行 `npm run test`

## 单元格测试工具 ｜ 对 html-parser 进行单元格测试

```js
var assert = require('assert')
import { parserHTML } from '../src/parser.js'

describe('parse html:', function () {
    it('<a></a>', function () {
        let tree = parserHTML('<a></a>')
        assert.equal(tree.children[0].tagName, 'a')
        assert.equal(tree.children[0].children.length, 0)
    })
})
```

## 单元测试工具 ｜ 所有工具与 generator 的集成

将 mocha 集成到 generator



