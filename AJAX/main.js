// myButton.addEventListener('click', (e)=>{
//     $.ajax({
//         url: '/xxx',
//         method: 'get'
//     }).then(
//         (responseText)=>{
//             console.log(responseText)
//             return responseText
//             //返回结果是对象，浏览器看到Content-Type: text/json，就把它自动转成对象
//         },
//         (request)=>{
//             console.log('error')
//             return '失败1'
//         }
//     ).then(
//         (responseText)=>{
//             console.log('上一次的处理结果responseText作为这里的参数')
//             return '成功2'
//         },
//         (request)=>{
//             console.log('error')
//             return '失败2'
//         }
//     )
// }, false)







window.jQuery = function(nodeOrSelector){
    let nodes = {}
    nodes.addClass = function(){}
    nodes.html = function(){}
    return nodes
}



/*************jquery实现ajax********** */

window.jQuery.ajax = function(options){
    // let url
    // if(arguments.length ===1 ){
    //     url = options.url
    // }else if(arguments.length === 2){
    //     url = arguments[0]
    //     options = arguments[1]
    // }
    // let method = options.method
    // let body = options.body
    // let successFn = options.successFn
    // let failFn = options.failFn
    // let headers = options.headers
    // ES6 析构赋值，名字一样就把值复制过去
    let {url, method, body, headers} = options


    // window.Promise = function(fn){
    //     // .......
    //     return {
    //         then: function(){}
    //     }
    // }

    return new Promise(function(resolve,reject){
        let request = new XMLHttpRequest()
        request.open(method, url)
        for(let key in headers){
            let value = headers[key]
            request.setRequestHeader(key, value)
        }
        request.onreadystatechange = function(){
            if(request.readyState === 4){
                if(request.status>=200 && request.status<300){
                    // successFn.call(undefined, request.responseText)
                    resolve.call(undefined, request.responseText)

                }
                else if(request.status>=400){
                    // failFn.call(undefined, request)
                    reject.call(undefined, request)
                }
            }
        }
        request.send(body)
    })
}

// window.$ = window.jQuery





myButton.addEventListener('click', (e)=>{
    // let obj = {
    //     url: '/xxx',
    //     method: 'get',
    //     successFn: ()=>{},
    //     failFn: ()=>{}

    // }
    // window.jQuery.ajax(obj)
    window.jQuery.ajax(
        // '/xxx',
        {
            url: '/xxx',
            method: 'get',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'zhang': '18'
            },
            body: 'a=1&b=2'
            // successFn: (x)=>{
            //     console.log(x)
            // },
            // failFn: ()=>{
            //     console.log('失败')
            // }
        }
    ).then(
        (text)=>{console.log(text)},
        (request)=>{console.log(request)}
    )
}, false)






/**************** 纯手写，非jquery实现 ************* */
{
// myButton.addEventListener('click', () => {  //点击执行AJAX
//     let request = new XMLHttpRequest()      //创建
//     request.open('GET', '/xxx')      
//     // request.setRequestHeader('age', '18')  
//     // request.setRequestHeader('Content-Type','x-www-form-urlencoded') 
    
//     request.onreadystatechange = ()=>{
//         if(request.readyState === 4){
//             // console.log(request.status) 
//             // console.log(request.statusText)
//             if(request.status >= 200 && request.status < 300){
//                 console.log('说明请求成功')
//                 // console.log(request.getAllResponseHeaders())
//                 // console.log(request.getResponseHeader('Content-Type'))
//                 // console.log('换行')
//                 let string = request.responseText
//                 // console.log(typeof string)
//                 // console.log(string)
//                 // console.log('换行')
//                 // 把符合 JSON 语法的字符串
//                 // 转换成 JS 对应的值
//                 let object = window.JSON.parse(string)
//                 // console.log(typeof object)
//                 console.log(object)
                
//             }else if(request.status >= 400){
//                 console.log('说明请求失败')
//             }
//         }
//     }
//     request.send('张治国今天感觉不错')
                            
// }, false)
}




/************** ajax跨域 ********* */
{
// youButton.addEventListener('click', ()=>{
//     let request = new XMLHttpRequest()      //创建
//     request.open('GET', 'http://192.168.0.102:8888/xxx')           
//     request.send()
//     request.onreadystatechange = ()=>{
//         if(request.readyState === 4){
//             let string = request.responseText
//             console.log('访问邢晓栋ajax数据成功') 
//             console.log(string)
            
//         }
//     }
// }, false)
}






// // 定义
// window.jQuery.aj = function(obj){  
//     obj.successFn.call(undefined,'你好吗？')

//     ( (x)=>{console.log(x)} ).call(undefined,'你好吗？')
// }

// //调用
// window.jQuery.aj(
//     {
//         successFn: (x)=>{console.log(x)}
//     }
// )
