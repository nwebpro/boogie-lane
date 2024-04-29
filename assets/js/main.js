$(function () {
	'use strict';

	const timeOutValue = 5000;

	// Function to show the splash screen after 10 seconds
	setTimeout(function () {
		$('.slash_screen_wrapper').fadeOut(400, function () {
			$(this).remove();
			$('main').fadeIn(400);
		});
	}, timeOutValue);

	// Swiper Slider
	let heroSwiper = new Swiper('.mySwiper', {
		loop: true,
		effect: 'fade',
		autoplay: {
			delay: 4000,
		},
	});

	setTimeout(function () {
		let audioPlayer = $('<audio>', {
			src: 'https://nashe1.hostingradio.ru:18000/jazz-128.mp3',
			autoplay: true,
			on: {
				play: function () {
					$('.vinel_wrap img').addClass('playing');
				},
				pause: function () {
					$('.vinel_wrap img').removeClass('playing');
				},
			},
		});

		// Play/Pause button functionality
		$('#playPauseButton').on('click', function () {
			if (audioPlayer.prop('paused')) {
				audioPlayer.trigger('play');
			} else {
				audioPlayer.trigger('pause');
			}
		});
	}, 5000);
});
