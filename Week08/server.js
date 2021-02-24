const http = require('http')

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err) => {
        console.log(err);
    }).on('data', (chunk) => {
        body.push(chunk.toString())
    }).on('end', () => {
        //body = Buffer.concat(body).toString();
        console.log('body:', body);
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(`
<html name=a123 >
<head>
<style>
        #app {
            width:100px;
            height:100px;
            background-color:rgb(255,0,0);
        }
</style>
</head>
<body>
    <div id="app">
        hello world
    </div>
</body>
</html>
        `)
    })
}).listen(8088)

console.log('server started')