let audio;
let isPlaying = false;

// Function to play audio
function playAudio(audioUrl, index, playlist) {
	audio = new Audio(audioUrl);
	audio.autoplay = true;
	audio.style.display = 'none';
	document.body.appendChild(audio);

	audio.addEventListener('ended', () => {
		const nextIndex = index + 1;
		if (nextIndex < playlist.length) {
			playAudio(playlist[nextIndex].preview, nextIndex, playlist);
		}
	});

	// Event listener to detect when audio starts playing
	audio.addEventListener('playing', () => {
		isPlaying = true;
		toggleIcon();
	});

	// Event listener to detect when audio pauses
	audio.addEventListener('pause', () => {
		isPlaying = false;
		toggleIcon();
	});
}

// Function to toggle play/pause icon
function toggleIcon() {
	const vinylImage = document.querySelector('.vinel_wrap img');
	if (isPlaying) {
		vinylImage.classList.add('playing');
	} else {
		vinylImage.classList.remove('playing');
	}
}

// Function to pause or play audio
function togglePlayback() {
	if (!audio) {
		return;
	}
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
	toggleIcon();
}

// Function to fetch playlist and play audio
async function fetchAndPlayPlaylist() {
	const url = 'https://deezerdevs-deezer.p.rapidapi.com/playlist/12327094931';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key':
				'5d7e0c62f8msh48153546cbf7716p14f832jsn45ef0ba10273',
			'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
		},
	};

	try {
		const response = await fetch(url, options);
		const playlist = await response.json();

		// Start playing the first track
		playAudio(playlist.tracks.data[0].preview, 0, playlist.tracks.data);
	} catch (error) {
		console.error(error);
	}
}

// Wait for 5 seconds after the website loads, then fetch and play the playlist
window.onload = () => {
	setTimeout(fetchAndPlayPlaylist, 5000);

	// Add event listener to the play/pause button
	const playPauseButton = document.getElementById('playPauseButton');
	if (playPauseButton) {
		playPauseButton.addEventListener('click', togglePlayback);
	}
};
