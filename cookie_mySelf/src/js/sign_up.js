// 登录模块
!function(){
    let view = document.querySelector('.wrapper>.sign_up')
    let controller = {
        view: null,
        need: null,
        needText: null,
        hash: null,
        verifyResult: null,
        init: function(view){
            this.view = view
            this.need = ['email','password']
            this.needText = {'email':'邮箱','password':'密码','confirmPassword':'确认密码'}
            this.hash = {}
            this.verifyResult = true
            this.bindEvents()
        },
        bindEvents: function(){
            this.showFloatFrame()
            this.view.querySelector('form').addEventListener('submit', (e)=>{
                e.preventDefault()
                this.clearData()
                this.gatherData()
                this.verifyData()
                this.ajaxModule()
            }, false)
        },
        showFloatFrame: function(){
            let signButtons = document.querySelectorAll('.signButton>div')
            signButtons.forEach((item)=>{
                item.addEventListener('click', (e)=>{
                    e.preventDefault()
                    let targetName = e.currentTarget.getAttribute('name')
                    document.querySelector(`.${targetName}`).classList.add('active')
                    document.querySelector('.welcome').classList.add('active')
                }, false)
            })
        },
        clearData: function(){
            this.verifyResult = true
            this.view.querySelectorAll('[class=error]').forEach((value)=>{
                value.innerHTML = ''
            })
        },
        gatherData: function(){
            this.need.forEach((value)=>{
                this.hash[value] = this.view.querySelector(`[id=${value}]`).value
            })
        },
        verifyData: function(){
            if(this.hash['email'].indexOf('@') === -1){
                this.view.querySelector('[id=email]').nextElementSibling.innerHTML = '邮箱格式不对'
                this.view.querySelector('[id=email]').value = ''
                this.verifyResult = false
            }
            this.need.forEach((value)=>{
                if(this.hash[value] === ''){
                    this.view.querySelector(`[id=${value}]`).nextElementSibling.innerHTML = `请输入${this.needText[value]}`
                    this.verifyResult = false
                }
            })
        },
        ajaxModule: function(){
            if(this.verifyResult){
                window.ajax({'method':'POST','path':'/sign_up','body':this.hash})
                    .then(
                        (response)=>{
                            if(response === 'success'){
                                console.log('登录成功')
                            }
                        },
                        (object)=>{
                            object = JSON.parse(object)
                            switch(object.error.errorType){
                                case 'passwordError':
                                this.view.querySelector('[id=password]').nextElementSibling.innerHTML = '密码错误'
                                    this.view.querySelector('[id=password]').value = ''
                                    break
                                case 'emailUnregister':
                                    this.view.querySelector('[id=email]').nextElementSibling.innerHTML = '邮箱未注册'
                                    break
                                default:
                                    break
                            }
                        }
                    )
            }
        }
    }
    controller.init.call(controller,view)
}.call()