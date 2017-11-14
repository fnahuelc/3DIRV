/*-----------------------------------------------------------------------------------
/*
/* Script for Resume
/*
-----------------------------------------------------------------------------------*/


/*----------------------------------------------------*/
/* Preloader
------------------------------------------------------ */

$(window).load(function() {

    $('.loader').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350);

});


jQuery(document).ready(function($) {

    /*----------------------------------------------------*/
    /* Initializing jQuery Nice Scroll
    ------------------------------------------------------ */

    $("html").niceScroll({
        cursorcolor: "#11abb0", // Set cursor color
        cursorwidth: "8", // Sety cursor width
        cursorborder: "" // Set cursor border color, default left none
    });


    /*----------------------------------------------------*/
    /* FitText Settings
    ------------------------------------------------------ */

    setTimeout(function() {
        $('h1.responsive-headline').fitText(1, { minFontSize: '28px', maxFontSize: '72px' });
    }, 100);


    /*----------------------------------------------------*/
    /* Smooth Scrolling
    ------------------------------------------------------ */

    $('.smoothscroll').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function() {
            window.location.hash = target;
        });

    });


    /*----------------------------------------------------*/
    /* Appear Animation
    ------------------------------------------------------*/
    new WOW().init();

    /*----------------------------------------------------*/
    /* Parallax for Header Content
    ------------------------------------------------------*/
    $(window).scroll(function(e) {
        parallax();
    });


    function parallax() {
        var scrollPosition = $(window).scrollTop();
        $('.banner').css('margin-top', (0 - (scrollPosition * .8)) + 'px');
    }

    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
    ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#left-nav a");

    sections.waypoint({

        handler: function(event, direction) {

            var active_section;

            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#left-nav a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },
        offset: '35%'

    });


    /*----------------------------------------------------*/
    /*	Make sure that #header-background-image height is
    /* equal to the browser height.
    ------------------------------------------------------ */

    $('header').css({ 'height': $(window).height() });
    $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
    });


    /*----------------------------------------------------*/
    /*  On scroll blur header
    ------------------------------------------------------*/
    (function() {
        $(window).scroll(function() {
            var oVal;
            oVal = $(window).scrollTop() / 100;
            return $(".header-overlay").css("opacity", oVal);
        });

    }).call(this);



    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
    ------------------------------------------------------*/

    $('#menu').click(function() {
        $(document.body).toggleClass("show-menu");
        $('.menu').toggleClass("close-menu");
    });


    var Menu = {

        el: {
            ham: $('.menu'),
            menuTop: $('.menu-top'),
            menuMiddle: $('.menu-middle'),
            menuBottom: $('.menu-bottom')
        },

        init: function() {
            Menu.bindUIactions();
        },

        bindUIactions: function() {
            Menu.el.ham
                .on(
                    'click',
                    function(event) {
                        Menu.activateMenu(event);
                        event.preventDefault();
                    }
                );
        },

        activateMenu: function() {
            Menu.el.menuTop.toggleClass('menu-top-click');
            Menu.el.menuMiddle.toggleClass('menu-middle-click');
            Menu.el.menuBottom.toggleClass('menu-bottom-click');
        }
    };

    Menu.init();

    /* Animate Left Menu */


    /*----------------------------------------------------*/
    /*	Modal Popup
    ------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });
    $('.examples-wrap a').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        removalDelay: 200,
        showCloseBtn: false,
        mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    /*----------------------------------------------------*/
    /*  Owl Carousel
    /*----------------------------------------------------*/


    $(document).ready(function() {

        $("#testimonial-slides").owlCarousel({

            navigation: false, // Show next and prev buttons
            slideSpeed: 300,
            paginationSpeed: 400,
            singleItem: true

            // "singleItem:true" is a shortcut for:
            // items : 1,
            // itemsDesktop : false,
            // itemsDesktopSmall : false,
            // itemsTablet: false,
            // itemsMobile : false

        });

    });

    /*----------------------------------------------------*/
    /*	contact form
    ------------------------------------------------------*/

    $('form#contactForm button.submit').click(function() {

        $('#image-loader').fadeIn();

        var contactName = $('#contactForm #contactName').val();
        var contactEmail = $('#contactForm #contactEmail').val();
        var contactSubject = $('#contactForm #contactSubject').val();
        var contactMessage = $('#contactForm #contactMessage').val();

        var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
            '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

        $.ajax({

            type: "POST",
            url: "inc/sendEmail.php",
            data: data,
            success: function(msg) {

                // Message was sent
                if (msg == 'OK') {
                    $('#image-loader').fadeOut();
                    $('#message-warning').hide();
                    $('#contactForm').fadeOut();
                    $('#message-success').fadeIn();
                }
                // There was an error
                else {
                    $('#image-loader').fadeOut();
                    $('#message-warning').html(msg);
                    $('#message-warning').fadeIn();
                }

            }

        });
        return false;
    });


    /*----------------------------------------------------*/
    /*  Custom
     /*----------------------------------------------------*/
    $(document).on('click', 'a[href^="#"]', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    $(".scrolling-content").animate({scrollTop: $(".scrolling-content> div:first-of-type").position().top});
    $('.item-wrap a').click(function () {
        href = $(this).attr('href')
        $(href+' .scrolling-content').each(function(){
            if($(this)[0].scrollHeight==$(this)[0].clientHeight){
                $(this).find('.scroll_button').hide();
            }
        });}
    )
});

function scrollWin() {
    $(".scrolling-content").animate({ scrollTop:500 }, "fast");
}

function loadExample1(){
    setTimeout(function(){
        $("body>div>div>div>#modal-B01 .iplot").each(function(){
            if ($(this).attr('src')=== undefined){
                $(this).attr("src", $(this).data("src"));
            }
        });
    }, 100);
        $("#Examples .iplot").each(function(){
            $(this).attr("src", null);
    });
};
function loadExample2(){
        setTimeout(function(){
            $("body>div>div>div>#modal-B02 .iplot").each(function(){
            if ($(this).attr('src')=== undefined) {
                $(this).attr("src", $(this).data("src"));
            }
        }, 100);
            $("#Examples .iplot").each(function(){
            $(this).attr("src", null);
    });
    });
};
