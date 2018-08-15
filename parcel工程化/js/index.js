// import a from './a'
import b from './b'
import('./a').then(()=>{console.log('a.js加载成功')})
import '../css/style.scss'

b()

module.hot.dispose(function(){
    console.log('模块替换')
})
// module.hot.accept(function () {
//     console.log('资源更改了')    
// })
console.log('我是index.js')