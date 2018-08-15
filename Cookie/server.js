var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
var md5 = require('md5')

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

let sessions = {}

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
    let html = fs.readFileSync('./index.html', 'utf8')
    let cookies
    let hash = {}
    if(request.headers.cookie){
        cookies = request.headers.cookie.split(';')     //以前：cookies: ['email=xx@xx', 'a=1', 'b=2']
                                                        //现在：cookies: ['sessionId = 16465','sessionId = 464646']
        // console.log(cookies)
        cookies.forEach((item)=>{
            let parts = item.split(':')    //['sessionId','464']  ['sessionId','464646']
            // console.log(parts)
            let key = parts[0]
            let value = parts[1]
            hash[key] = value       //hash = {'sessionId':'4646', 'sessionId':'5546'}
        })
    }
    
    // console.log(hash)
    // console.log(hash.sessionId)
    // console.log(sessions[hash.sessionId])
    // console.log(sessions[hash.sessionId].sign_in_email)
    let email
    if(sessions[hash.sessionId]){
        email = sessions[hash.sessionId].sign_in_email
    }
    let users = fs.readFileSync('./db/users','utf8')
    users = JSON.parse(users)       //此时users就是数组
    let foundUser
    for(let i=0;i<users.length;i++){
        if(users[i].email === email){
            foundUser = users[i]
            break
        }
    }
    if(foundUser){
        html = html.replace('$$$password$$$',foundUser.password)
    }else{
        html = html.replace('$$$password$$$','密码没找到')
    }

    response.statusCode = 200
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(html)
    response.end()
}else if(path === '/sign_up' && method === 'GET'){
    let htmlString = fs.readFileSync('./sign_up.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(htmlString)
    response.end()
}else if(path === '/sign_up' && method === 'POST'){
    readBody(request).then((body)=>{        //body: "email=xx&password=xx&password_confirmation=xx"
        let strings = body.split('&')     //['email=xx','password=xx','password_confirmation=xx']
        let hash = {}
        strings.forEach((string)=>{
            let parts = string.split('=')   //['email','xx']   ['password','xx']   ['password_confirmation','xx']
            let key = parts[0]
            let value = parts[1]
            hash[key] = decodeURIComponent(value)           //hash['email']='xx'   hash['password']='xx'   hash['password_confirmation']='xx'
                                        //hash{'email':'xx', 'password':'xx', 'password_confirmation':'xx'}
        })  
        // let email = hash['email']
        // let password = hansh['password']
        // let password_confirmation = hash['password_confirmation']
        let {email,password,password_confirmation} = hash
        if(email.indexOf('@') === -1){      //%40 需要decodeURIComponent解码
            response.statusCode = 400
            response.setHeader('Content-Type','application/json;charset=utf-8')
            response.write(`{
                "errors": {
                    "email": "invalid"
                }
            }`)
        }else if(password !== password_confirmation){
            response.statusCode = 400
            response.write('password not match')
        }else{
            let users = fs.readFileSync('./db/users','utf8')    //从数据库读数据，JSON格式
            users = JSON.parse(users)                           //JSON对象转成JavaScript对象
                                                                //数据库：[{'email:xx','password:xx'},{'email:yy','password:yy'},{'email:zz','password:zz'}]
                                                                //psrse完：应该是同上
            let inUse = false       //代表状态，成功或者不成功，默认为不成功，当某些条件下变成成功
            for(let i=0;i<users.length; i++){
                let user = users[i]
                if(user.email === email){
                    inUse = true
                    break;
                }
            }
            if(inUse){
                response.statusCode = 400
                response.write('email in use')
            }else{
                users.push({email: email, password: password})      //向JavaScript对象上添加内容
                var usersString = JSON.stringify(users)             //JavaScript对象转成JSON字符串，只能存字符串
                fs.writeFileSync('./db/users',usersString)          //把JSON对象写入数据库中
                response.statusCode = 200
            }
        }
        response.end()
    })
}else if(path === '/sign_in' && method === 'GET'){
    let string = fs.readFileSync('./sign_in.html','utf8')
    response.statusCode = 200
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(string)
    response.end()
}else if(path === '/sign_in' && method === 'POST'){
    readBody(request).then((body)=>{       
        let strings = body.split('&')    
        let hash = {}
        strings.forEach((string)=>{
            let parts = string.split('=')  
            let key = parts[0]
            let value = parts[1]
            hash[key] = decodeURIComponent(value)         
        })  
        let {email,password} = hash

        let users = fs.readFileSync('./db/users','utf8')
        users = JSON.parse(users)
        
        let found
        for(let i=0;i<users.length;i++){
            if(users[i].email === email && users[i].password === password ){
                found = true
                response.statusCode = 200
                break
            }
        }
        if(found){
            let sessionId = Math.random() * 100000
            sessions[sessionId] = {sign_in_email: email}    //sessions = {'01455': {sign_in_email: yyy}, '646461': {sign_in_email: kkk}}
            response.setHeader('Set-Cookie', `sessionId:${sessionId}`)   //cookie >>> sessionId: 01455     sessionId: 646461
            response.statusCode = 200
        }else{
            response.statusCode = 401
        }
        response.end()
    })
}else if(path === '/default.css'){
    let string = fs.readFileSync('./default.css','utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.setHeader('Cache-Control','max-age=30000000')      //十年
    // response.setHeader('Expires','Thu, 09 Aug 2018 08:05:29 GMT')
    response.write(string)
    response.end()
}else if(path === '/main.js'){
    let string = fs.readFileSync('./main.js','utf8')
    let fileMd5 = md5(string)
    response.setHeader('Etag',fileMd5)
    if(request.headers['if-none-match'] === fileMd5){
        response.statusCode = 304       //304代表没改过
    }else{
        response.statusCode = 200
        response.setHeader('Content-Type','text/javascript;charset=utf-8')
        // response.setHeader('Cache-Control','max-age=30000000')      //十年
        // response.setHeader('Expires','Thu, 09 Aug 2018 08:05:29 GMT')
        response.write(string)
    }
    response.end()

}else if(path === '/ajax'){
    response.statusCode = 200
    response.setHeader('Content-Type','text/json;charset=utf-8')
    response.write(`
        "person": {
            "name":"张治国",
            "age":"18岁",
            "love":"菠萝"
        }
    `)
    response.end()
}else{
    response.statusCode = 404
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(`
        'error': 'not found'
    `)
    response.end()
}



/******** 代码结束，下面不要看 ************/
})

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