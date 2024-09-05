document.addEventListener("DOMContentLoaded", () => {
    const useCarReguaTopo = window.swiperReguaTopo.swiperReguaPath;
    let swiperInstance = null; 

    if(useCarReguaTopo == '1'){
        function initializeSwiper() {
            const div_swiper = document.querySelector(".regua-container");
            if (!div_swiper) return;
            
            div_swiper.classList.add("swiper-container");
    
            const divs_slides = document.querySelectorAll(".regua-text");
            divs_slides.forEach(slide => {
                slide.classList.add("swiper-slide");
            });
    
            if (!swiperInstance) {
                swiperInstance = new Swiper(".swiper-container", {
                    loop: true,
                    speed: 500,
                    slidesPerView: 1,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            }
        }
    
        function destroySwiper() {
            if (swiperInstance) {
                swiperInstance.destroy(true, true); 
                swiperInstance = null;
    
                document.querySelectorAll(".swiper-container").forEach(container => {
                    container.classList.remove("swiper-container");
                });
                document.querySelectorAll(".swiper-slide").forEach(slide => {
                    slide.classList.remove("swiper-slide");
                });
            }
        }
    
        let timeoutId;
        function handleResize() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (window.innerWidth <= 999) {
                    initializeSwiper();
                } else {
                    destroySwiper();
                }
            }, 100);
        }
    
        handleResize();
        window.addEventListener('resize', handleResize);
    }
  
});
