const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(arg, opts) {
        super(arg, opts)
        // this.option('babel')
    }
    async method0() {
        const a = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(100)
            }, 300)
        })
        this.log('a=>', a)
    }
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
        this.npmInstall()
    }
    async step1() {
        this.fs.copyTpl(
            this.templatePath('t.html'),
            this.destinationPath('public/index.html'),
            { title: 'Templating with Yeoman' }
        )
    }
    method2() {
        this.log('method 2 just ran')
    }
};