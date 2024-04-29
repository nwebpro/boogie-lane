document.addEventListener('DOMContentLoaded', function () {
	const stepOne = document.getElementById('step_one');
	const stepTwo = document.getElementById('step_two');
	const stepThree = document.getElementById('step_three');

	const nextOneBtn = document.getElementById('next-one');
	const nextTwoBtn = document.getElementById('next-two');
	const submitBtn = document.getElementById('submit');
	const backButtons = document.querySelectorAll('.back_button');

	const nameInput = document.getElementById('name');
	const emailInput = document.getElementById('email');
	const phoneInput = document.getElementById('phone');
	const nidInput = document.getElementById('nid');

	const passwordInput = document.getElementById('password');
	const confirmPasswordInput = document.getElementById('confirmPassword');
	const passwordMismatchError = document.getElementById(
		'passwordMismatchError'
	);

	const progressBar = document.getElementById('progress');

	// Function to check if any of the inputs are empty
	function isStepOneValid() {
		return (
			nameInput.value.trim() !== '' &&
			emailInput.value.trim() !== '' &&
			phoneInput.value.trim() !== '' &&
			nidInput.value.trim() !== ''
		);
	}

	// Function to update progress bar with animation
	function updateProgressBar() {
		const totalSteps = 3;
		const currentStep =
			Array.from(document.querySelectorAll('.step_wrap')).findIndex(
				(step) => step.style.display !== 'none'
			) + 1;
		const progress = (currentStep / totalSteps) * 100;
		progressBar.style.width = `${progress}%`;
	}

	// Function to check if the password and confirm password fields match
	function arePasswordsMatching() {
		const password = passwordInput.value.trim();
		const confirmPassword = confirmPasswordInput.value.trim();
		return password === confirmPassword;
	}

	// Enable/disable continue buttons based on form validity
	function updateContinueButton() {
		if (
			stepOne.style.display !== 'none' &&
			isStepOneValid() &&
			isNIDValid()
		) {
			nextOneBtn.removeAttribute('disabled');
		} else if (
			stepTwo.style.display !== 'none' &&
			areAllCheckboxesCheckedInEachChunk()
		) {
			nextTwoBtn.removeAttribute('disabled');
		} else if (stepThree.style.display !== 'none') {
			const password = passwordInput.value.trim();
			const confirmPassword = confirmPasswordInput.value.trim();
			if (
				arePasswordsMatching() &&
				password.length >= 6 &&
				confirmPassword.length >= 6
			) {
				submitBtn.removeAttribute('disabled');
				passwordMismatchError.style.display = 'none'; // Hide error message if passwords match
			} else {
				submitBtn.setAttribute('disabled', true);
				if (confirmPasswordInput === document.activeElement) {
					passwordMismatchError.style.display = 'block'; // Show error message if passwords do not match and confirmPassword input is focused
				}
			}
		} else {
			nextOneBtn.setAttribute('disabled', true);
			nextTwoBtn.setAttribute('disabled', true);
			submitBtn.setAttribute('disabled', true);
		}
	}

	// Function to check if the NID input has exactly 10 or 14 digits
	function isNIDValid() {
		const nid = nidInput.value.trim();
		const nidLength = nid.length;
		return (nidLength === 10 || nidLength === 14) && /^\d+$/.test(nid);
	}

	// Function to check if all checkboxes are checked in each chunk of questions
	function areAllCheckboxesCheckedInEachChunk() {
		const chunks = document.querySelectorAll('.chunk_of_question');
		for (const chunk of chunks) {
			const checkboxes = chunk.querySelectorAll('input[type="checkbox"]');
			if (!Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
				return false;
			}
		}
		return true;
	}

	// Attach event listeners to inputs for real-time validation
	nameInput.addEventListener('input', updateContinueButton);
	emailInput.addEventListener('input', updateContinueButton);
	phoneInput.addEventListener('input', updateContinueButton);
	nidInput.addEventListener('input', updateContinueButton);

	// Attach event listeners to password and confirm password fields
	passwordInput.addEventListener('input', function () {
		updateContinueButton();
	});

	confirmPasswordInput.addEventListener('input', function () {
		updateContinueButton();
	});

	// Attach event listeners to checkboxes for steps two and three
	const checkboxesStepTwo = document.querySelectorAll(
		'#step_two input[type="checkbox"]'
	);
	checkboxesStepTwo.forEach((checkbox) => {
		checkbox.addEventListener('change', () => {
			updateContinueButton();
			updateProgressBar();
		});
	});

	// Continue buttons functionality
	nextOneBtn.addEventListener('click', function (event) {
		event.preventDefault();
		stepOne.style.display = 'none';
		stepTwo.style.display = 'block';
		updateContinueButton(); // Update button state on step change
		updateProgressBar(); // Update progress bar
	});

	nextTwoBtn.addEventListener('click', function (event) {
		event.preventDefault();
		stepTwo.style.display = 'none';
		stepThree.style.display = 'block';
		updateContinueButton(); // Update button state on step change
		updateProgressBar(); // Update progress bar
	});

	// Back buttons functionality
	backButtons.forEach((button) => {
		button.addEventListener('click', function () {
			if (stepThree.style.display !== 'none') {
				stepThree.style.display = 'none';
				stepTwo.style.display = 'block';
				updateContinueButton(); // Update button state on step change
			} else if (stepTwo.style.display !== 'none') {
				stepTwo.style.display = 'none';
				stepOne.style.display = 'block';
				updateContinueButton(); // Update button state on step change
			}
			updateProgressBar(); // Update progress bar
		});
	});

	// Initial setup
	updateContinueButton();
	updateProgressBar();
});
