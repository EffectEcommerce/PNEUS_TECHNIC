(($) => {
    $.fn.changeElementType = function (newType) {
        var attrs = {};

        $.each(this[0].attributes, function (idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function () {
            return $('<' + newType + '/>', attrs).append($(this).contents());
        });
    };

    window.theme = {
        ...window.theme,

        settings: {
            lastScrollPosition: 0,
            storeId: 0,
            productThumbs: null,
            productGallery: null,
        },

        /* Beginning General Functions */
        openApplyOverlayClose: function () {
            const buttonClose = $('[data-toggle="close"]');
            const divOverlay = $('[data-overlay="shadow"]');
            const buttonToOpen = $('[data-toggle="closed"]');

            buttonToOpen.on('click', function () {
                let target = $($(this).data('target'));
                target.addClass('u-show').attr('data-toggle', 'open');

                divOverlay.addClass('u-show');
                $('body').addClass('overflowed');
            });

            divOverlay.on('click', function () {
                $('.video iframe').attr('src', '');
                const modal = $('[data-toggle="open"]');

                modal.removeClass('u-show').removeAttr('data-toggle');
                divOverlay.removeClass('u-show');
                $('body').removeClass('overflowed');
            });

            buttonClose.on('click', function () {
                divOverlay.trigger('click');
            });
        },

        scrollHidesMenu: function () {
            const header = $('[data-header="scroll"]');
            let headerHeight = $('[data-header="scroll"]').outerHeight() + 20;
            let position = $(window).scrollTop() - 20;

            if (position > this.settings.lastScrollPosition && position > headerHeight) {
                header.addClass('u-effectHeader');
                header.addClass('u-shadow');
            } else if (position > headerHeight && position < this.settings.lastScrollPosition) {
                header.removeClass('u-effectHeader');
                header.addClass('u-shadow');
            } else if (position < headerHeight) {
                header.removeClass('u-shadow');
            }

            this.settings.lastScrollPosition = position;
        },

        getScroll: function () {
            let internal = this;

            $(window).on('scroll', function () {
                internal.scrollHidesMenu();
            });
        },

        mainMenuMobile: function () {
            $('[data-toggle="account"]').on('click', function (event) {
                let item = $(this).parent();

                item.toggleClass('u-show');
                event.preventDefault();
            });
        },

        libMaskInit: function () {
            let phoneMaskBehavior = function (val) {
                return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
            };

            let phoneMaskOptions = {
                onKeyPress: function (val, e, field, options) {
                    field.mask(phoneMaskBehavior.apply({}, arguments), options);
                },
            };

            $('.mask-phone').mask(phoneMaskBehavior, phoneMaskOptions);
            $('.mask-cep').mask('00000-000');
        },
        /* --- End General Functions --- */

        bannerSlides: function () {
            const targetElement = '[data-slides="banner"]';
            if ($(targetElement).length) {
                const slideshow = $(targetElement);
                let size = $('.swiper-slide', slideshow).length;
                let settings = slideshow.data('settings');

                if (size > 0) {
                    new Swiper(`${targetElement} .swiper`, {
                        preloadImages: false,
                        loop: true,
                        autoHeight: true,
                        effect: 'slide',
                        autoplay: {
                            delay: settings.timer,
                            disableOnInteraction: false,
                        },
                        lazy: {
                            loadPrevNext: true,
                        },
                        pagination: {
                            el: `${targetElement} .swiper-pagination`,
                            bulletClass: 'icon-circle',
                            bulletActiveClass: 'icon-circle-empty',
                            clickable: !settings.isMobile,
                        },

                        navigation: {
                            prevEl: '.icon-arrow-left',
                            nextEl: '.icon-arrow-right',
                        },
                    });

                    if (settings.stopOnHover) {
                        $(`${targetElement} .swiper`).on('mouseenter', function () {
                            this.swiper.autoplay.stop();
                        });

                        $(`${targetElement} .swiper`).on('mouseleave', function () {
                            this.swiper.autoplay.start();
                        });
                    }
                }
            }
        },

        brandsSlides: function () {
            const targetElement = '[data-slides="brands"]';
            if (!$(targetElement).length) {
                $(`${targetElement} .brands-content`).remove();
            } else {
                new Swiper(`${targetElement} .swiper`, {
                    slidesPerView: 5,
                    lazy: {
                        loadPrevNext: true,
                    },
                    loop: false,
                    breakpoints: {
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        680: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        900: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1000: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    },
                    pagination: {
                        el: `${targetElement} .swiper-pagination`,
                        bulletClass: 'icon-circle',
                        bulletActiveClass: 'icon-circle-empty',
                        clickable: true,
                    },
                    on: {
                        init: function () {
                            $(targetElement).addClass('show');
                        },
                    },
                });
            }
        },

        customerReviewsSlidesOnHome: function () {
            const targetElement = '[data-slides="reviews"]';

            if (!$(targetElement).length) {
                $(`${targetElement} .dep_lista`).remove();
            } else {
                $('.dep_lista').changeElementType('div');
                $('.dep_item').changeElementType('div');

                $('.dep_item').addClass('swiper-slide');
                $(`${targetElement} .dep_lista`).addClass('swiper-wrapper').wrap('<div class="swiper"></div>');
                $(`${targetElement} .swiper`).append(`           
                    <div class="swiper-pagination"></div>
                `);

                const swiper = new Swiper(`${targetElement} .swiper`, {
                    slidesPerView: 3,
                    loop: false,
                    breakpoints: {
                        0: {
                            slidesPerView: 1,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                        1000: {
                            slidesPerView: 3,
                        },
                    },
                    pagination: {
                        el: `${targetElement} .swiper-pagination`,
                        bulletClass: 'icon-circle',
                        bulletActiveClass: 'icon-circle-empty',
                        clickable: false,
                    },
                    on: {
                        init: function () {
                            $(targetElement).addClass('show');
                        },
                    },
                });

                $(`${targetElement} .dep_dados`).wrap('<div class="review"></div>');
                $(`${targetElement} .dep_lista li:hidden`).remove();
            }
        },

        loadNewsPageOnHome: function () {
            if ($('.news').length) {
                let dataFiles = $('html').data('files');

                $.ajax({
                    url: `/loja/busca_noticias.php?loja=${this.settings.storeId}&${dataFiles}`,
                    method: 'get',
                    success: function (response) {
                        let target;
                        let pageNews;

                        if (!$(response).find('.noticias').length) {
                            $('.section.news').remove();
                            return;
                        }

                        target = $('.section.news .news-content');
                        pageNews = $($(response).find('.noticias'));

                        pageNews.find('li:nth-child(n+4)').remove();
                        pageNews.find('li').wrapInner('<div class="news-item"></div>');
                        pageNews = pageNews.contents();

                        // pageNews.each(function (index, pageNews) {
                        //     const removeImage = $(pageNews).find('img').closest('div').remove();
                        // });

                        target.append(pageNews);
                    },
                });
            }
        },
        /* Beginning Product Page */
        gallerySlidesOnProductPage: function () {
            
            const targetGallery = '[data-slides="gallery"]';
            const targetThumbs = '[data-slides="gallery-thumbs"]';
            if(document.querySelector(".gallery-thumbs")){
                theme.settings.productThumbs = new Swiper(targetThumbs, {
                    spaceBetween: 10,
                    lazy: {
                        loadPrevNext: true,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 2,
                        },
                        350: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 4,
                        },
                        1280: {
                            slidesPerView: 5,
                        },
                    },
                    freeMode: true,
                    watchSlidesProgress: true,
                });
            }
            theme.settings.productGallery = new Swiper(targetGallery, {
                spaceBetween: 10,
                lazy: {
                    loadPrevNext: true,
                },
                navigation: {
                    prevEl: '.slides-buttonPrev--gallery',
                    nextEl: '.slides-buttonNext--gallery',
                },
                thumbs: {
                    swiper: this.settings.productThumbs,
                },
            });
        },
        
        openProductVideoModal: function () {
            const video = $('[data-button="video"]');
            const modal = $('[data-modal="video"]');

            video.on('click', function () {
                modal.find('iframe').addClass('lazyload').attr('data-src', $(this).data('url'));
            });
        },

        getQuantityChangeOnProductPage: function () {
            const buttonQtd = $('[data-quantity]');
            let inputQtd = $('[data-buy-product="box"] #quantidade input#quant');

            //the quantity button will only be displayed if the single-click selling option is disabled and the product has no variations
            if (
                !$('[data-has-variations]')[0] ||
                ($('[data-buy-product="box"] div#quantidade label')[0] && !$('[data-has-variations]')[0])
            ) {
                $('[data-quantity]').addClass('u-show');
            }

            buttonQtd.on('click', function (event) {
                event.preventDefault();

                let valueQtd = parseInt(inputQtd.val());
                const operator = $(event.target).val();
                const number = parseInt(`${operator}1`);
                valueQtd += number;

                if (valueQtd < 1 || Number.isNaN(valueQtd)) {
                    inputQtd.val(1);
                } else {
                    inputQtd.val(valueQtd);
                }
            });
        },

        generateShippingToProduct: function () {
            const shippingForm = $('[data-shipping="form"]');
            const resultBox = $('[data-shipping="result"]');

            shippingForm.on('submit', function (event) {
                event.preventDefault();
                let variant = $('#form_comprar').find('input[type="hidden"][name="variacao"]');
                let url = $('#shippingSimulatorButton').data('url');
                let inputQtd = $('#quant:visible');
                let cep = $('input', this).val().split('-');

                if (inputQtd.is(':visible')) {
                    inputQtd = inputQtd.val();
                }

                if (variant.length && variant.val() === '') {
                    resultBox
                        .addClass('loaded')
                        .html(
                            `<p class="error-block">Por favor, selecione as varia&ccedil;&otilde;es antes de calcular o frete.</p>`
                        );
                    return;
                }

                variant = variant.val() || 0;

                url = url
                    .replace('cep1=%s', `cep1=${cep[0]}`)
                    .replace('cep2=%s', `cep2=${cep[1]}`)
                    .replace('acao=%s', `acao=${variant}`)
                    .replace('dade=%s', `dade=${inputQtd}`);

                resultBox.removeClass('loaded').addClass('loading');

                function insertShippingInTable(shippingResult) {
                    shippingResult.find('table:first-child, p, table tr td:first-child').remove();
                    shippingResult
                        .find('table, table th, table td')
                        .removeAttr('align class width border cellpadding cellspacing height colspan');

                    shippingResult.find('table').addClass('shipping-table');

                    var frete = shippingResult.find('table th:first-child').text();
                    if (frete == 'Forma de Envio:') {
                        shippingResult.find('table th:first-child').html('Frete');
                    }

                    var valor = shippingResult.find('table th:nth-child(2)').text();
                    if (valor == 'Valor:') {
                        shippingResult.find('table th:nth-child(2)').html('Valor');
                    }

                    var prazo = shippingResult.find('table th:last-child').text();
                    if (prazo == 'Prazo de Entrega e Observa&ccedil;&otilde;es:') {
                        shippingResult.find('table th:last-child').html('Prazo');
                    }
                    shippingResult = shippingResult.children();
                }

                const errorMessage =
                    'N&atilde;o foi poss&iacute;vel obter os pre&ccedil;os e prazos de entrega. Tente novamente mais tarte.';

                /* Validate zip code first using viacep web service */
                $.ajax({
                    url: `https://viacep.com.br/ws/${cep[0] + cep[1]}/json/`,
                    method: 'get',
                    dataType: 'json',
                    success: function (viacepResponse) {
                        if (viacepResponse.erro) {
                            const message = 'CEP inv&aacute;lido. Verifique e tente novamente.';
                            resultBox
                                .removeClass('loading')
                                .addClass('loaded')
                                .html(`<p class="error-block">${message}</p>`);

                            return;
                        }

                        $.ajax({
                            url: url,
                            method: 'get',
                            success: function (response) {
                                if (response.includes('N&atilde;o foi poss&iacute;vel estimar o valor do frete')) {
                                    resultBox
                                        .removeClass('loading')
                                        .addClass('loaded')
                                        .html(`<p class="error-block">${errorMessage}</p>`);

                                    return;
                                }

                                let shippingRates = $(response.replace(/Prazo de entrega: /gi, ''));
                                insertShippingInTable(shippingRates);

                                resultBox.removeClass('loading').addClass('loaded').html('').append(shippingRates);
                            },
                            error: function (request, status, error) {
                                console.error(`[Theme] Could not recover shipping rates. Error: ${error}`);

                                if (request.responseText !== '') {
                                    console.error(`[Theme] Error Details: ${request.responseText}`);
                                }

                                resultBox
                                    .removeClass('loading')
                                    .addClass('loaded')
                                    .html(`<p class="error-block">${errorMessage}</p>`);
                            },
                        });
                    },
                    error: function (request, status, error) {
                        console.error(`[Theme] Could not validate cep. Error: ${error}`);
                        console.error(`[Theme] Error Details: ${request.responseJSON}`);

                        resultBox
                            .removeClass('loading')
                            .addClass('loaded')
                            .html(`<p class="error-block">${errorMessage}</p>`);
                    },
                });

                return false;
            });
        },

        organizeProductPage: function () {
            const additionalFieldSelector = $('.varCont .dd .ddTitle');

            additionalFieldSelector.attr('tabindex', 0);
        },

        adjustOpenTabs: function (content, linksDesk, linksMobile) {
            const openContent = $('.tabs .tabs-content.active');

            if ($(window).width() < 768 && openContent.length > 0) {
                openContent.hide().removeClass('active');
                linksDesk.removeClass('active');
                linksMobile.removeClass('active');
                content.slideUp().removeClass('active');
            } else if ($(window).width() >= 768) {
                const firstLink = linksDesk.first();
                const target = firstLink.attr('href').split('#')[1];

                openContent.hide().removeClass('active');
                firstLink.addClass('active');
                linksMobile.removeClass('active');
                $(`#${target}`).show().addClass('active');
            }
        },

        goToProductReviews: function () {
            const ratingStars = $('.pageProduct .pageProduct-nameAndInformation .product-rating');
            const internal = this;

            ratingStars.on('click', function () {
                let target;
                let adjust;

                if ($(window).width() < 768) {
                    target = '.pageProduct-tabs .tabs .tabs-navMobile.tabs-linkComments';
                    adjust = 60;
                } else {
                    target = '.pageProduct-tabs .tabs-nav .nav-link.tabs-linkComments';
                    adjust = 120;
                }

                $(target).trigger('click');

                if (target && target !== '#') {
                    $('html,body').animate(
                        {
                            scrollTop: Math.round($(target).offset().top) - adjust,
                        },
                        600
                    );
                }
            });

            setTimeout(() => {
                $('#form-comments .submit-review').on('click', function (e) {
                    if (!$('#form-comments .stars .starn.icon-star').length) {
                        const textError = 'Avaliação do produto obrigatória, dê sua avaliação por favor';
                        $('#div_erro .blocoAlerta').text(textError).show();
                        setTimeout(() => {
                            $('#div_erro .blocoAlerta').hide();
                        }, 5000);
                    }
                });
            }, 3000);
        },

        chooseProductReview: function () {
            $('#form-comments .rateBlock .starn').on('click', function () {
                const message = $(this).data('message');
                const rating = $(this).data('id');

                $(this).parent().find('#rate').html(message);
                $(this).closest('form').find('#nota_comentario').val(rating);

                $(this).parent().find('.starn').removeClass('icon-star');

                $(this).prevAll().addClass('icon-star');

                $(this).addClass('icon-star');
            });
        },

        sendProductReview: function () {
            $('#form-comments').on('submit', function (event) {
                const form = $(this);

                $.ajax({
                    url: form.attr('action'),
                    method: 'post',
                    dataType: 'json',
                    data: form.serialize(),
                    success: function (response) {
                        form.closest('.tabs-content.comments').find('.blocoAlerta').hide();
                        form.closest('.tabs-content.comments').find('.blocoSucesso').show();

                        setTimeout(function () {
                            form.closest('.tabs-content.comments').find('.blocoSucesso').hide();
                            $('#form-comments #mensagem_coment').val('');

                            form.find('#nota_comentario').val('');
                            form.find('#rate').html('');

                            form.find('.starn').removeClass('icon-star');
                        }, 8000);
                    },
                    error: function (response) {
                        const error = JSON.stringify(response);

                        form.closest('.tabs-content.comments').find('.blocoSucesso').hide();
                        form.closest('.tabs-content.comments').find('.blocoAlerta').html(error).show();
                    },
                });

                event.preventDefault();
            });
        },

        reviewsOnProductPage: function () {
            let commentsBlock = $(`<div class="tabs-reviews">${window.commentsBlock}</div>`);
            const buttonReview =
                '<button type="submit" class="submit-review button2">Enviar Avalia&ccedil;&atilde;o</button>';
            const star = '<span class="icon-star" aria-hidden="true"></span>';
            const starEmpty = '<span class="icon-star-empty" aria-hidden="true"></span>';

            commentsBlock.find('.hreview-comentarios + .tray-hide').remove();

            $.ajax({
                url: '/mvc/store/greeting',
                method: 'get',
                dataType: 'json',
                success: function (response) {
                    if (!Array.isArray(response.data)) {
                        commentsBlock.find('#comentario_cliente form.tray-hide').removeClass('tray-hide');

                        commentsBlock.find('#form-comments #nome_coment').val(response.data.name);
                        commentsBlock.find('#form-comments #email_coment').val(response.data.email);

                        commentsBlock.find('#form-comments [name="ProductComment[customer_id]"]').val(response.data.id);
                    } else {
                        commentsBlock.find('#comentario_cliente a.tray-hide').removeClass('tray-hide');
                    }

                    $('#tray-comment-block').before(commentsBlock);

                    $('#form-comments #bt-submit-comments').before(buttonReview).remove();

                    $('.ranking .rating').each(function () {
                        let review = Number(
                            $(this)
                                .attr('class')
                                .replace(/[^0-9]/g, '')
                        );

                        for (i = 1; i <= 5; i++) {
                            if (i <= review) {
                                $(this).append(star);
                            } else {
                                $(this).append(starEmpty);
                            }
                        }
                    });

                    $('#tray-comment-block').remove();

                    theme.chooseProductReview();
                    theme.sendProductReview();
                },
            });
        },

        buyTogetherOnProductPage: function () {
            const boxImages = $('.compreJunto form .fotosCompreJunto');
            const image = $('.compreJunto .produto img');
            const qtd = $('.compreJunto .precoCompreJunto .unidades_preco .unidades_valor');
            const spansLinksRemove = $(
                '.compreJunto .precoCompreJunto div:first-child> span, .compreJunto .precoCompreJunto div:first-child> a, .compreJunto .precoCompreJunto div:first-child > br'
            );
            let listQtd = [];

            boxImages.append('<div class="plus color to">=</div>');

            qtd.each(function () {
                const value = $(this).text();
                listQtd.push(value);
            });

            spansLinksRemove.each((i, span) => span.remove());

            image.each(function (index) {
                let bigImgUrl = $(this).attr('src').replace('/90_', '/180_');
                const link = $(this).parent().attr('href') || '';
                const name = $(this).attr('alt');

                $(this).addClass('buyTogether-img lazyload').attr('src', '').attr('data-src', bigImgUrl);

                if (link !== '') {
                    $(this).unwrap();
                    $(this).parents('span').after(`<a class="buyTogether-nameProduct" href="${link}">${name}</a>`);
                } else {
                    $(this).parents('span').after(`<p class="buyTogether-nameProduct">${name}</p>`);
                }

                if (listQtd[index] == 1) {
                    $(this).after(`<p class="buyTogether-text">${listQtd[index]} unidade</p>`);
                } else {
                    $(this).after(`<p class="buyTogether-text">${listQtd[index]} unidades</p>`);
                }
            });
        },

        tabNavigationOnProductPage: function () {
            const internal = this;
            const customTab = $('tabs-navMobile[href*="AbaPersonalizada"]');
            const urlTabs = $('.pageProduct .tabs .tabs-content[data-url]');
            const linkNavTabs = $('.pageProduct .tabs-nav .nav-link');
            const linkNavMobileTabs = $('.pageProduct .tabs .tabs-navMobile');
            const content = $('.pageProduct .tabs .tabs-content');

            customTab.each(function () {
                let target = $(this).attr('href').split('#')[1];
                target = $(`#${target}`);

                $(target).detach().insertAfter(this);
            });

            urlTabs.each(function () {
                let tab = $(this);
                let url = tab.data('url');
                console.log("url =>", url)

                $.ajax({
                    url: url,
                    method: 'get',
                    success: function (response) {
                        tab.html(response);
                        $('#atualizaFormas li table').css('display', 'block');
                        openPaymentMethod();
                    },
                });
            });

            const openPaymentMethod = () => {
                $('#formasPagto #linkPagParcelado').remove();

                return $('#atualizaFormas li a').on('click', function () {
                    $(this).toggleClass('u-visible');
                });
            };

            linkNavTabs.on('click', function (event) {
                const tabs = $(this).closest('.pageProduct-tabs');

                if (!$(this).hasClass('active')) {
                    let target = $(this).attr('href').split('#')[1];
                    target = $(`#${target}`);

                    $(linkNavTabs, tabs).removeClass('active');
                    $(this).addClass('active');
                    $(content, tabs).fadeOut();

                    setTimeout(function () {
                        target.fadeIn();
                    }, 300);
                }

                event.preventDefault();
                event.stopPropagation();
                return false;
            });

            linkNavMobileTabs.on('click', function (event) {
                let target = $(this).attr('href').split('#')[1];
                target = $(`#${target}`);

                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    target.removeClass('active').slideUp();
                } else {
                    linkNavMobileTabs.removeClass('active');
                    content.removeClass('active').slideUp();

                    $(this).addClass('active');
                    target.addClass('active').slideDown();
                }

                event.preventDefault();
                event.stopPropagation();
                return false;
            });

            // internal.adjustOpenTabs(content, linkNavTabs, linkNavMobileTabs);

            // $(window).on('resize', function () {
            //     internal.adjustOpenTabs(content, linkNavTabs, linkNavMobileTabs);
            // });
        },

        recreateGalleryProductVariationImage: function (newVariationImages) {
            const allImages = $('[data-gallery="image"]');
            const boxImages = $('[data-gallery="box-images"]');
            const boxThumbs = $('[data-gallery="box-thumbs"]');
            const productName = $('.pageProduct .pageProduct-name').text();
            let htmlThumbs = ``;
            let htmlImages = ``;

            $.each(newVariationImages, function (index, item) {
                let slideIndex = index + 1;

                htmlImages += `
                    <div class="swiper-slide gallery-image" data-gallery="image">
                        <img class="gallery-img${slideIndex === 1 ? ' swiper-lazy' : ' lazyload'}" src="${
                    item.https
                }" alt="${productName}" width="1000px" height="1000px">
                    </div>
                `;

                htmlThumbs += `
                    <div class="swiper-slide gallery-thumb" data-gallery="image">
                        <img class="gallery-img${slideIndex === 1 ? ' swiper-lazy' : ' lazyload'}" src="${
                    item.thumbs[90].https
                }" alt="${productName}" width="90px" height="90px">
                    </div>
                `;
            });

            if (theme.settings.productThumbs) {
                theme.settings.productThumbs.destroy();
            }

            if (theme.settings.productGallery) {
                theme.settings.productGallery.destroy();
            }

            allImages.remove();
            boxImages.html(htmlImages);
            boxThumbs.html(htmlThumbs);

            theme.gallerySlidesOnProductPage();
        },

        loadProductVariantImage: function (id) {
            $.ajax({
                url: `/web_api/variants/${id}`,
                method: 'get',
                success: function (response) {
                    const newVariationImages = response.Variant.VariantImage;

                    if (newVariationImages.length) {
                        theme.recreateGalleryProductVariationImage(newVariationImages);
                    }
                },
                error: function (request, status, error) {
                    console.log(`[Theme] An error occurred while retrieving product variant image. Details: ${error}`);
                },
            });
        },

        initProductVariationImageChange: function () {
            const productVariationBox = $('.pageProduct-variants');
            const internal = this;

            productVariationBox.on('click', '.lista_cor_variacao li[data-id]', function () {
                internal.loadProductVariantImage($(this).data('id'));
            });

            productVariationBox.on('click', '.lista-radios-input', function () {
                internal.loadProductVariantImage($(this).find('input').val());
            });

            productVariationBox.on('change', 'select', function () {
                internal.loadProductVariantImage($(this).val());
            });
        },
        /* --- End Product Page Organization --- */
        /* Beginning Pages Tray Organization */
        processRteVideoAndTable: function () {
            $(`.col-panel .tablePage, 
               .page-extra .page-content table, 
               .page-extras .page-content table, 
               .board_htm table,
               .rte table,
               .page-noticia table
            `).wrap('<div class="table-overflow"></div>');

            $(`.page-noticia iframe[src*="youtube.com/embed"], 
               .page-noticia iframe[src*="player.vimeo"],
               .board_htm iframe[src*="youtube.com/embed"],
               .board_htm iframe[src*="player.vimeo"],
               .rte iframe[src*="youtube.com/embed"],
               .rte iframe[src*="player.vimeo"]
            `).wrap('<div class="rte-video-wrapper"></div>');
        },

        insertBreadcrumbNavigationInPage: function (local = '', customName = false) {
            let items;
            let breadcrumb = '';
            let pageName = document.title.split(' - ')[0].split(' | ')[0];

            if (local === 'listNews') {
                if (!window.location.href.includes('busca_noticias')) {
                    items = [
                        { text: 'Home', link: '/' },
                        { text: 'Not&iacute;cias', link: '/noticias' },
                    ];
                } else {
                    items = [
                        { text: 'Home', link: '/' },
                        { text: 'Not&iacute;cias', link: '/noticias' },
                        { text: 'Todas as Not&iacute;cias', link: '/busca_noticias' },
                    ];
                }
            } else if (local === 'news') {
                items = [
                    { text: 'Home', link: '/' },
                    { text: 'Not&iacute;cias', link: '/noticias' },
                    { text: pageName },
                ];
            } else if (local === 'wishlist') {
                items = [
                    { text: 'Home', link: '/' },
                    { text: 'Lista de Desejos', link: '/listas' },
                ];
            } else if (local != '' && customName === true) {
                items = [{ text: 'Home', link: '/' }, { text: local }];
            } else {
                items = [{ text: 'Home', link: '/' }, { text: pageName }];
            }

            $.each(items, function (index, item) {
                if (this.link) {
                    breadcrumb += `                       
                        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <a itemprop="item" class="breadcrumb-link" href="${item.link}">
                                <span itemprop="name">${item.text}</span>
                            </a>
                            <meta itemprop="position" content="${index + 1}" />
                        </li>   
                        `;
                } else {
                    breadcrumb += `
                        <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                            <span itemprop="name">${item.text}</span>
                            <meta itemprop="position" content="${index + 1}" />
                        </li>          
                    `;
                }
            });

            $('.default-content > .container').prepend(`
                <ol class="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
                    ${breadcrumb}
                </ol>
            `);
        },

        toggleShowReviewsForm: function () {
            $('[data-toggle="reviews"]').on('click', function (event) {
                let item = $(this).parent();

                item.toggleClass('u-show');
                event.preventDefault();
            });
        },

        validateFormFieldsToSendCustomerReview: function () {
            const formToSendReview = $('.page-depoimentos .container3 #depoimento');
            const buttonToSendReview = $('.page-depoimentos .container3 #depoimento .btn_submit');

            formToSendReview.validate({
                rules: {
                    nome_depoimento: {
                        required: true,
                    },
                    email_depoimento: {
                        required: true,
                        email: true,
                    },
                    msg_depoimento: {
                        required: true,
                    },
                    input_captcha: {
                        required: true,
                    },
                },
                messages: {
                    nome_depoimento: {
                        required: 'Por favor, informe seu nome completo',
                    },
                    email_depoimento: {
                        required: 'Por favor, informe seu e-mail',
                        email: 'Por favor, preencha com um e-mail v&aacute;lido',
                    },
                    msg_depoimento: {
                        required: 'Por favor, escreva uma mensagem no seu depoimento',
                    },
                    input_captcha: {
                        required: 'Por favor, preencha com o c&oacute;digo da imagem de verifica&ccedil;&atilde;o',
                    },
                },
                errorElement: 'span',
                errorClass: 'error-block',
            });

            buttonToSendReview.on('click', function () {
                const button = $(this);

                if (formToSendReview.valid()) {
                    button.html('Enviando...').attr('disabled', true);
                }
            });

            /* Create observer to detect Tray return */

            let target = $('#aviso_depoimento').get(0);
            let config = { attributes: true };

            let observerReviewMessage = new MutationObserver(function () {
                buttonToSendReview.html('Enviar Depoimento').removeAttr('disabled');
            });

            observerReviewMessage.observe(target, config);
        },

        organizeContactUsPage: function () {
            const textPageContact = $('.page-contact .default-content > .container');
            const buttonPageContact = $('.page-contact #btn_submit img.image');
            const inputTelPageContact = $('.page-contact #telefone_contato');
            const textEmailPageContact = $('.page-contact .email-texto');
            const textAtendimento = $('.board:nth-child(3)');
            const textHoraAtendimentp = $('.board:nth-child(4)');
            const tel01PageContact = $('.page-contact .contato-telefones .block:nth-child(1)');
            const tel02PageContact = $('.page-contact .contato-telefones .block:nth-child(2)');

            textPageContact.prepend(`
                <h1>Fale conosco</h1>
                <p class="contactUs-description">Precisa falar com a gente? Utilize uma das op&ccedil;&otilde;es abaixo para entrar em contato conosco.</p>
            `);
            buttonPageContact.parent().text('Enviar Mensagem').addClass('button2').children().remove();
            inputTelPageContact.removeAttr('onkeypress maxlength').addClass('mask-phone');
            textEmailPageContact.parent().wrap('<div class="contactUs-email"></div>');
            textAtendimento.addClass('contactUs-email');
            textAtendimento.addClass('atendimento');
            textHoraAtendimentp.addClass('contactUs-email');
            textHoraAtendimentp.addClass('horario');

            if (tel01PageContact.length) {
                let phoneNumberFormatted = tel01PageContact.text();
                let phoneNumber = phoneNumberFormatted.replace(/\D/g, '');

                tel01PageContact.unwrap().parent().addClass('contactUs-phone')
                    .html(`<h3>Central de Atendimento ao Cliente</h3>
                    <a href="tel:${phoneNumber}" title="Ligue para n&oacute;s">${phoneNumberFormatted}</a>`);
            }

            if (tel02PageContact.length) {
                let phoneNumberFormatted = tel02PageContact.text();
                let phoneNumber = phoneNumberFormatted.replace(/\D/g, '');

                tel02PageContact
                    .wrap('<div class="contactUs-whats"></div>')
                    .parent()
                    .insertAfter('.page-contact .contactUs-phone').html(`<h3>WhatsApp</h3>
                        <a target="_blank" rel="noopener noreferrer" href="https://api.whatsapp.com/send?l=pt&phone=55${phoneNumber}" title="Fale conosco no WhatsApp">${phoneNumberFormatted}</a>`);
            }
        },

        validateFormFieldsToSendContactEmail: function () {
            const formToSendContact = $('.page-contact .container2 .formulario-contato');
            const buttonToSendContact = $('.page-contact .container2 .formulario-contato .btn_submit');

            formToSendContact.validate({
                rules: {
                    nome_contato: {
                        required: true,
                    },
                    email_contato: {
                        required: true,
                        email: true,
                    },
                    mensagem_contato: {
                        required: true,
                    },
                },
                messages: {
                    nome_contato: {
                        required: 'Por favor, informe seu nome completo',
                    },
                    email_contato: {
                        required: 'Por favor, informe seu e-mail',
                        email: 'Por favor, preencha com um e-mail v&aacute;lido',
                    },
                    mensagem_contato: {
                        required: 'Por favor, escreva uma mensagem para entrar em contato',
                    },
                },
                errorElement: 'span',
                errorClass: 'error-block',
            });
            buttonToSendContact.on('click', function () {
                const button = $(this);

                if (formToSendContact.valid()) {
                    button.html('Enviando...').attr('disabled', true);
                }
            });
        },

        organizeNewsletterRegistrationPage: function () {
            if ($('.page-newsletter .formulario-newsletter').length) {
                $(
                    '.page-newsletter .formulario-newsletter .box-captcha input, .page-newsletter .formulario-newsletter .box-captcha-newsletter input'
                )
                    .attr('placeholder', 'Digite o c&oacute;digo ao lado')
                    .trigger('focus');
                $('.formulario-newsletter .newsletterBTimg').html('Enviar').removeClass().addClass('button2');
            } else {
                $('.page-newsletter .default-content').addClass('success-message-newsletter');
                $('.page-newsletter .default-content.success-message-newsletter .board p:first-child a')
                    .addClass('button2')
                    .html('Voltar para p&aacute;gina inicial');
            }

            setTimeout(function () {
                $('.page-newsletter .default-content').addClass('u-show');
            }, 200);
        },

        organizeNewsPage: function () {
            const titleButtonPage = $('.page-busca_noticias #listagemCategorias b');
            if (!window.location.href.includes('busca_noticias')) {
                titleButtonPage.replaceWith('<h1>Not&iacute;cias</h1>');
            }
        },

        organizePagesTray: function () {
            const login = $('.caixa-cadastro #email_cadastro');
            const buttonReviewPage = $('.page-depoimentos .container .btn_submit');
            const titleReviewPage = $('.page-depoimentos .container #comentario_cliente');
            const buttonAdvancedSearch = $('.page-search #Vitrine input[type="image"]');

            login.attr('placeholder', 'Digite seu e-mail*');
            buttonReviewPage.html('Enviar Depoimento').addClass('button2 review-button');
            titleReviewPage.prepend(
                '<button class="review-form" data-toggle="reviews">Deixei seu depoimento sobre nós <span class="icon-arrow-simple" aria-hidden="true"></span></button>'
            );
            buttonAdvancedSearch.after('<button type="submit" class="button2">BUSCAR</button>');
            buttonAdvancedSearch.remove();
        },

        /* --- End Pages Tray Organization --- */

        /* To Action in ajax.html */
        updateCartTotal: function () {
            $('[data-cart="amount"]').text($('.cart-preview-item').length);
        },
    };

    // Execution of Functions
    $(() => {
        const lazyLoadImages = new LazyLoad({
            elements_selector: '.lazyload',
        });

        theme.organizePagesTray();
        theme.getScroll();

        setTimeout(() => {
            theme.processRteVideoAndTable();
            theme.openApplyOverlayClose();
            theme.scrollHidesMenu();
            theme.mainMenuMobile();
            theme.libMaskInit();
        }, 20);

        if ($('html').hasClass('page-home')) {
            setTimeout(function () {
                theme.bannerSlides();
                theme.loadNewsPageOnHome();
            }, 40);
            theme.customerReviewsSlidesOnHome();
            theme.brandsSlides();
        } else if ($('html').hasClass('page-product')) {
            theme.gallerySlidesOnProductPage();
            theme.openProductVideoModal();
            theme.getQuantityChangeOnProductPage();
            theme.initProductVariationImageChange();
            theme.generateShippingToProduct();
            theme.goToProductReviews();
            theme.reviewsOnProductPage();
            theme.tabNavigationOnProductPage();
            theme.buyTogetherOnProductPage();
            setTimeout(() => {
                theme.organizeProductPage();
            }, 20);
        } else if ($('html').hasClass('page-contact')) {
            theme.organizeContactUsPage();
            theme.validateFormFieldsToSendContactEmail();
        } else if ($('html').hasClass('page-newsletter')) {
            theme.organizeNewsletterRegistrationPage();
        } else if ($('html').hasClass('page-depoimentos')) {
            theme.toggleShowReviewsForm();
            theme.validateFormFieldsToSendCustomerReview();
        } else if ($('html').hasClass('page-busca_noticias')) {
            theme.organizeNewsPage();
            theme.insertBreadcrumbNavigationInPage('listNews');
        } else if ($('html').hasClass('page-noticia')) {
            theme.insertBreadcrumbNavigationInPage('news');
        } else if ($('html').hasClass('page-company')) {
            theme.insertBreadcrumbNavigationInPage('Sobre nós', true);
        } else if (
            $('html').hasClass('page-listas_index') ||
            $('html').hasClass('page-listas_evento') ||
            $('html').hasClass('page-listas_criar')
        ) {
            theme.insertBreadcrumbNavigationInPage('wishlist');
        } else if ($('html').hasClass('page-extra')) {
            theme.insertBreadcrumbNavigationInPage('Sistema de Afiliados', true);
        }
    });
})(jQuery);

//Header adaptativo

function updateHeaderPadding() {
    const header = document.querySelector('.header-var-js');

    if (header) {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--v_height_header_total', `${headerHeight}px`);
       
    }
}

document.addEventListener('DOMContentLoaded', updateHeaderPadding);

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateHeaderPadding();
    }, 250); 
});


// Código de carregamento da vitrine-shorts
function lazyLoadShorts() {
    // Verifica se rolou para além da primeira dobra da página
    if (window.scrollY > window.innerHeight) {
        var iframesShort = document.querySelectorAll('iframe[data-src]');
        iframesShort.forEach(function(iframe) {
            if (iframe.dataset.src) { // Verifica se o iframe tem um data-src para carregar
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src'); // Remove o atributo data-src
                iframe.setAttribute('allowfullscreen', true);
            }
        });
    }
}

// Adiciona o evento de rolagem à janela para verificar continuamente enquanto o usuário rola
window.addEventListener('scroll', lazyLoadShorts);

// Adiciona o evento de resize, útil se a altura da viewport mudar (por exemplo, mudança de orientação em dispositivos móveis)
window.addEventListener('resize', lazyLoadShorts);

// Inicia uma verificação quando o documento é carregado, útil se a página for recarregada com a rolagem já além da primeira dobra
document.addEventListener('DOMContentLoaded', lazyLoadShorts);

const swiperShorts = new Swiper('.swiper-shorts', {
    // Opções do Swiper
    loop: true,
    slidesPerView: 5, // Padrão para telas grandes
    spaceBetween: 12,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next.shorts',
        prevEl: '.swiper-button-prev.shorts',
    },
    breakpoints: {
        1030: {
            slidesPerView: 5,
            spaceBetween: 16,
        },
        770: {
            slidesPerView: 3,
            spaceBetween: 16,
        },
        600: {
            slidesPerView: 2,
            spaceBetween: 16,
        },
        530: {
            slidesPerView: 1.75,
            spaceBetween: 16,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 16,
        },
    }
});

//Temporizador de promoção
document.addEventListener('DOMContentLoaded', function() {
    const promoTimers = document.querySelectorAll('.temporizador-promo');

    if (promoTimers){
        promoTimers.forEach((promoTimer) => {
            const endTime = new Date(promoTimer.getAttribute('data-end-time'));
            const daysElement = promoTimer.querySelector('.days');
            const hoursElement = promoTimer.querySelector('.hours');
            const minutesElement = promoTimer.querySelector('.minutes');
            const secondsElement = promoTimer.querySelector('.seconds');
    
            const interval = setInterval(() => {
                const now = new Date();
                const remainingTime = endTime - now;
    
                if (remainingTime <= 0) {
                    clearInterval(interval);
                    promoTimer.innerHTML = 'Promoção encerrada!';
                } else {
                    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
                    if (daysElement) daysElement.innerHTML = days + " dias";
                    if (hoursElement) hoursElement.innerHTML = hours + " h";
                    if (minutesElement) minutesElement.innerHTML = minutes + " m";
                    if (secondsElement) secondsElement.innerHTML = seconds + " s";
                }
            }, 1000);
        });
    }
});

//Lazyload video home

document.addEventListener('DOMContentLoaded', function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                var iframe = entry.target;
                iframe.src = iframe.getAttribute('data-src');
                observer.unobserve(iframe);
            }
        });
    }, { threshold: 0.5 });

    var lazyVideo = document.querySelector('.youtube-video');
    if (lazyVideo) {
        observer.observe(lazyVideo);
    }
});
var tema = {
    productVariant: function(){
        this.tabs();

        jQuery('.compreJunto form .fotosCompreJunto').append('<div class="plus color to">=</div>');

        jQuery('.box-variants').on('click','.lista_cor_variacao li[data-id]', function(){
            var url = "/web_api/variants/" + jQuery(this).data('id');
            console.log("-------------- aqui")
            theme.variantImage(url);
        });

        jQuery('.box-variants').on('click','.lista-radios-input', function(){
            var url = "/web_api/variants/" + jQuery(this).find('input').val();
            theme.variantImage(url);
        });

        jQuery('.box-variants').on('change', 'select', function(){
            var url = "/web_api/variants/" + jQuery(this).val();
            theme.variantImage(url);
        });

        jQuery('.produto img').each(function(){
            jQuery(this).attr('src', jQuery(this).attr('src').replace('/90_', '/'));
            
            var href = '';
            if(jQuery(this).parent().attr('href') !== ''){
                href = 'href="'+jQuery(this).parent().attr('href') + '"';
            } 
            
            jQuery(this).parents('span').after('<a '+href+' class="product-name">'+jQuery(this).attr('alt')+'</a>');
        });

        jQuery('.page-product').on('click','#detalhes_formas',function(){
            var productId = jQuery('#form_comprar').data('id');
            var price = jQuery('#preco_atual').val();

            var link = '/mvc/store/product/payment_options_details?loja='+theme.storeId()+'&IdProd='+productId+'&preco='+price;
            jQuery('.payment-modal').addClass('active');

            jQuery('.payment-modal .append').html('<div class="load-css"><div class="icon"></div></div>');

            theme.getAjax('get',link,{},function(response){
                jQuery('.payment-modal .append').html(response).find('.tablePage').wrap('<div class="overflow-payment"></div>');
            });
        });

        jQuery('#form_comprar').on('submit', function(){

            if (!jQuery('.labelMultiVariacao').length) {

                if(jQuery('#selectedVariant').length && !jQuery('#selectedVariant').val()){
                    jQuery("#span_erro_carrinho").css("display","block");
                    return false;
                }
            }

            jQuery('#loading-product-container').show();    
            
            jQuery('body').removeClass('modal-open').removeAttr('style');
            jQuery('body').find('.modal-backdrop').remove();
            var interval = setInterval(function(){
                jQuery('body').find('.modal-backdrop').remove();
                if(jQuery('.cart-preview-loading-modal').hasClass('tray-hide')){
                    cart.showCart();
                    jQuery('#loading-product-container').hide();
                    jQuery('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                    clearInterval(interval);
                }
            },50);                
        });

        jQuery('#button-buy').on('click', function(){

            if(jQuery('#selectedVariant').length && !jQuery('#selectedVariant').val() && !jQuery('.labelMultiVariacao').length){
                jQuery("#span_erro_carrinho").css("display","block");
                return false;                
            }

        });

        jQuery('.compreJunto').on('submit', function() {

            var form = jQuery(this);

            if(!form.find('.blocoAlerta').is(':visible')){
                jQuery('#loading-product-comprejunto').show();
                jQuery('body').removeClass('modal-open').removeAttr('style');
                jQuery('body').find('.modal-backdrop').remove();

                var interval = setInterval(function(){
                    if(jQuery('.cart-preview-loading-modal').hasClass('tray-hide')){
                        cart.showCart();
                        jQuery('#loading-product-comprejunto').hide();
                        jQuery('body').find('.botao-continuar-comprando .botao-commerce-img').trigger('click');
                        clearInterval(interval);
                    }
                },50);        
            }        
        });

        jQuery('.productAdditionalInformation').parent().on('change', 'select option[rel]', function(){
           
            var url = jQuery(this).find('option[value="'+jQuery(this).val()+'"]').attr('rel');
            if(url) {
                var images = [{"https": url, "thumbs": {'90' : {'https': url }} }];
                if(images.length){
                    theme.variantImage(url);
                    //theme.removeZoom(images);
                }
            }
        });
        
    },
    storeId: function(){
        return jQuery('html').attr('data-store');
    },
}

// Carrinho
var cart = {
    customerId: null,
    loadCustomerId: function(){
        if(!cart.customerId){
            const customerInfo = dataLayer.find(element => ('customerId' in element));
            cart.customerId = customerInfo ? customerInfo.customerId : null;  
            console.log('cart.customerId',cart.customerId);  
        }        
    },
    session: function () {
        return jQuery("html").attr("data-session");
    },
    idStore: function(){
        return jQuery("html").attr("data-store");
    },
    removeProduct: function (element){
        var id = parseInt(jQuery(element).attr('data-id'));
        var variant = '/'+jQuery(element).attr('data-variant');
        var addText = jQuery(element).attr('data-add') == "" ? '' : "/?additional_information=" + jQuery(element).attr('data-add').replace(/br>/g, 'br/>');
        var together = jQuery(element).attr('data-together') !== '' ? '/'+jQuery(element).attr('data-together') : ''; 

        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session() + "/" + id + variant + together + addText,
            success: function (response) {
                cart.listProduct();
            },
            error : function (error) {
                cart.listProduct();
            }
        });
    },
    listProduct: function(){
        jQuery.ajax({
            method: 'GET',
            url: '/checkout/cart/api?session_id='+cart.session()+'&store_id='+cart.idStore()+'&nocache=0.'+new Date().getTime(),
            success: function(r) {
                var forList = r.data.cart.products;
                var addList = [];
                var totalQuantity = 0;

                forList.forEach(function(list){
                    addList.push({
                        "Cart": {
                            "email": "",
                            "variants_kit": list.variants_kit || "",
                            "additional_info_kit": list.additional_info_kit || "",
                            "price_itens_kit": list.price_itens_kit || "",
                            "product_id": list.id,
                            "product_name": list.name,
                            "quantity": list.quantity,
                            "price": list.price,
                            "variant_id": list.variant_id || "0",
                            "additional_information": list.additional_information,
                            "product_url": list.url,
                            "bought_together_id": list.bought_together_id || "",
                            "product_image": list.images // alter images template
                        }
                    })

                    totalQuantity += parseInt(list.quantity);
                    updateCartQuantity(totalQuantity);
                });

                cart.forProduct(addList);
            },
            error: function(){
                cart.forProduct([]);
                updateCartQuantity(0);
            }
        });
    },
    number: function(number){
        jQuery('.cart-header .number').text(number);
    },
    total: function(price){
        jQuery('.cart-sidebar .total .value').text(toReal(parseFloat(price), 'R$'));
    },
    forProduct: function (listProducts) {
        var listDom = jQuery('.cart-sidebar .content-cart .list');
        listDom.find('*').remove();
        listDom.parent().removeClass('empty');

        var qnt = 0;
        var total = 0.0;

        var listId = [];
        if (listProducts.length){

            listProducts.forEach(function (product) {
                product = product.Cart;
                
                var addMsg = product.additional_information.replace(/\//g, '');
                prices = product;
                // product.productImage.thumbs[90].https;
                listDom.append(cart.templateProduct(product.product_id, product.variant_id, product.product_name, product.product_image.medium, product.quantity, product.price, product.product_url.https,addMsg,product.additional_info_kit, product.bought_together_id));
                qnt += parseInt(product.quantity);

                total += (parseFloat(product.price) * parseInt(product.quantity));
            
                listId.push(parseInt(product.product_id));
                
            });
            cart.number(qnt);
            cart.total(total);
            
        }else{
            listDom.append('<div class="error"><div clas="text">Carrinho Vazio</div></div>');
            listDom.parent().addClass('empty');
            cart.number(0);

            jQuery('body').find('.add-cart .buy-product').each(function(){
                if(jQuery(this).hasClass('active')) jQuery(this).removeClass('active').find('.text').text('Comprar');
            });
            
        }
    },
    startCart: function () {

        jQuery('.cart-header').on('click', '.area', function(){
            if(jQuery(this).parent().hasClass('active')){
                jQuery('.cart-header').removeClass('active');
            } else {
                cart.showCart();
            }
            
        });
        
        jQuery('body').on('click', '.shadow-cart, .shadow-cart-header, .box-prev, .close-nav,.box-fixed .close-box,.close-modal,.close-icon,.modal-theme .shadow', function(e){
            jQuery('.cart-sidebar, .nav-mobile,.box-fixed,.modal-theme,.cart-header').removeClass('active');
        });

        this.initAdd();

        // add product variant
        jQuery('.product-submit').on('submit', function(e){
            e.preventDefault();
            console.log('funÃ§Ã£o product entrou')
            var variant = jQuery(this).find('.select').val();
            var quantity = jQuery(this).find('.quantity').val();
            var product_id = jQuery(this).find('.quantity').attr('data-id');
            if(variant) cart.addVariantComplete(variant, quantity, product_id);
        });

        jQuery('.remove-items').on('click', function() {
            cart.removeCart();
        });
        
    },
    removeCart: function() {
        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session(),
            success: function (response) {
                cart.listProduct();
            },
            error : function (error) {
                cart.listProduct();
            }
        });
    },
    showCart: function(){
        cart.listProduct();
        jQuery('.modal-theme').removeClass('active');

        jQuery('.cart-header').addClass('active');
        
    },
    templateProduct: function (id,variant,name,image,qnt,price,url,addMsg,infoKit,together) {
        var template = '\
            <div class="item">\
                <div class="box-cart flex align-center">\
                    <div class="box-image">\
                        <a href="{url}" class="image">\
                            <img src="{image}" alt="{name}">\
                        </a>\
                    </div>\
                    <div class="info-product">\
                        <div class="line-top flex justify-between">\
                            <a href="{url}" class="name t-color">{name}</a>\
                            <div class="remove" data-id="{id}" data-variant="{variant}" data-together="{together}" data-add="{addMsg}">\
                                <span class="icon-trash"></span>\
                            </div>\
                        </div>\
                        <div class="line-down">\
                            <div class="qnt">Quantidade: {length}</div>\
                            <div class="price">{price}</div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        ';

        template = template.replace(/{url}/g,url);
        template = template.replace(/{image}/g,image);
        template = template.replace(/{name}/g,name);
        template = template.replace(/{id}/g,id);
        template = template.replace(/{variant}/g,variant);
        template = template.replace(/{length}/g,qnt);
        template = template.replace(/{addMsg}/g,addMsg);
        template = template.replace(/{together}/g,together);
        price = toReal(parseFloat(price), 'R$');
        template = template.replace(/{price}/g,price);
        return template;
    },
    addVariantComplete: function(variant, quantity, productId){
        
        cart.loadCustomerId();

        const data = {
            Cart: {
                session_id : cart.session(),
                product_id : productId,
                variant_id : variant ? variant : 0,
                quantity   : quantity
            }
        };

        if(cart.customerId){
            data.Cart.customer_id = cart.customerId;
        }

        jQuery.ajax({
            method: 'post',
            url: '/web_api/cart/',
            dataType: 'json',
            data: data,        
            success: function( response, textStatus, jqXHR ) {
                cart.showCart();
            },  
            error: function( jqXHR, status, errorThrown ){
                window.location.href = jQuery('.modal-product').find('.name a').attr('href');
            }   
        });

        /*var customerId = dataLayer[0].customerId ? dataLayer[0].customerId : 0;
        jQuery.ajax({
            method: "POST",
            url: "/web_api/cart/",
            contentType: "application/json; charset=utf-8",
            data:'{"Cart":{"session_id":"' + cart.session() + '","product_id":"' + productId + '","quantity":"' + quantity + '","variant_id":"' + variant + '", "customer_id": "1"}}',
            success: function( response, textStatus, jqXHR ) {
                cart.showCart();
            },  
            error: function( jqXHR, status, errorThrown ){
                window.location.href = jQuery('.modal-product').find('.name a').attr('href');
            }   
        });*/
    },
    filterVariant: function(variants, selects){
        var i = 0;
        var select = selects.eq(0).val();
        if(!!select){
            var select2 = selects.eq(1).val();
            while(i < variants.length){
                if(variants[i].option == select && variants[i].option2 == select2){
                    return variants[i];
                }
                i++;
            }
        }
        return 500;
    },
    stockAlert: function(e){
        var variant = cart.filterVariant(jQuery(e).data('variants'), jQuery(e).find('select'));
        var quant = Number(e.find('input[type="number"]').val());
    
        e.find('input[type="number"]').attr('max', variant.stock).attr('data-variant', variant.id);
    
        var numberFormat = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
        var price = numberFormat.format(variant.price.price);
        var payment = variant.price.payment; 
    
        e.closest('.product').find('.info-product .down-line .box-price').html('<div class="price-off new-price">'+ price +'</div><div class="product-payment">'+ payment +'</div>');

        if(Number(variant.stock) <= 0) {
            jQuery(e).addClass('dont-stock');
        } else{
            jQuery(e).removeClass('dont-stock');
        }
        
    },
    initAdd: function () {

        jQuery('body').on('change', '.add-cart input', function(){
            var total = Number(jQuery(this).val());
            jQuery(this).val(total > 0 ? total : 1);
        });

        jQuery('body').on('change', '.list-variants select', function() {
            
            if(jQuery(this).hasClass('first')){
                if(jQuery(this).parents('.list-variants').find('.second').val() || !jQuery(this).parents('.list-variants').find('.second').length){
                    cart.stockAlert(jQuery(this).parents('.list-variants'));
                }
            } else{
                if(jQuery(this).parents('.list-variants').find('.first').val()){            
                    cart.stockAlert(jQuery(this).parents('.list-variants'));
                }
            }
            
        });

        jQuery('body').on('submit', '.list-variants', function(e){
            e.preventDefault();

            if(jQuery(this).hasClass('dont-stock')) return false;            
            var id = jQuery(this).data('id');
            var quant = jQuery(this).find('input').val();
            var href = jQuery(this).parents('.product').find('> a').attr('href');
            var variant = jQuery(this).data('variants').length ? jQuery(this).find('input').attr('data-variant') : 0;

            cart.addToCart(id, quant, variant, href);
        });
    },
    submitAdd: function(){
        jQuery('.add-cart-modal').on('submit', 'form', function(e){
            e.preventDefault();
            var productId = jQuery(this).find('#product_modal').val();
            var quant =jQuery(this).find('#quant_modal').val();
            var variant =jQuery(this).find('#variant_modal');

            if(variant.hasClass('required')){
                jQuery('#alert-modal-add').removeClass('tray-hide')
                return;
            }

            jQuery('.action-add .add-cart').attr('disabled');

            cart.addVariantComplete(variant.val(), quant, productId);
            
        });
    },
    updateCartTotal: function () {
        $('[data-cart="amount"]').text($('.cart-preview-item').length);
    },
    addToCart: function(productId, quantity, variant, href){
        
        cart.loadCustomerId();

        const data = {
            Cart: {
                session_id : cart.session(),
                product_id : productId,
                variant_id : variant ? variant : 0,
                quantity   : quantity
            }
        };

        if(cart.customerId){
            data.Cart.customer_id = cart.customerId;
        }
     
        function openModal() {
            document.querySelector('.modal-stock').style.display = 'block';
            document.querySelector('.modal-overlay-stock').style.display = 'block';
        }
        
        function closeModal() {
            document.querySelector('.modal-stock').style.display = 'none';
            document.querySelector('.modal-overlay-stock').style.display = 'none';
        }
        
        const btnclose = document.querySelector(".close-button");
        if(btnclose){
            btnclose.addEventListener("click", function() { 
                closeModal();
            });
        }
           

        const erroModal = document.querySelector("#errorModal");
        if(erroModal){
            erroModal.addEventListener("click", function() {
                closeModal();
            });
        }

        const btnClose = document.getElementById("btn-close-modal-stock");
        if(btnClose){
            btnClose.addEventListener("click", () => closeModal());
        }
        

        jQuery.ajax({
            method: 'post',
            url: '/web_api/cart/',
            dataType: 'json',
            data: data,
            success: function() {
                cart.showCart();
            },
            error: function(e){
                console.log("Nosso erro:", e);
                openModal();
            }   
        });

        /*var customerId = dataLayer[0].customerId ? dataLayer[0].customerId : 0;
        jQuery.ajax({
            method: "POST",
            url: "/web_api/cart/",
            contentType: "application/json; charset=utf-8",
            data:'{"Cart":{"session_id":"' + cart.session() + '","product_id":"' + productId + '","quantity":"' + quantity + '","variant_id":"' + variant + '", "customer_id": "1"}}',
            success: function() {
                cart.showCart();
            },
            error: function( ){
                window.location.href = href;
            }    
        });*/

    },
    ajaxGet: function(url, result){
        jQuery.ajax({
            method: "GET",
            url: url,
            success: function( response) {
                result(response);
            },
            error: function( jqXHR, status, errorThrown ){
                result({error: true});
                var response = JSON.parse( jqXHR.responseText );
            }    
        });
    }
}

jQuery(document).on('click', '.remove', function() {
    cart.removeProduct(this);
});



function toReal(value, str_cifrao) {
    return str_cifrao + ' ' + value.formatMoney(2, ',', '.');
}

Number.prototype.formatMoney = function(precision = 2, decimal = '.', thousands = ',', withCurrency = false) {

    const placeholderRegex = /{{\s*(\w+)\s*}}/;
    const format           = 'R$ {{amount}}';

    let number = this.toFixed(precision);

    let parts         = number.split('.');
    let dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, `$1${thousands}`);
    let centsAmount   = parts[1] ? decimal + parts[1] : '';
    let value         = dollarsAmount + centsAmount;

    return (withCurrency) ? format.replace(placeholderRegex, value) : value;

}

const btn_close_cart = document.querySelector('#btn-close-cart');

if(btn_close_cart){
    btn_close_cart.addEventListener('click', () =>{
        const cart_container = document.querySelector('.cart-header');
        cart_container.classList.remove('active');
    });
}

const close_cart = document.querySelector('.shadow-cart-header');

if(close_cart){
    close_cart.addEventListener('click', () =>{
        const cart_container = document.querySelector('.cart-header');
        cart_container.classList.remove('active');
    });
}


const cartt = document.querySelector('.header-cart');

if(cartt){
    cartt.addEventListener('click', () =>{
        cart.showCart();
    });
}

const iconCartMenuBig = document.getElementById("cart-header");
if(iconCartMenuBig){
    iconCartMenuBig.addEventListener('click', () =>{
        cart.showCart();
    });
}

function updateCartQuantity(totalQuantity) {
    const cartQuantityElement = document.querySelector('.cart-quantity');
    cartQuantityElement.textContent = totalQuantity;
    console.log(totalQuantity);
}

function addTotalCart(){
    cart.listProduct();

}

function removeTotalCart(){
    cart.listProduct();
}

document.querySelectorAll('.remove').forEach(btnRemoveProduct => {
    btnRemoveProduct.addEventListener('click', event => {
      
        removeTotalCart();
    });
});

//Btn compra pÃ¡gina produto carrinho
const cart_button = document.querySelector(".cart-button");

if(cart_button){
    cart_button.addEventListener("click", async () => {
        const form = document.getElementById("form_comprar");
        var formData = new FormData(form);
        var actionUrl = form.action;

        try {
            let response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                let data = await response.json();
                console.log('Item adicionado ao carrinho:', data);
            } else {
                throw new Error('Algo deu errado na rede');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    
        cart.startCart();
    });
}


if(document.querySelector('#maisInformacoes')){
    document.addEventListener('DOMContentLoaded', function() {
        const maisInfo = document.querySelector('#maisInformacoes');
        const modalPayment = document.querySelector('.payment-modal');
        const iconClose = document.querySelector('.close-icon');
        const modalContent = modalPayment.querySelector('.append');
    
        iconClose.addEventListener('click', () => {
            modalPayment.classList.remove('active');
        });
    
        maisInfo.addEventListener('click', () => {
            modalPayment.classList.add('active');
            fetchPaymentMethods();
        });
    
    
        function fetchPaymentMethods() {
            const productId = document.querySelector('#form_comprar').getAttribute('data-id');
            const price = document.querySelector('#preco_atual').value;
            const url = `/mvc/store/product/payment_options_details?loja=${tema.storeId()}&IdProd=${productId}`;
    
            console.log("Minha URL: ", url)
    
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha na resposta da rede');
                }
                return response.arrayBuffer();
            })
            .then(arrayBuffer => {
                const decoder = new TextDecoder('iso-8859-1'); 
                const text = decoder.decode(new Uint8Array(arrayBuffer));
                modalContent.innerHTML = text;
                wrapTable();
            })
            .catch(error => console.error('Erro ao buscar mÃÂ©todos de pagamento:', error));
        }
    
        function wrapTable() {
            const table = modalContent.querySelector('.tablePage');
            if (table) {
                const wrapper = document.createElement('div');
                wrapper.className = 'overflow-payment';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        }
        
    });
}
jQuery('.page-product').on('click','#detalhes_formas',function(){
    var productId = jQuery('#form_comprar').data('id');
    var price = jQuery('#preco_atual').val();

    var link = '/mvc/store/product/payment_options_details?loja='+theme.storeId()+'&IdProd='+productId+'&preco='+price;
    jQuery('.payment-modal').addClass('active');

    jQuery('.payment-modal .append').html('<div class="load-css"><div class="icon"></div></div>');

    theme.getAjax('get',link,{},function(response){
        jQuery('.payment-modal .append').html(response).find('.tablePage').wrap('<div class="overflow-payment"></div>');
    });
});