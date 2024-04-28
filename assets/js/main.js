$(function () {
	'use strict';

	// Function to show the splash screen after 10 seconds
	setTimeout(function () {
		$('.slash_screen_wrapper').fadeOut(400, function () {
			$(this).remove();
			$('main').fadeIn(400); // Show the main content after fading out the splash screen
		});
	}, 5000);

	// Swiper Slider
	let heroSwiper = new Swiper('.mySwiper', {
		loop: true,
		effect: 'fade',
		autoplay: {
			delay: 4000,
		},
	});
});
