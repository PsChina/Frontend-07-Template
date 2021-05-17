let http = require('http')
let https = require('https')
let unzipper = require('unzipper')
let querystring = require('querystring')

// 2.auth 路由接收code， 用code+client_id+client_secret换token

function auth(request, response) {
    let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1])
    getToken(query.code, function (info) {
        response.write(`<a href="http://localhost:8083/?token=${info.access_token}">publish</a>`)
        response.end()
    })
}

function getToken(code, callback) {
    let request = https.request({
        hostname: 'github.com',
        path: `/login/oauth/access_token?code=${code}&client_id=Iv1.c30a1b1545c2f598&client_secret=edb07aed2be8a090a4b1835e3bfc1b968759f0e9`,
        port: 443,
        method: 'POST'
    }, function (response) {
        let body = ''
        response.on('data', chunk => {
            body += (chunk.toString())
        })
        response.on('end', chunk => {
            let o = querystring.parse(body)
            callback(o)
        })
    })
    request.end()
}

// 4. publish 路由：用 token 获取用户信息，检查权限，接受发布

function publish(request, response) {
    let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1])
    if (query.token) {
        getUser(query.token, info => {
            // 对接内网身份验证系统
            if (info.login === 'PsChina') {
                request.pipe(unzipper.Extract({ path: '../server/public/' }))
                request.on('end', () => {
                    response.end('success!')
                })
            }
        })
    }

}

function getUser(token, callback) {
    let request = https.request({
        hostname: 'api.github.com',
        path: `/user`,
        port: 443,
        method: 'GET',
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "toy-publish-geek"
        }
    }, function (response) {
        let body = ''
        response.on('data', chunk => {
            body += (chunk.toString())
        })
        response.on('end', chunk => {
            callback(JSON.parse(body))
        })

    })
    request.end()
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