import slick from './slick.js';

let slides = [],
	heroImages = [],
	i = 0,
	timeout,
	slickCarouselIsSet = false,
	windowWidth = $(window).innerWidth();


$(window).resize(function(){
	windowWidth = $(window).innerWidth();
});

function setHeroCarousel() {
	//HERO CAROUSEL - slick/custom
	if( windowWidth < 996 ) {
		//Set up slick carousel if on smaller devices
	    if(!slickCarouselIsSet) {
			if($('.c-herohotspot-carousel').parents('main').find('.c-heroimage-carousel').length > 0) {
				$('.c-herohotspot-carousel').slick({
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  dots: true,
				  centerMode: true,
				  pauseOnHover: false,
				  asNavFor: '.c-heroimage-carousel',
				  responsive: [
				    {
				      breakpoint: 768,
				      settings: {
				  		centerMode: false
				      }
				    }
				  ]
				});
			} else {
				$('.c-herohotspot-carousel').slick({
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  dots: true,
				  centerMode: true,
				  pauseOnHover: false,
				  responsive: [
				    {
				      breakpoint: 768,
				      settings: {
				  		centerMode: false
				      }
				    }
				  ]
				});
			}
			slickCarouselIsSet = true;
			heroCarouselDesktop(slickCarouselIsSet);
		}
	} else { 
		//Destroy slick carousel and intitialise custom desktop animation
		if (slickCarouselIsSet) {
			$('.c-herohotspot-carousel').slick('unslick');
			slickCarouselIsSet = false;
		}
		heroCarouselDesktop(slickCarouselIsSet);
	}
}
setHeroCarousel();
$(window).resize(function(){
	setHeroCarousel();
});

function heroCarouselDesktop(isSet) {
	let totalSlides;

	$('.c-herohotspot-carousel__item').each(function() {
		slides.push($(this));
	});

	totalSlides = slides.length;

	$('.c-heroimage-carousel__image').each(function() {
		heroImages.push($(this));
	});

	if (isSet) {
		clearTimeout(timeout);
		$('.c-herohotspot-carousel__item').unbind();
	} else {
		$(slides[0]).addClass('c-herohotspot-carousel__item--active');
		$(heroImages[0]).addClass('c-heroimage-carousel__image--active');

		autoplay();

		$('.c-herohotspot-carousel__item').on('mouseenter focus', function(){
			clearTimeout(timeout);
			i = $(this).index();
			$(slides).each(function(){$(this).removeClass('c-herohotspot-carousel__item--active')});
		    $(this).addClass('c-herohotspot-carousel__item--active');

			$(heroImages).each(function(){$(this).removeClass('c-heroimage-carousel__image--active')});
		    $(heroImages[i]).addClass('c-heroimage-carousel__image--active');
		}).on('mouseleave', function(){
			autoplay();
		});
	}

	function autoplay() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (i > totalSlides - 2) {
				i = 0;
			} else {
				i++;
			}

		    $(slides).each(function(){$(this).removeClass('c-herohotspot-carousel__item--active')});
		    $(slides[i]).addClass('c-herohotspot-carousel__item--active');

		    $(heroImages).each(function(){$(this).removeClass('c-heroimage-carousel__image--active')});
		    $(heroImages[i]).addClass('c-heroimage-carousel__image--active');

			autoplay();
	    }, 4000);
	}
}
