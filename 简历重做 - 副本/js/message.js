window.Controller = function(options){
    var init = options.init
    {'databaseName': 'Message'})
    var controller = window.Controller({


        }
    var object = {
        view: null,
        model: null,
        init: function(view,model){
            this.view = view
            this.model = model
            this.model.init()
            bindEvents: function(){
                this.view.querySelector('.messageForm').addEventListener('submit', (e)=>{
                    e.preventDefault()
                    this.saveMessages()
                }, false)
            init: function(view,model){
                this.messageList = view.querySelector('.messageList')
                this.loadMessages()
            },
            loadMessages: function(){
                this.model.fetch().then(
                    (messagesAll)=>{
                        let obj = messagesAll.map((item)=>{return item.attributes})
                        obj.forEach((item) => {
                            let li = document.createElement('li')
                            li.innerText = `${item.name}: ${item.content}`
                            this.messageList.appendChild(li)
                        })
                    }
                )
            },
            
            },
            saveMessages: function(){
                let name = this.view.querySelector('input[name=name]').value
                let content = this.view.querySelector('input[name=content]').value
                this.model.save({'name':name,'content':content}).then(
                    (object)=>{
                        let li = document.createElement('li')
                        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                        let messageList = document.querySelector('ol.messageList')
                        messageList.appendChild(li)
                        this.view.querySelector('input[name=content]').value = ''
                    }
                )
        
        }
    }

    return object




    
!function(){
    var view = window.View('section.message')
    var model = window.Model(
    })
    controller.init(view,model)
    // controller.init.call(controller,view,model)
}.call()
