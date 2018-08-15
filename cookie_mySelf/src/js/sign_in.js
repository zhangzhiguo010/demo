// 注册模块
!function(){
    let view = document.querySelector('.wrapper>.sign_in')
    let controller = {
        view: null,
        need: null,
        needText: null,
        hash: null,
        verifyResult: null,
        init: function(view){
            this.view = view
            this.need = ['email','password','confirmPassword']
            this.needText = {'email':'邮箱','password':'密码','confirmPassword':'确认密码'}
            this.hash = {}
            this.verifyResult = true
            this.bindEvents()
        },
        bindEvents: function(){
            this.showFloatFrame()
            this.view.querySelector('form').addEventListener('submit', (e)=>{
                e.preventDefault()
                let verifyResult = true
                this.clearData()
                this.gatherData()
                this.verifyData(verifyResult)
                this.ajaxModule(verifyResult)
            }, false)
        },
        showFloatFrame: function(){
            let signButtons = document.querySelectorAll('.signButton>div')
            signButtons.forEach((item)=>{
                item.addEventListener('click', (e)=>{
                    let targetName = e.currentTarget.getAttribute('name')
                    document.querySelector(`.${targetName}`).classList.add('active')
                    document.querySelector('.welcome').classList.add('active')
                }, false)
            })
        },
        clearData: function(){
            this.verifyResult = true
            this.view.querySelectorAll('span[class=error]').forEach(function(value){
                value.innerHTML = ''
            })
        },
        gatherData: function(){
            this.need.forEach((value)=>{
                this.hash[value] = this.view.querySelector(`[name=${value}]`).value
            })
        },
        verifyData: function(){
            if(this.hash['email'].indexOf('@') === -1){
                this.view.querySelector(`[name=email]`).nextElementSibling.innerHTML = `邮箱格式不正确`
                this.view.querySelector(`[name=email]`).value = ''
                this.verifyResult = false

            }
            if(this.hash['password'] !== this.hash['confirmPassword']){
                this.view.querySelector('[name=confirmPassword]').nextElementSibling.innerHTML = '确认密码错误'
                this.verifyResult = false
                this.view.querySelector('[name=confirmPassword]').value = ''
            }
            this.need.forEach((value)=>{
                if(this.hash[value] === ''){
                    this.view.querySelector(`[name=${value}]`).nextElementSibling.innerHTML = `请输入${this.needText[value]}`
                    this.verifyResult = false
                }
            })
            return this.verifyResult
        },
        ajaxModule: function(){     //hash = {email: "xx@", password: "00", confirmPassword: "00"}
            if(this.verifyResult === true){
                window.ajax({method:'POST',path:'/sign_in',body:this.hash})
                    .then(
                        (response)=>{
                            if(response === 'success'){
                                console.log('注册成功')
                            }
                        },
                        (response)=>{
                            response = JSON.parse(response)
                            if(response.error.errorType === 'emailRepeat'){
                                this.view.querySelector(`[name=email]`).nextElementSibling.innerHTML = `邮箱已被注册`
                            }
                        }
                    )
            }else{
                console.log('验证失败')
            }
        }
    }
    controller.init.call(controller,view)
}.call()