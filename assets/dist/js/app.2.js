(function ($) {
    "use strict";

    $(window).on('load', function () {
        $(".to-animate-group").addClass("animated");
    })

    windowScroll();

    /**
    * ----------------------------------------------
    * Testimonial slider
    * ----------------------------------------------
    */
    testimonialSlider();
    /**
    * ----------------------------------------------
    * Screenshot slider
    * ----------------------------------------------
    */
    screenshotSlider();
    /**
    * ----------------------------------------------
    * Query form
    * ----------------------------------------------
    */
    validateQueryForm();
})(jQuery);

/**
 * ----------------------------------------------
 * Nav Scroll active section class 
 * ----------------------------------------------
 */
function windowScroll() {
    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop();
        if (scrollPos >= 20) {
            $(".header").addClass("fixed-nav");
        } else {
            $(".header").removeClass("fixed-nav");
        }
    })
}

/**
* ----------------------------------------------
* Testimonial slider
* ----------------------------------------------
*/
function testimonialSlider() {
    var owl = $(".testimonials-slider-5").owlCarousel({
        nav: true,
        loop: true,
        autoplay: true,
        smartSpeed: 800,
        autoplayHoverPause: true,
        margin: 20,
        dots: false,
        navText: ['<i class="icon-arrow-left-circle"></i>', '<i class="icon-arrow-right-circle"></i>'],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1100: {
                items: 3
            }
        }
    });
}
/**
 * ----------------------------------------------
 * Screenshot slider 
 * ----------------------------------------------
 */
function screenshotSlider() {
    new Swiper('.screenshots-slider', {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        effect: 'coverflow',
        spaceBetween: 0,
        speed: 900,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-slider-button .slider-button-next',
            prevEl: '.swiper-slider-button .slider-button-prev',
        },
        coverflowEffect: {
            rotate: 0,
            stretch: 71,
            depth: 160,
            modifier: 1,
            slideShadows: false
        },
        breakpoints: {
            1199: {
                coverflowEffect: {
                    stretch: 57
                }
            },
            992: {
                coverflowEffect: {
                    stretch: 50
                }
            },
            768: {
                coverflowEffect: {
                    stretch: 36
                }
            },
            575: {
                slidesPerView: 2.5,
                coverflowEffect: {
                    stretch: 18
                }
            },
            370: {
                slidesPerView: 2.5,
                coverflowEffect: {
                    stretch: 10
                }
            }
        }
    })
}

/**
* ----------------------------------------------
* Validate contact us form data
* ----------------------------------------------
*/
function validateQueryForm() {
    if ($('#query-form').length) {
        $('#query-form').validate({
            focusInvalid: false,
            rules: {
                'validation-email': {
                    required: true,
                    email: true
                },
                'validation-name': {
                    required: true,
                },
                'validation-subject': {
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
                    error.addClass('jquery-validation-error small text-white form-text invalid-feedback')
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

