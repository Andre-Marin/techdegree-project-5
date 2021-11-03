document.addEventListener('DOMContentLoaded', () => {
  const qwerty = document.getElementById('qwerty');
  const phrase = document.getElementById('phrase');
  let missed = 0;
  const overlay = document.querySelector('.start');
  const characterList = document.querySelector('ul');
  const list = characterList.children;
  let h1 = document.querySelector('.title');
  let button = document.querySelector('.btn__reset');

  overlay.addEventListener('click', (e) => {
    if (e.target.textContent === 'Start Game') {
      overlay.style.display = 'none';
    } else if (e.target.textContent === 'Play Again') {
      location.reload();
    }
  });

  let phrases = [
    "a bunch of fives",
    "daft as a brush",
    "hairy eyeball",
    "mad as a hatter",
    "two in a row"
  ];

//Pick random phrase in given array then returns a new array of each character
  function getRandomPhraseAsArray(arr) {
    let num = Math.floor(Math.random() * arr.length);
    let phrase = arr[num];
    return phrase.split('');
  }

//Takes phrase and creates a list tag for each letter and space. List items are then appended to the ul
  function addPhraseToDisplay(arr) {
    const ul = document.querySelector('#phrase ul');
    for (let i = 0; i<arr.length; i++) {
      const li = document.createElement('li');
      let letter = arr[i];
      if (letter !== ' ') {
        li.innerHTML = letter;
        li.className = 'letter';
        ul.appendChild(li);
      } else {
        li.className = 'space';
        ul.appendChild(li);
      }
    }
    return ul;
  }

//Verify if selected letter is in the phrase and changes displays the correct letter.
  function checkLetter(btn) {
    let guess = null;

    for (let i = 0; i<list.length; i++) {
      if (list[i].className === 'letter') {
        if (btn === list[i].textContent) {
          list[i].className += ' show';
          guess = btn;
        }
      }
    }
    return guess;
  }
//Compares matched letters to total letters in phrase. If all are matched a win overlay is shown
//Each incorrect guess is added to missed. 5 incorrect guesses displays lose overlay
  function checkWin() {
    let letters;
    let correct;

    for (let i = 0; i<list.length; i++) {
      if (list[i].className === 'letter') {
        letters++;
      } else if (list[i].className === 'show') {
        correct++;
      }
    }
    const endResult = {
      win: () => {
        button.textContent = 'Play Again';
        h1.textContent = 'Congratulations!';
        overlay.style.display = 'flex';
        overlay.className = 'win';
      },
      lose: () => {
        button.textContent = 'Play Again';
        h1.textContent = 'You Lost!';
        overlay.style.display = 'flex';
        overlay.className = 'lose';
      }
    };

    if (letters === correct) {
      endResult.win();
    } else if (missed >= 5) {
      endResult.lose();
    }
  }

  qwerty.addEventListener('click', (e) => {
    let letterFound;
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      let guess = button.textContent;
      letterFound = checkLetter(guess);
      button.className = 'chosen';
      button.disabled = true;
    }
    if (letterFound === null) {
      let tries = document.querySelectorAll('.tries img');
      tries[missed].src = 'images/lostHeart.png';
      missed++;
    }
    checkWin();
  });

  let randomPhrase = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(randomPhrase);
});
