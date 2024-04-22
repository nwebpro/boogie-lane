// Function to play audio
function playAudio(audioUrl, index, playlist) {
	const audio = new Audio(audioUrl);
	audio.autoplay = true; // Set autoplay to true
	audio.style.display = 'none'; // Hide the audio element
	document.body.appendChild(audio); // Append audio element to the body

	// Play the next track after the current one finishes
	audio.addEventListener('ended', () => {
		const nextIndex = index + 1;
		if (nextIndex < playlist.length) {
			playAudio(
				playlist[nextIndex].preview,
				nextIndex,
				playlist
			);
		}
	});
}

// Function to fetch playlist and play audio
async function fetchAndPlayPlaylist() {
	const url =
		'https://deezerdevs-deezer.p.rapidapi.com/playlist/12327094931';
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
		playAudio(
			playlist.tracks.data[0].preview,
			0,
			playlist.tracks.data
		);
	} catch (error) {
		console.error(error);
	}
}

// Wait for 10 seconds after the website loads, then fetch and play the playlist
window.onload = () => {
	setTimeout(fetchAndPlayPlaylist, 1000);
};