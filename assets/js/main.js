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

	// Create the audio player
	setTimeout(function () {
		let audioPlayer = document.createElement('audio');
		audioPlayer.src = 'https://nashe1.hostingradio.ru:18000/jazz-128.mp3';
		audioPlayer.autoplay = true;

		// Add 'playing' class to the vinyl image when audio starts playing
		audioPlayer.addEventListener('play', function () {
			const vinylImage = document.querySelector('.vinel_wrap img');
			vinylImage.classList.add('playing');
		});

		// Remove 'playing' class from the vinyl image when audio is paused
		audioPlayer.addEventListener('pause', function () {
			const vinylImage = document.querySelector('.vinel_wrap img');
			vinylImage.classList.remove('playing');
		});

		// Play/Pause button functionality
		const playPauseButton = document.getElementById('playPauseButton');
		playPauseButton.addEventListener('click', function () {
			if (audioPlayer.paused) {
				audioPlayer.play();
			} else {
				audioPlayer.pause();
			}
		});
	}, timeOutValue);
});
