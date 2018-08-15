!function(){
    var view = document.querySelector('.swiper')
    var controller = {
        view: null,
        init: function(view){
            this.view = view
            new Swiper (this.view.querySelector('.swiper-container'), {
                loop: true,
                pagination: {el: '.swiper-pagination'},
                navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
            })
        }

    }
    controller.init.call(controller,view)
}.call()
