(function ($) {
    "use strict";

    $(".date").text(new Date().getFullYear())
    if ($('.video-popup-btn').length) {
        $('.video-popup-btn').magnificPopup({
            type: 'iframe'
        });
    }
    /**
     * ----------------------------------------------
     * Animatation plugin AOS call
     * ----------------------------------------------
     */
    AOS.init({
        offset: 150,
        duration: 400,
        easing: 'linear',
        delay: 0,
        once: true,
        disable: 'mobile'
    });

    $(window).resize(function(){
        if(window.innerWidth < 991) {
            $(".aos-init").addClass('aos-animate')
        }
    })
    /**
    * ----------------------------------------------
    * Scroll to section
    * ----------------------------------------------
    */
    $.scrollIt({
        upKey: 38,             // key code to navigate to the next section
        downKey: 40,           // key code to navigate to the previous section
        easing: 'linear',      // the easing function for animation
        scrollTime: 400,       // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null,    // function(pageIndex) that is called when page is changed
        topOffset: -40           // offste (in px) for fixed top navigation
    });

    /**
    * ----------------------------------------------
    * Page or Progress Loader
    * ----------------------------------------------
    */
    pageProgress();


    /**
    * ----------------------------------------------
    * sidebar menu call
    * ----------------------------------------------
    */
    sidebarMenu();

    /**
    * ----------------------------------------------
    * Portfolio photoswipe image slider call
    * ----------------------------------------------
    */
    photoswipe();

    /**
    * ----------------------------------------------
    * Subscribe Now call
    * ----------------------------------------------
    */
    subscribeNow();

    /**
     * ----------------------------------------------
     * Contact us form validation
     * ----------------------------------------------
     */
    validateContactUsForm();


    /**
    * ----------------------------------------------
    * Get started form validation
    * ----------------------------------------------
    */
    validateGetStartedForm();

    /**
     * ----------------------------------------------
     * our work filteration data call
     * ----------------------------------------------
     */
    ourWorkDataFilteration();

    /**
     * ----------------------------------------------
     * Nav Scroll active section class call
     * ----------------------------------------------
     */
    windowScroll();

    /**
    * ----------------------------------------------
    * sponsor-carousel call
    * ----------------------------------------------
    */
    sponsorsSlider();

    /**
    * ----------------------------------------------
    * tweets-carousel call
    * ----------------------------------------------
    */
    tweetsSlider();

    /**
    * ----------------------------------------------
    * Content loaded call
    * ----------------------------------------------
    */
    contentLoaded()

})(jQuery);


/**
 * ----------------------------------------------
 * Nav Scroll active section class 
 * ----------------------------------------------
 */
function windowScroll() {
    var isCounterRun = true;
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop();
        if (scrollPos > $(document).height() / 2) {
            $('.scroll-top-btn').fadeIn(500);
        }
        else {
            $('.scroll-top-btn').fadeOut();
        }
        if($("[data-counter-section]").length){
            var counterSection = $("[data-counter-section]").offset().top;
            if((scrollPos > counterSection - 100) && isCounterRun) {
                counterUpFn();
                isCounterRun = false;
            }
        }
    })
}


/**
* ----------------------------------------------
* Hide preloader
* ----------------------------------------------
*/
function hidePreLoader() {
    $(".preloader").fadeOut(500);
}


/**
* ----------------------------------------------
* sidebar menu
* ----------------------------------------------
*/
function sidebarMenu() {
    $(".sidebar-btn").on("click", function () {
        $(".sidebar-menu").addClass("active");
    })
    $(".sidebar-menu .close-sidebar").on("click", function () {
        $(".sidebar-menu").removeClass("active");
    });
    $(".sidebar-right-btn").on("click", function () {
        var href = $(this).attr('data-href');
        $(href).addClass("active");
    })
    $(".sidebar-open-nav .close-sidebar").on("click", function () {
        var href = $(this).attr('data-href');
        $(href).removeClass("active");
    })
}

/**
* ----------------------------------------------
* Portfolio photoswipe image slider
* ----------------------------------------------
*/
function photoswipe() {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery2',
        children: '[data-filterItem]',
        thumbSelector: '[data-thumbSelector]',
        pswpModule: PhotoSwipe
    });
    lightbox.on('uiRegister', function () {
        lightbox.pswp.ui.registerElement({
            name: 'custom-caption',
            order: 9,
            isButton: false,
            appendTo: 'root',
            html: 'Caption text',
            onInit: (el, pswp) => {
                lightbox.pswp.on('change', () => {
                    const currSlideElement = lightbox.pswp.currSlide.data.element;
                    let captionHTML = '';
                    if (currSlideElement) {
                        const hiddenCaption = $(currSlideElement).find("[data-hiddenCaption]");
                        if (hiddenCaption) {
                            const title = $(hiddenCaption).find("h5").text().trim();
                            const text = $(hiddenCaption).find("p").text().trim();
                            // get caption from element with class hidden-caption-content
                            const html = $("<div><h5>"+title+"</h5><p>"+text+"</p></div>");
                            captionHTML = $(html).html();
                        } else {
                            // get caption from alt attribute
                            captionHTML = $(currSlideElement).find(".grid-image img").attr('alt');
                        }
                    }
                    el.innerHTML = captionHTML || '';
                });
            }
        });
    });
    lightbox.init();
}

/**
* ----------------------------------------------
* Subscribe Now
* ----------------------------------------------
*/
function subscribeNow() {
    if ($("#subscribe").length) {
        var $subscribe = $("#subscribe");
        $subscribe.ajaxChimp({
            callback: mailchimpCallback,
            url: "url" // Replace your mailchimp post url inside double quote "".  
        });

        function mailchimpCallback(resp) {
            var result = $('.subscribe-result');
            if (resp.result === 'success') {
                $subscribe[0].reset();
                result.addClass('text-success');
                result.removeClass('text-danger');
            } else if (resp.result === 'error') {
                result.addClass('text-danger');
                result.removeClass('text-success');
            }
            result
                .html(resp.msg)
                .fadeIn(1000)
                .delay(1000)
                .fadeOut(500);
        };
    }
}

/**
* ----------------------------------------------
* our work filteration data
* ----------------------------------------------
*/
function ourWorkDataFilteration() {
    if (window.Shuffle && $('.filtr-container').length) {
        var Shuffle = window.Shuffle;
        var shuffleInstance = new Shuffle(document.querySelector('.filtr-container'), {
            itemSelector: '.filtr-item',
            sizer: '.work-nav',
        });

        $(".work-nav .control").on("click", function (e) {
            e.preventDefault();
            shuffleInstance.filter($(this).attr('data-filter'));
            $('.work-nav .control').removeClass('filtr-active');
            $(this).addClass('filtr-active');
        });
    }
}

/**
* ----------------------------------------------
* owl-carousel sponsor-carousel
* ----------------------------------------------
*/
function sponsorsSlider() {
    if ($(".sponsors").length) {
        $(".sponsors .owl-carousel").owlCarousel({
            items: 4,
            dots: false,
            autoplay: true,
            nav: false,
            navSpeed: 800,
            dotsSpeed: 800,
            autoplaySpeed: 800,
            margin: 50,
            loop: true,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 2
                },
                // breakpoint from 480 up
                480: {
                    items: 3
                },
                // breakpoint from 768 up
                768: {
                    items: 4
                }
            },
        });
    }
}

/**
* ----------------------------------------------
* Validate contact us form data
* ----------------------------------------------
*/
function validateContactUsForm() {
    if ($('#validation-form').length) {
        $('#validation-form').validate({
            focusInvalid: false,
            rules: {
                'validation-email': {
                    required: true,
                    email: true
                },
                'validation-firstname': {
                    required: true,
                },
                'validation-lastname': {
                    required: true,
                },
                'validation-phone': {
                    required: true,
                },
                'validation-message': {
                    required: true,
                },
                'validation-required': {
                    required: true
                }
            },

            // Errors
            //

            errorPlacement: function errorPlacement(error, element) {
                var $parent = $(element).parents('.form-group');

                // Do not duplicate errors
                if ($parent.find('.jquery-validation-error').length) { return; }

                $parent.append(
                    error.addClass('jquery-validation-error small form-text invalid-feedback')
                );
            },
            highlight: function (element) {
                var $el = $(element);
                var $parent = $el.parents('.form-check');
                if ($parent.length > 0) {
                    $parent.addClass('is-invalid');
                }
                else {
                    $el.addClass('is-invalid');
                }
                // Select2 and Tagsinput
                if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput') {
                    $el.parent().addClass('is-invalid');
                }
            },
            unhighlight: function (element) {
                $(element).parents('.form-check').removeClass('is-invalid');
                $(element).removeClass('is-invalid');
            },
            submitHandler: function (form) {
                var url = "assets/php/index.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(form).serialize(),
                    success: function (data) {
                        $("#message").html(data);
                        $("#message").fadeIn();
                        $("#message").removeClass('d-none');
                        document.getElementById("validation-form").reset();
                        setTimeout(function () {
                            $("#message").fadeOut();
                            $("#message").addClass('d-none');
                        }, 4000)
                    }
                });
            }
        });
    }
}

/**
* ----------------------------------------------
* Validate get started form data
* ----------------------------------------------
*/
function validateGetStartedForm() {
    if ($('#get-started-form').length) {
        $('#get-started-form').validate({
            focusInvalid: false,
            rules: {
                'validation-email': {
                    required: true,
                    email: true
                },
                'validation-fullname': {
                    required: true,
                },
                'validation-mobile': {
                    required: true,
                },
                'validation-message': {
                    required: true,
                },
                'validation-required': {
                    required: true
                }
            },

            // Errors
            //

            errorPlacement: function errorPlacement(error, element) {
                var $parent = $(element).parents('.form-group');

                // Do not duplicate errors
                if ($parent.find('.jquery-validation-error').length) { return; }

                $parent.append(
                    error.addClass('jquery-validation-error small form-text invalid-feedback')
                );
            },
            highlight: function (element) {
                var $el = $(element);
                var $parent = $el.parents('.form-check');
                if ($parent.length > 0) {
                    $parent.addClass('is-invalid');
                }
                else {
                    $el.addClass('is-invalid');
                }
                // Select2 and Tagsinput
                if ($el.hasClass('select2-hidden-accessible') || $el.attr('data-role') === 'tagsinput') {
                    $el.parent().addClass('is-invalid');
                }
            },
            unhighlight: function (element) {
                $(element).parents('.form-check').removeClass('is-invalid');
            }
        });
    }
}

/**
* ----------------------------------------------
* tweet carousel
* ----------------------------------------------
*/
function tweetsSlider() {
    if ($(".tweets-carousel").length) {
        $(".tweets-carousel").owlCarousel({
            items: 1,
            dots: false,
            autoplay: true,
            nav: false,
            navSpeed: 800,
            dotsSpeed: 800,
            autoplaySpeed: 800,
            margin: 0,
            navText: ['<i class="icon-arrow-left-circle"></i>', '<i class="icon-arrow-right-circle"></i>'],
            loop: true,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1
                },
                // breakpoint from 480 up
                480: {
                    items: 1
                },
                // breakpoint from 768 up
                768: {
                    items: 1
                }
            },
        });
    }
}

/**
* ----------------------------------------------
* CounterUp
* ----------------------------------------------
*/

function counterUpFn() {
    const counterUp = window.counterUp.default
    const el = document.querySelectorAll('[data-counter]')
    if(el.length){
        el.forEach((item) => {
            counterUp(item, {
                duration: 4000,
                delay: 10,
            })
        })
    }
}

/**
* ----------------------------------------------
* Content loaded
* ----------------------------------------------
*/
function contentLoaded() {
    window.onload = function () {
        hidePreLoader()
    }
}

/**
* ----------------------------------------------
* Page or Progress Loader
* ----------------------------------------------
*/
function pageProgress() {
    var progressWrap = document.querySelector('.progress-wrap');
    if (progressWrap != null) {
        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        var offset = window.outerHeight;
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        window.addEventListener("scroll", function (event) {
            var scroll = document.body.scrollTop || document.documentElement.scrollTop;
            var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
            var scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollElementPos >= offset) {
                progressWrap.classList.add("active-progress")
            } else {
                progressWrap.classList.remove("active-progress")
            }
        });
        progressWrap.addEventListener('click', function (e) {
            e.preventDefault();
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    }
}
