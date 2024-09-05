document.addEventListener("DOMContentLoaded", function (event) {
    
    if(window.count){
        const itens = window.count.countPath;
        var maxItens;

        if(itens > 6){
            maxItens = 6;
        }else{
            maxItens = itens
        }
    
        const swiperLoja = new Swiper('.container-loja-fisica .swiper-loja', {
            slidesPerView: 2,
            loop: false,
            
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            breakpoints: {
                720: {
                    slidesPerView: 3,
                },
                980: {
                    slidesPerView: 3,
                },
                1920: {
                    slidesPerView: 4,
                },
                1980: {
                    slidesPerView: maxItens,
                }
            }
        });
    }
    
});
