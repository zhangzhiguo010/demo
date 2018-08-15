// 把code写到content和style标签里
function writeCode(prefix,code,fn){    //异步任务+回调函数fn，不等结果就继续
    let domCode = document.querySelector('#content')
    domCode.innerHTML = prefix || ''
    let n = 0
    let timer = setInterval(()=>{
        n+=1
        domCode.innerHTML = Prism.highlight(prefix+code.substring(0,n), Prism.languages.css, 'css') //把你给我的code的前n个字符高亮，然后放到domcode里边
        styleTag.innerHTML = prefix+code.substring(0,n)    //把你给我的code的前n个字符放到style里边
        domCode.scrollTop = domCode.scrollHeight        //可拉的最大高度，与overflow：hidden搭配使用
        if(n>=code.length){  
            window.clearInterval(timer)
            fn.call()
        }
    },10)
}
{
var code = `/*
* 面试官你好，我是xxx
* 我将以动画的形式来介绍自己

* 只用文字介绍太单调了
* 我就用代码来介绍吧

* 首先准备一些样式
*/

*{
 transition: all 1s;
}
html{
 background: pink;
 font-size:16px;
}
#content{
    border: 1px solid red;
    padding: 16px;
}

/* 我需要一点代码高亮 */
.token.selector{
    color: #690;
}
.token.property{
    color: #905;
}
.token.function{
    color:#DD4A68
}

/* 加点3D效果*/
#content{
    transform: rotate(360deg);
}

/* 不玩了，我来介绍下自己吧 */
/* 我需要一张白纸 */
#content{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
}
#paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
#paper> .paper_content{
    background: white;
    width: 100%;
    height: 100%;
}
`
}
{
var code2 = `
#paper{}
/*
* 接下来把 Markdown 变成 HTML -----marked.js
*/
/*
* 接下来给HTML加样式
*/
/*
* 这就是我的会动的简历
* 谢谢观看
*/
`
}
{
var md = `
# 自我介绍

我叫张治国
1992年9月出生
中北大学毕业
自学前端
希望应聘前端开发岗位

#技能介绍

1. 熟悉JavaScript css
2. 熟悉Vue.js
3. 熟悉React.js
4. 熟悉Node.js

#项目介绍

1. xxx轮播
2. xxx简历
3. xxx画板

#联系方式

QQ 360737368
Email 360737368@qq.com
手机：15611563050
`
}
writeCode('',code,()=>{
    createPaper(()=>{
        writeCode(code,code2,()=>{
            writeMarkdown(md)
        })
    })
})

function createPaper(fn){     //同步任务+回调函数，从上到下逐步执行
    var paper = document.createElement('div')
    paper.id = 'paper'
    var paper_content = document.createElement('pre')
    paper_content.className = 'paper_content'
    paper.appendChild(paper_content)
    document.body.appendChild(paper)
    fn.call()
}

function writeMarkdown(markdown,fn){
    let domPaper = document.querySelector('#paper>.paper_content')
    let n = 0
    let timer = setInterval(()=>{
        n+=1
        domPaper.innerHTML = markdown.substring(0,n)
        domPaper.scrollTop = domPaper.scrollHeight        //可拉的最大高度，与overflow：hidden搭配使用
        if(n>=markdown.length){  
            window.clearInterval(timer)
            fn.call()
        }
    },10)

}




//如果是不做完就打1 ---- 异步
//如果是做完事就打1 ---- 同步

function 异步做事(){
    setTimeout(function(){
        console.log('异步做事')
    },1000)
}
function 同步做事(){
    console.log('同步做事')
}

异步做事()
console.log(1)
//异步做事()，一秒钟开始计时，先打印1，一秒计时结束再打印‘异步做事’
//由于异步做事，不等结果，所以会先执行1


同步做事()
console.log(1)
//同步做事()，先打印‘同步做事’，再打印1
//由于同步做事等结果，所以要等做完事，再打印1





