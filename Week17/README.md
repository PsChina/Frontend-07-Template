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


## 初始化与构建 ｜ 初始化工具Yeoman（二）


1. `yeoman-generator` 支持异步方法 `async function` 里面可以写  `await`
1. `yeoman-generator` 文件模版系统：在 app 目录下新建 `templates` 文件夹
1. `yeoman-generator` 支持用户输入

```js
        const answers = await this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname
            },
            {
                type: 'confirm',
                name: 'cool',
                message: 'Would you like to enable the Cool feature?'
            }
        ])
        this.log('app name', answers.name)
        this.log('cool', answers.cool)
```
1. `yeoman-generator` 支持 package.json 的新建:

```js
    initPackage() {
        const pkgJson = {
            devDependencies: {
                eslint: '^3.15.0'
            },
            dependencies: {
                react: '^16.2.0'
            }
        }
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
    }
```

1. `yeoman-generator` 支持 npm 的安装:

```js
 this.npmInstall()
```

