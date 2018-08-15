var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
// 自己定义的
var md5 = require('md5')
var sessions = {}
var sessionId


if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
{
var parsedUrl = url.parse(request.url, true)
var pathWithQuery = request.url 
var queryString = ''
if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
var path = parsedUrl.pathname
var query = parsedUrl.query
var method = request.method
}



/******** 从这里开始看，上面不要看 ************/
if(path === '/'){
    let string = fs.readFileSync('./index.html','utf8')
    let users = fs.readFileSync('../db/users','utf8')
    let currentItem
    users = JSON.parse(users)
    // users: [{'sign_up_id':'xxx@', 'password':'xxx'}, {{'sign_up_id':'xxx@', 'password':'xxx'}}]
    // sessions: {123456:{'sign_up_id': xxx@}, 654321:{'sign_up_id': xxx@}}
    // 浏览器cooki： sessionId: 123456
    if(request.headers.cookie){
        console.log(request.headers.cookie)
        console.log(sessions)
        let part = request.headers.cookie.split(':')
        // part: ['sessionId', '123456']
        let xx = sessions[part[1]]
        console.log(xx)
        if(xx){
            users.forEach((item)=>{
                if(xx['sign_up_email'] === item['email']){
                    currentItem = item['password']
                }
            })
        }
    }

    string = string.replace('$$password$$',currentItem)
    response.statusCode = 200
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(string)
    response.end()
}else if(path === '/js.8f3cc7ce.css'){
    let string = fs.readFileSync('./js.8f3cc7ce.css')
    response.setHeader('Content-Type','text/css;charset=utf-8')
    // response.setHeader('Cache-Control','max-age=30000000')
    response.write(string)
    response.end()
}else if(path === '/js.8f3cc7ce.js'){
    let string = fs.readFileSync('./js.8f3cc7ce.js')
    response.statusCode = 200
    response.setHeader('Content-Type','text/javascript;charset=utf-8')

    let fileMd5 = md5(string)
    response.setHeader('ETag',fileMd5)
    if(request.headers['if-none-match'] !== fileMd5){
        response.statusCode = 200
        response.write(string)
    }else{
        response.statusCode = 304
    }

    response.end()
}else if(path === '/sign_in' && method === 'POST'){     //注册
    response.setHeader('Content-Type','application/json;charset=utf-8')
    readBody(request).then( 
        (body)=>{  
            body = JSON.parse(body)
            let {email,password} = body
            let users = fs.readFileSync('../db/users','utf8')
            users = JSON.parse(users)

            let result = false
            for(let i=0;i<users.length;i++){
                if(email === users[i].email){
                    result = true
                    break
                }
            }
            if(result){
                response.statusCode = 400
                response.write(`{
                    "error": {
                        "errorType": "emailRepeat"
                    }
                }`)
                response.end()
                
            }else{
                users.push({'email':email,'password':password})
                let usering = JSON.stringify(users)
                fs.writeFileSync('../db/users',usering)
                response.statusCode = 200
                response.write("success")
                response.end()
            }
        }     
    )
}else if(path === '/sign_up' && method === 'POST'){     //登录
    response.setHeader('Content-Type','application/json;charset=utf-8')
    readBody(request).then(
        (body)=>{
            body = JSON.parse(body)
            let {email, password} = body
            let users = fs.readFileSync('../db/users','utf8')
            users = JSON.parse(users)
            let result = true
            users.forEach((item)=>{
                if(email===item.email){
                    if(password===item.password){
                        result = false
                        response.statusCode = 200
                        sessionId = Math.random()*100000
                        sessions[sessionId] = {sign_up_email: email}
                        response.setHeader('Set-Cookie',`sessionId:${sessionId}`)
                        response.write("success")
                        response.end()
                    }else{
                        result = false
                        response.statusCode = 400
                        response.write(`{
                            "error": {
                                "errorType": "passwordError"
                            }
                        }`)
                        response.end()
                    }
                }
            }) 
            if(result){
                response.statusCode = 400
                response.write(`{
                    "error": {
                        "errorType": "emailUnregister"
                    }
                }`)
                response.end()
            }   
        }
    )
}else{
    response.statusCode = 400
    response.write('xxxxx')
    response.end()
}




/******** 代码结束，下面不要看 ************/
})

//输出json格式
//body:{"email":"zhangzhiguo010@outlook.com","password":"00","confirmPassword":"00"}
function readBody(request){
    return new Promise((resolve,reject)=>{
        let body = []       //请求体
        request.on('data',(chunk)=>{    //请求数据一段一段上传，我们就用body一段一段的收集，收集完之后转成字符串
            body.push(chunk)
        }).on('end',()=>{
            body = Buffer.concat(body).toString()
            resolve(body)
        })
    })
}
server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)