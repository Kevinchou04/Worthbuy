(function ($) {
    'use strict';

    if (jQuery().flexslider) {
        // Sliders
        $('.sliders').flexslider({
            controlNav: false,
            directionNav: true,
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>'
        });

        // Project Slider
        $('.project-slider').flexslider({
            animation: 'slide',
            controlNav: false,
            directionNav: true,
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>'
        });
    }

    if (jQuery().owlCarousel) {
        // Our Services Carousel
        $('.our-services-carousel').owlCarousel({
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                991: {
                    items: 2,
                    margin: 30
                },
                1199: {
                    items: 3
                }
            }
        });

        $('.testimonial-carousel').owlCarousel({
            items: 1,
            margin: 0
        });

        var $portfolioCarousel = $('.portfolio-carousel');
        var $portfolioNav = $(".portfolio-nav-wrapper");

        $portfolioCarousel.owlCarousel({
            items: 1,
            dots: false,
            margin: 0

        });

        $portfolioNav.find(".next-link").on('click', function (e) {
            $portfolioCarousel.trigger('next.owl.carousel');
            e.preventDefault();
        });

        $portfolioNav.find(".previous-link").on('click', function (e) {
            $portfolioCarousel.trigger('prev.owl.carousel');
            e.preventDefault();
        });

    }

    if (jQuery().slicknav) {
        // Slick Nav
        // http://slicknav.com/
        var siteNavigation = $("#site-navigation");
        var primaryMenu = siteNavigation.find(".menu-primary");
        if (!primaryMenu.hasClass("side-menu-primary")) {
            primaryMenu.slicknav({
                label: "",
                prependTo: siteNavigation
            });
        }
    }

    if (jQuery().isotope) {
        //  Isotope
        //  http://isotope.metafizzy.co/
        var portfolioIsotope = function () {
            // init Isotope
            var $grid = $('.portfolio-items-container').isotope({
                itemSelector: '.portfolio-post',
                layoutMode: 'fitRows'
            });

            // filter items on button click
            $('.filter-group > li').on('click', 'a', function () {
                var filterValue = $(this).attr('data-filter');
                $(".filter-group a").removeClass("is-checked");
                $(this).addClass("is-checked");
                $grid.isotope({filter: filterValue});
                return false;
            });
        };

        $(window).on('load', portfolioIsotope);
    }

    if (jQuery().lightcase) {
        // Light Case
        // http://cornel.bopp-art.com/lightcase/documentation/
        $('a[data-rel^=lightcase]').lightcase({
            swipe: true
        });
    }

    if (jQuery().lightcase) {
        // Fake Loader
        // http://joaopereirawd.github.io/fakeLoader.js/
        $("#fakeLoader").fakeLoader({
            timeToHide: 1500,
            zIndex: "20000",//Default zIndex
            bgColor: "#04befc",
            spinner: "spinner3"
        });
    }

    // Search Form Header
    var $searchToggle = $(".search-toggle");
    if ($searchToggle) {
        $searchToggle.on('click', function () {
            $(".header-search-form").fadeToggle();
        });
    }

    // Mouse Icon
    var mouseIcon = $(".mouse-icon");
    if (mouseIcon) {
        var firstSection = $(".sections").first();

        $('body').on("click touchstart", ".mouse-icon", function (e) {
            $("html, body").animate({scrollTop: firstSection.offset().top}, 800);
        });
    }

    // Accordion
    var initAccordion = function () {
        var $accordion = $(".accordion");
        if ($accordion) {
            $accordion.find(".accordion-sections.opened .accordion-content").slideDown(200);
            $accordion.find(".accordion-header").on('click', function () {
                var self = $(this);
                var parent = self.parents(".accordion");
                parent.find(".accordion-sections").removeClass("opened");
                parent.find(".accordion-sections").find(".accordion-content").stop().slideUp(200);
                $(this).parent(".accordion-sections").addClass("opened");
                $(this).next(".accordion-content").stop().slideDown(200);
            });
        }
    };
    initAccordion();

    // Tabs
    var initTabs = function () {
        var $tabs = $(".tabs");
        if ($tabs) {
            $tabs.find(".tabs-nav-list > li").on('click', function () {
                var self = $(this);
                var tabId = self.index();
                var parent = self.parents(".tabs");
                parent.find("li").removeClass('current');
                $(this).addClass('current');
                parent.find(".tab-content").removeClass('current').hide();
                parent.find(".tab-content").eq(tabId).show().addClass('current');
            });
        }
    };
    initTabs();

    // Show Slide Header
    $('#show-slide-header').on('click', function () {
        $(this).toggleClass("active");
        $(".page-wrapper").toggleClass("show-slide-header");
    });

    // Home Scroll
    var $sideMenuPrimary = $(".side-menu-primary");
    if ($sideMenuPrimary.length) {
        $sideMenuPrimary.on('click', 'a', function (e) {
            var currentSection = $($(this).attr("href"));
            if (currentSection.length && currentSection != '#') {
                $("html, body").animate({scrollTop: currentSection.offset().top}, 800);
                return false;
            }
        });
    }

    if (jQuery().waypoint) {

        // Counter
        var $counter = $('.counter');
        $counter.waypoint({
            handler: function (direction) {
                if ('down' == direction) {
                    if (jQuery().countTo) {
                        $('.counter-digit > span').countTo();
                    }
                }
            },
            offset: '85%'
        });

        // Progress
        var $progressBars = $(".progress-bars");
        $progressBars.waypoint({
            handler: function (direction) {
                var $progress = $(".progress");
                if ('down' == direction) {
                    $progress.each(function (i, value) {
                        var $this = $(this);
                        var progressed = $this.find(".progressed");
                        var completed = $this.find(".completed");
                        var dataPercentage = $this.data("percentage");
                        progressed.css("left", dataPercentage + '%').text(dataPercentage + '%');
                        completed.animate({
                            width: dataPercentage + '%'
                        }, 1500);
                    });
                }
            },
            offset: '50%'
        });
    }


    // Validation
    function validateForm(form) {
        var $form = $(form),
            formStatus = $form.find('.status'),
            progressLoader = $form.find('#progress-loader'),
            paperPlane = $form.find('.fa-paper-plane-o');

        $form.validate({
            errorLabelContainer: formStatus,
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    beforeSubmit: function () {
                        formStatus.hide();
                        paperPlane.hide();
                        progressLoader.show();
                    },
                    success: function (result, status, xhr, form) {
                        var data = $.parseJSON(result);
                        paperPlane.show();
                        progressLoader.hide();
                        formStatus.show();

                        if (data.response == "success") {
                            formStatus.addClass("success").html(data.message);
                        } else {
                            formStatus.addClass("error").html(data.message);
                        }
                    },
                    complete: function (xhr, status, form) {
                        $form.resetForm();
                        setTimeout(function () {
                            formStatus.text('');
                        }, 3000);
                    }
                });
            }
        });
    }

    if (jQuery().validate && jQuery().ajaxSubmit) {
        validateForm("#contact-form");
        validateForm(".home-contact-form");
    }

})(jQuery);