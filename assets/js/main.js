$(function () {
	'use strict';

	let $window = $(window);

	// Function to show the splash screen after 10 seconds
	$window.on('load', function () {
		setTimeout(function () {
			$('.slash_screen_wrapper').fadeOut();
			$('.slash_screen_wrapper').remove();
		}, 1000);
	});

	$window.onload = function () {
		const radioStationsContainer =
			document.getElementById('radio-stations');
		const radioPlayer = document.getElementById('radio-player');

		// Function to fetch radio stations from the API
		async function fetchRadioStations() {
			const response = await fetch('API_ENDPOINT_HERE');
			const data = await response.json();
			return data; // Assuming the API returns an array of radio stations
		}

		// Function to display radio stations on the webpage
		async function displayRadioStations() {
			const radioStations = await fetchRadioStations();
			radioStations.forEach((station) => {
				const stationElement = document.createElement('div');
				stationElement.textContent = station.name;
				stationElement.addEventListener('click', () =>
					playRadioStation(station.streamUrl)
				);
				radioStationsContainer.appendChild(stationElement);
			});
		}

		// Function to play a radio station
		function playRadioStation(streamUrl) {
			radioPlayer.src = streamUrl;
			radioPlayer.play();
		}

		// Display radio stations when the page loads
		displayRadioStations();
	};

	// Swiper Slider
	let heroSwiper = new Swiper('.mySwiper', {
		loop: true,
		effect: 'fade',
		autoplay: {
			delay: 3000,
		},
	});
});
