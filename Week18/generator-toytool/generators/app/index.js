const Generator = require('yeoman-generator')

module.exports = class extends Generator {
    constructor(arg, opts) {
        super(arg, opts)
        // this.option('babel')
    }
    async initPackage() {
        let answer = await this.prompt({
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        })
        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "description": "",
            "main": "generators/app/index.js",
            "scripts": {
                "build": "webpack",
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha --require @babel/register"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {

            },
            "dependencies": {

            }
        }
        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson)
        this.npmInstall(["vue"], { 'save-dev': false })
        this.npmInstall(["webpack", 'vue-loader',
            'vue-style-loader',
            '@babel/core',
            '@istanbuljs/nyc-config-babel',
            'babel-plugin-istanbul',
            'mocha',
            'nyc', 'webpack-cli',
            'babel-loader',
            '@babel/preset-env',
            '@babel/register',
            'css-loader', 'vue-template-compiler',
            'copy-webpack-plugin'], { 'save-dev': true })



        this.fs.copyTpl(
            this.templatePath('HelloWorld.vue'),
            this.destinationPath('src/HelloWorld.vue')
        )
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js')
        )
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js')
        )
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            {
                title: answer.name
            }
        )
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc')
        )
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc')
        )
        this.fs.copyTpl(
            this.templatePath('sample-test.js'),
            this.destinationPath('test/sample-test.js')
        )
    }
};