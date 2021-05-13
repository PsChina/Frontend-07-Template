let http = require('http')
let https = require('https')
let unzipper = require('unzipper')
let querystring = require('querystring')

// 2.auth 路由接收code， 用code+client_id+client_secret换token

function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
    console.log(query)
    getToken(query.code)
}

function getToken(code) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.c30a1b1545c2f598&client_secret=edb07aed2be8a090a4b1835e3bfc1b968759f0e9`,
        port: 443,
        method: 'POST'
    }, function (response) {
        console.log('response=>', response)
    })
    request.end()
}

// 4. publish 路由：用 token 获取用户信息，检查权限，接受发布

function publish(request, response) {

}
http.createServer(function (req, res) {
    if (req.url.match(/^\/auth\?/)) {
        return auth(req, res)
    }
    if (req.url.match(/^\/publish\?/)) {
        return publish(req, res)
    }
    //req.pipe(unzipper.Extract({ path: '../server/public/' }))
}).listen(8082)

console.log('listen 8082')