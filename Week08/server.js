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
      .a{
        width:100px;
        height:100px;
        background-color:rgb(255,0,0);
        display:flex
      }  
      .b{
        width:200px;
        height:200px;
        background-color:rgb(0,255,0);
        display:flex;
      }
      .c{
        width:300px;
        height:300px;
        background-color:rgb(0,0,255);
        display:flex;
      }
</style>
</head>
<body>
        <div class="a">
            
        </div>
        <div class="b">

        </div>
        <div class="c">

        </div>
</body>
</html>
        `)
    })
}).listen(8088)

console.log('server started')