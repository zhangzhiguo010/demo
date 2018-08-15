//controller思想：
//1、原来在干什么？ 答：创建一个包含各种属性和方法的对象，将对象赋值给controller
//2、原来的问题？答：每个js文件都要创建controller，创建controller的过程有很多重复再操作
//3、解决办法？答：将重复的代码（操作）放到一个公共区域中，如Controller.js文件中，其他js模块需要的时候调用就好了
//4、在公共文件中，创建一个全局函数，函数返回一个对象，这里的对象只写重复部分，其他部分通过调用时参入参数
//5、公共文件中，清空view和model，初始化init方法中，传入各个模块中的view和model对象，和以前一样
//6、把传入的各模块中的特有的部分执行初始化，传入obj作为那些函数体内的this，
//7、循环遍历依次，将特有的属性和方法
window.Controller = function(options){
    var init = options.init
    var object = {
        view: null,
        model: null,
        init: function(view,model){
            this.view = view
            this.model = model
            this.model.init()
            this.bindEvents.call(this)
            init.call(this,view,model)
            
        }
    }
    for(let key in options){
        if(key !== 'init'){
            object[key] = options[key]
        }
    }
    return object
}

