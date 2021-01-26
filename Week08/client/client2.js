const net = require('net');

class ResponseParser {
    constructor() {

    }
    receive(string) {
        for (let i = 0; i < string.length; i++) {
            this.receivechar(string.charAt(i))
        }
    }
    receivechar(char) {

    }
}

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
            const parser = new ResponseParser
            resolve('')
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