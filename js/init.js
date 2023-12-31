jQuery(document).ready(function(){

	"use strict";
	
	// here all ready functions
	
	fendy_tm_owl_carousel();
	fendy_tm_down();
	fendy_tm_trigger_menu();
	fendy_tm_nav_bg();
	fendy_tm_modalbox_news();
	fendy_tm_modalbox_service();
	fendy_tm_cursor();
	fendy_tm_imgtosvg();
	fendy_tm_popup();
	fendy_tm_data_images();
	fendy_tm_contact_form();
	fendy_tm_totop();
	fendy_tm_cursor();
	
	jQuery(window).load('body', function(){
		fendy_tm_my_load();
	});
	
});

// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

// -----------------------------------------------------
// ----------------    OWL CAROUSEL    -----------------
// -----------------------------------------------------

function fendy_tm_owl_carousel(){

	"use strict";
	
	var carousel			= jQuery('.fendy_tm_testimonials .owl-carousel');
	var carousel2			= jQuery('.fendy_tm_news .owl-carousel');
	
	var rtlMode	= false;

	if(jQuery('body').hasClass('rtl')){
		rtlMode = 'true';
	}

	carousel.owlCarousel({
		loop: true,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		lazyLoad: false,
		margin: 0,
		autoplay: true,
		autoplayTimeout: 6000,
		smartSpeed: 2000,
		rtl: rtlMode,
		dots: true,
		nav: false,
		navSpeed: false,
	});
	fendy_tm_imgtosvg();
	
	carousel.parent().find('.right_nav').click(function() {
		carousel.trigger('next.owl.carousel');
		return false;
	});
	// Go to the previous item
	carousel.parent().find('.left_nav').click(function() {
		// With optional speed parameter
		// Parameters has to be in square bracket '[]'
		carousel.trigger('prev.owl.carousel');
		return false;
	});
	
	carousel2.each(function(){
		var e = $(this);
		fendy_tm_news_pagination(e);
		e.owlCarousel({
			loop: true,
			items: 3,
			lazyLoad: false,
			margin: 30,
			center:false,
			autoplay: false,
			autoplayTimeout: 7000,
			rtl: rtlMode,
			dots: true,
			nav: false,
			navSpeed: false,
			URLhashListener:true,
			autoplayHoverPause:true,
			startPosition: 'URLHash',
			responsive:{
				0:{items:1},
				480:{items:1},
				768:{items:2},
				1040:{items:3},
				1200:{items:3},
				1600:{items:3},
				1920:{items:3}
			}
		});
	});
}

function fendy_tm_news_pagination(element){
	
	"use strict";
	
	var wrapper		= element.closest('.fendy_tm_news');
	var newsList	= wrapper.find('.news_list');
	var owlChild	= element.find('li');
	var liCount		= owlChild.length;
	
	var html 		= '<div class="my_numbers"><div class="in"><a class="prev" href="#"><span></span></a><a class="next" href="#"><span></span></a><div class="wrapper"><ul>';
	for(var i=0; i<liCount;i++){
		html 		+= '<li><a href="#'+element.find('li:eq('+i+')').attr('data-hash')+'">'+(i+1)+'.</a></li>';
	}
	html += '</ul></div></div></div>';
	
	newsList.append(html);
	
	var listWrap	= wrapper.find('.my_numbers ul');
	var prev		= wrapper.find('.prev');
	var next		= wrapper.find('.next');
	var liWidth		= listWrap.find('li').outerWidth(true);
	
	var count = 0;
	
	prev.on('click',function(){
		if(count === 0){
			return false;
		}
		count--;
		listWrap.css({transform: 'translateX('+(liWidth*count*(-1))+'px)'});
		console.log(count);
		return false;
	});
	next.on('click',function(){
		if((liCount-4) < count + 1){
			return false;
		}
		count++;
		listWrap.css({transform: 'translateX('+(liWidth*count*(-1))+'px)'});
		console.log(count);
		return false;
	});
}

// -----------------------------------------------------
// -----------------    DOWN    ------------------------
// -----------------------------------------------------

function fendy_tm_down(){
	
	"use strict";
	
	var topbar		= jQuery('.fendy_tm_topbar').outerHeight();
	jQuery('.fendy_tm_hero .fendy_tm_button a').on('click',function(){
		if($('.fendy_tm_topbar').length){
			if($.attr(this, 'href') !== '#'){
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top-topbar+40
			}, 800);
		}
		}
	});
	
	jQuery('.fendy_tm_intro .fendy_tm_button a').on('click',function(){
		
			if($.attr(this, 'href') !== '#'){
			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top-100
			}, 800);
		}
		
	});
}

// -----------------------------------------------------
// ---------------   TRIGGER MENU    -------------------
// -----------------------------------------------------

function fendy_tm_trigger_menu(){
	
	"use strict";

	var hamburger 		= jQuery('.my_trigger .hamburger');
	var mobileMenu		= jQuery('.fendy_tm_mobile_menu .dropdown');
	var mobileMenuList	= jQuery('.fendy_tm_mobile_menu .dropdown .dropdown_inner ul li a');

	hamburger.on('click',function(){
		var element 	= jQuery(this);

		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			mobileMenu.slideUp();
		}else{
			element.addClass('is-active');
			mobileMenu.slideDown();
		}
		return false;
	});
	
	mobileMenuList.on('click',function(){
		jQuery('.my_trigger .hamburger').removeClass('is-active');
		mobileMenu.slideUp();
		return false;
	});
}

// -----------------------------------------------------
// --------------   TOPBAR BACKGROUND    ---------------
// -----------------------------------------------------

function fendy_tm_nav_bg(){
	
	"use strict";

	jQuery(window).on('scroll',function(){
		var topbar	 		= jQuery('.fendy_tm_topbar');
		var WinOffset		= jQuery(window).scrollTop();

		if(WinOffset >= 100){
			topbar.addClass('animate');
		}else{
			topbar.removeClass('animate');
		}
	});
}

// -------------------------------------------------
// -------------------  ANCHOR ---------------------
// -------------------------------------------------

jQuery('.anchor_nav').onePageNav();

// -------------------------------------------------
// -------------  MODALBOX NEWS  -------------------
// -------------------------------------------------

function fendy_tm_modalbox_news(){
	
	"use strict";
	
	var modalBox	= jQuery('.fendy_tm_modalbox_news');
	var list 		= jQuery('.fendy_tm_news ul li');
	var closePopup	= modalBox.find('.close');
	
	list.each(function(){
		var element 	= jQuery(this);
		var details 	= element.find('.list_inner').html();
		var buttons 	= element.find('.details a, .learn_more');
		var mainImage	= element.find('.main');
		var imgData		= mainImage.data('img-url');
		var title		= element.find('.title h3');
		var titleHref	= element.find('.title a').html();
		buttons.on('click',function(){
			jQuery('body').addClass('modal');
			modalBox.addClass('opened');
			modalBox.find('.description_wrap').html(details);
			mainImage = modalBox.find('.main');
			mainImage.css({backgroundImage: 'url('+imgData+')'});
			title = modalBox.find('.title h3');
			title.html(titleHref);
			fendy_tm_imgtosvg();
			return false;
		});
	});
	closePopup.on('click',function(){
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		jQuery('body').removeClass('modal');
		return false;
	});
}

// -------------------------------------------------
// -------------  MODALBOX SERVICE -----------------
// -------------------------------------------------

function fendy_tm_modalbox_service(){
	
	"use strict";
	
	var modalBox	= jQuery('.fendy_tm_modalbox_service');
	var list 		= jQuery('.fendy_tm_services ul li');
	var closePopup	= modalBox.find('.close');
	
	list.each(function(){
		var element 	= jQuery(this);
		var details 	= element.find('.list_inner').html();
		var buttons 	= element.find('.fendy_tm_full_link');
		var mainImage	= element.find('.main');
		var imgData		= mainImage.data('img-url');
		buttons.on('click',function(){
			jQuery('body').addClass('modal');
			modalBox.addClass('opened');
			modalBox.find('.description_wrap').html(details);
			mainImage = modalBox.find('.main');
			mainImage.css({backgroundImage: 'url('+imgData+')'});
			fendy_tm_imgtosvg();
			return false;
		});
	});
	closePopup.on('click',function(){
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		jQuery('body').removeClass('modal');
		return false;
	});
}

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

function fendy_tm_my_load(){
	
	"use strict";
	
	var speed	= 500;
	setTimeout(function(){fendy_tm_preloader();},speed);
	setTimeout(function(){jQuery('body').addClass('opened');},speed+2000);
}

// -----------------------------------------------------
// --------------------    WOW JS    -------------------
// -----------------------------------------------------

 new WOW().init();

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function fendy_tm_cursor(){
    "use strict";
	
	var myCursor	= jQuery('.mouse-cursor');
	
	if(myCursor.length){
		if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
        let n, i = 0,
            o = !1;
        window.onmousemove = function (s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
        }, $("body").on("mouseenter", "a, .toky_tm_topbar .trigger, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
        }), $("body").on("mouseleave", "a, .toky_tm_topbar .trigger, .cursor-pointer", function () {
            $(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
        }), e.style.visibility = "visible", t.style.visibility = "visible"
    }
	}
};

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function fendy_tm_imgtosvg(){
	
	"use strict";
	
	jQuery('img.svg').each(function(){
		
		var jQueryimg 		= jQuery(this);
		var imgClass		= jQueryimg.attr('class');
		var imgURL			= jQueryimg.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// --------------------   POPUP    ---------------------
// -----------------------------------------------------

function fendy_tm_popup(){
	
	"use strict";

	jQuery('.gallery_zoom').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

	});
	jQuery('.popup-youtube, .popup-vimeo').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});
	
	jQuery('.soundcloude_link').magnificPopup({
	  type : 'image',
	   gallery: {
		   enabled: true, 
	   },
	});
}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function fendy_tm_data_images(){
	
	"use strict";
	
	var data			= jQuery('*[data-img-url]');
	
	data.each(function(){
		var element			= jQuery(this);
		var url				= element.data('img-url');
		element.css({backgroundImage: 'url('+url+')'});
	});
}

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function fendy_tm_contact_form(){
	
	"use strict";
	
	jQuery(".contact_form #send_message").on('click', function(){
		
		var name 		= jQuery(".contact_form #name").val();
		var email 		= jQuery(".contact_form #email").val();
		var message 	= jQuery(".contact_form #message").val();
		var subject 	= jQuery(".contact_form #subject").val();
		var success     = jQuery(".contact_form .returnmessage").data('success');
	
		jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields	
		if(name===''||email===''||subject===''||message===''){
			
			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		return false; 
	});
}

// -----------------------------------------------------
// --------------------    TOTOP    --------------------
// -----------------------------------------------------

function fendy_tm_totop(){
	
	"use strict";
	
	jQuery(".fendy_tm_totop").on('click', function(e) {
		e.preventDefault();		
		jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}