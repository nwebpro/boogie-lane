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

	function togglePlay() {
		const audio = document.getElementById('audioPlayer');
		const vinylImage = document.querySelector('.vinel_wrap img');
		if (audio.paused) {
			audio.play();
			vinylImage.classList.add('playing');
		} else {
			audio.pause();
			vinylImage.classList.remove('playing');
		}
	}

	// Event listener to toggle play/pause when the button is clicked
	document
		.getElementById('playPauseButton')
		.addEventListener('click', function () {
			togglePlay();
		});

	// Autoplay after 5 seconds
	setTimeout(function () {
		document
			.getElementById('audioPlayer')
			.setAttribute('autoplay', 'autoplay');
		togglePlay(); // Start playing the audio
	}, timeOutValue);
});
