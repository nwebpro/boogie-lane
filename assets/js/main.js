$(function () {
	'use strict';

	let $window = $(window);

	// Function to show the splash screen after 10 seconds
	$window.on('load', function () {
		setTimeout(function () {
			$('.slash_screen_wrapper').fadeOut();
			$('.slash_screen_wrapper').remove();
		}, 5000);
	});
});
