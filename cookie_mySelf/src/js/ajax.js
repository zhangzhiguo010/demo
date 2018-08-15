window.ajax = function(object){
    let {method,path,body} = object
    body = JSON.stringify(body)
    return new Promise(function(resolve,reject){
        var XHR = new XMLHttpRequest()
        XHR.onreadystatechange = function(){
            if(XHR.readyState === 4){
                if(XHR.status>=200 && XHR.status<300 || XHR.status===304){
                    resolve(XHR.responseText)
                }else if(XHR.status>=400){
                    reject(XHR.responseText)
                }
            }
        }
        XHR.open(method,path)
        XHR.send(body)
    })
}