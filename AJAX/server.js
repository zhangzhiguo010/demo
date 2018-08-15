var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
var parsedUrl = url.parse(request.url, true)
var pathWithQuery = request.url 
var queryString = ''
if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
var path = parsedUrl.pathname
var query = parsedUrl.query
var method = request.method

/******** 从这里开始看，上面不要看 ************/


if(path === '/'){
    let string = fs.readFileSync('./index.html', 'utf8')    //同步读取文件
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset-utf-8')
    response.write(string)
    response.end()
}else if(path === '/main.js'){
    let string = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset-utf-8')
    response.write(string)
    response.end()
}else if(path === '/xxx'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    // 同源策略   指定可以访问我服务器的网站
    // response.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.102')
    response.write(`
        {
            "note": {
                "to": "小谷",
                "form": "方方",
                "heading": "打招呼",
                "content": "hi"
            }
        }
    `)
    response.end()
}else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset-utf-8')
    response.write('上面都不符合')
    response.end()
}





/*********** XML格式 ************/
{
// <?xml version='1.0' encoding='UTF-8'>
// <note>
//     <to>Tove</to>
//     <form>Jani</form>
//     <heading>Reminder</heading>
//     <body>不要忘记这个周末！</body>
// </note>
}








/************* 简易完整服务器 ************** */
{
// if(path === '/'){
//   response.setHeader('Content-Type', 'text/html;charset=utf-8')
//   response.write(string)
//   response.end()
// }else if(path === '/style.css'){
//   var string = fs.readFileSync('./style.css', 'utf8')
//   response.setHeader('Content-Type', 'text/css')
//   response.write(string)
//   response.end()
// }else if(path === '/main.js'){
//   var string = fs.readFileSync('./main.js', 'utf8')
//   response.setHeader('Content-Type', 'application/javascript')
//   response.write(string)
//   response.end()
// }else{
//   response.statusCode = 404
//   response.setHeader('Content-Type', 'text/html;charset=utf-8')
//   response.write('找不到对应的路径，你需要字形修改 index.js')
//   response.end()
// }
}


/******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)