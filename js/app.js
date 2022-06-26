import {dictionary} from './dictionary.js';

const one = 1;
const five = 5;
const twoHundredAndFifty = 250;
const numberOfGuesses = 6;
let nextLetter = 0;
let currentGuess = [];
let guessesRemaining = numberOfGuesses;
let rightGuessString = dictionary[Math.floor(Math.random() * dictionary.length)];
console.log(rightGuessString);

function start() {
    const board = document.querySelector('#game');

    for (let i = 0; i < numberOfGuesses; i++) {
        let row = document.createElement('div');
        row.className = 'letter-row';

        for (let j = 0; j < five; j++) {
            let box = document.createElement('div');
            box.className = 'letter-box';
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}

const check = document.querySelector('#check'),
    reset = document.querySelector('#reset');

check.addEventListener('click', () => {
    checkGuess();
});

reset.addEventListener('click', () => {
    window.location.reload();
});

start();

document.addEventListener('keyup', (e) => {
    if (guessesRemaining === 0) {
        return;
    }

    let btn = String(e.key);
    if (btn === 'Backspace' && nextLetter !== 0) {
        deleteLetter();
        return;
    }
    
    if (btn === 'Enter') {
        checkGuess();
        return;
    }

    let found = btn.match(/[А-Яа-яЁёЇїІіЄєҐґ']/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(btn);
    }
});

function insertLetter(btn) {
    if (nextLetter === five) {
        return;
    }
    btn = btn.toLowerCase();

    let row = document.getElementsByClassName('letter-row')[numberOfGuesses - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = btn;
    box.classList.add('filled-box');
    currentGuess.push(btn);
    nextLetter += 1;
}

function colorBox(letter, color) {
    for (const elem of document.getElementsByClassName('keyboard-button')) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === 'green') {
                return;
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return;
            }

            elem.style.backgroundColor = color;
            break;
        }
    }
}

function deleteLetter() {
    let row = document.getElementsByClassName('letter-row')[numberOfGuesses - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = '';
    box.classList.remove('filled-box');
    currentGuess.pop();
    nextLetter -= 1;
}

function checkGuess() {
    let row = document.getElementsByClassName('letter-row')[numberOfGuesses - guessesRemaining];
    let guessString = '';
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length !== five) {
        alert('Not enough letters!');
        return;
    }

    if (!dictionary.includes(guessString)) {
        alert('Word not in list!');
        return;
    }

    for (let i = 0; i < five; i++) {
        let letterColor = '';
        let box = row.children[i];
        let letter = currentGuess[i];

        let letterPosition = rightGuess.indexOf(currentGuess[i]);
        if (letterPosition === -one) {
            letterColor = 'grey';
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green';
            } else {
                letterColor = 'yellow';
            }

            rightGuess[letterPosition] = '#';
        }

        let delay = twoHundredAndFifty * i;
        setTimeout(() => {
            box.style.backgroundColor = letterColor;
            colorBox(letter, letterColor);
        }, delay);
    }

    if (guessString === rightGuessString) {
        alert('Congratulation! You won');
        guessesRemaining = 0;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert('Game over!');
            alert(`The right word was: "${rightGuessString}"`);
        }
    }
}