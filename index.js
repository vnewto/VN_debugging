const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
console.log("messages: ", messages);
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

//hide all messages if person hasn't clicked yet
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    let message = messages[elementIndex];
    console.log("message: ", message);
    message.style.display = 'none';
  }
}

//unsure what this does
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//set up a callback function for what will happen when the submit button is clicked
function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  //increase attempts by one everytime someone guesses
  attempts = attempts + 1;

  //start by hiding all the messages
  hideAllMessages();

  //if the guess is correct, display the "correct" message and hide the submit button and guess box
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  //if the guess is incorrect... if it's too low, show the tooLow message. If it's too high, show the tooHigh message
  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    //show how many attempts are left
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  //If guessed 5 times, disable the submit button and input box
  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  //show the reset button to clear the form
  resetButton.style.display = '';
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages(messages);
  resetButton.style.display = 'none';
}

setup();


submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);


