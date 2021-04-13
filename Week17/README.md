学习笔记

## 初始化构建工具 ｜ 初始化工具Yeoman （一）

一个产生脚手架的脚手架 `yeoman`


首先使用 `npm` 新建一个项目,然后在项目中安装 `yeoman`

```bash
npm i yeoman-genrator
```

1. 首先创建一个 `generators/app` 目录然后在 `app` 目录下新建一个 `index.js` 文件。

index.js
```js
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(arg, opts) {
        super(arg, opts)
        // this.option('babel')
    }
    method1() {
        this.log('method 1 just ran')
    }
    method2() {
        this.log('method 2 just ran')
    }
};
```

写好 index.js 以后讲 package.json 中的入口改为 generators/app/index.js


然后打开命令行 cd 到根目录


执行命令 `npm link`


link 完以后就可以用 yeoman 启动它了。 


注意:__package 的名字必须是generator开头的__


需要全局安装 yeoman `npm install -g yo`
```bash
yo toolchain
```