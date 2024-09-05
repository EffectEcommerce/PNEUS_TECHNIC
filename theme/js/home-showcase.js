document.addEventListener("DOMContentLoaded", function (event) {
    const swiper = new Swiper('.swiper-show', {
    slidesPerView: 2,
    slidesPerGroup:2,
    loop: true,

    // Navigation arrows
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
    el: '.swiper-scrollbar',
    },

    breakpoints: {
        720: {
          slidesPerView: 3,
          slidesPerGroup:3,
        },
        980: {
          slidesPerView: 4,
          slidesPerGroup:4,
        },
        1980: {
            slidesPerView: 5,
            slidesPerGroup:5,
        }
      }
  });
  const swiper2 = new Swiper('.swiper-show.rel-product', {
    slidesPerView: 2,
    slidesPerGroup: 2,
    loop: false,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination', 
    },

    // Navigation arrows
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
    el: '.swiper-scrollbar',
    },

    breakpoints: {
      720: {
        slidesPerView: 3,
        slidesPerGroup:3,
      },
      980: {
        slidesPerView: 4,
        slidesPerGroup:4,
      },
      1980: {
          slidesPerView: 5,
          slidesPerGroup:5,
      }
      }
  });
})