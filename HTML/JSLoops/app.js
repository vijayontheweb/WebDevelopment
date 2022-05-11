let maxNumber = parseInt(prompt('Enter the max number'));
while (!maxNumber) {
    maxNumber = parseInt(prompt('Invalid max number.Enter again?'));
}
let randNumber = Math.floor(Math.random() * maxNumber) + 1;
console.log(randNumber);
let guessNumberStr = prompt('Enter your guess?');

//loop while guess number is too low or high
//exit if guess number matches random number or quit

while (true) {
    if (guessNumberStr == 'Q') {
        console.log('Ok..Quitting!');
        break;
    }
    while (!parseInt(guessNumberStr)) {
        guessNumberStr = prompt('Invalid guess number.Enter again?');
    }
    let guessNumber = parseInt(guessNumberStr);
    if (guessNumber == randNumber) {
        console.log('Yeah..You got it!');
        break;
    } else if (guessNumber < randNumber) {
        guessNumberStr = prompt('Too Low. Guess again?');
    } else if (guessNumber > randNumber) {
        guessNumberStr = prompt('Too High. Guess again?');
    }
}

