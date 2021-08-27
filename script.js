const timeHeader = document.getElementById("time");
const timeWords = document.getElementById("timeWords");
var ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
];
var tens = [
    "twenty",
    "thirty",
    "fourty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
];

function hourToWord(hour) {
    if (hour > 12) {
        hour -= 12;
    }
    return ones[hour];
}

function minutesToWords(minutes) {
    let min = Number(minutes);
    if (min > 0 && min < 10) {
        return " o " + ones[min];
    } else if (min >= 10 && min < 20) {
        return " " + ones[min];
    } else if (min % 10 == 0) {
        return " " + tens[Math.floor(min / 10) - 2];
    } else {
        return (
            " " +
            tens[Math.floor(min / 10) - 2] +
            "-" +
            ones[Math.floor(min % 10)]
        );
    }
}

function updateTime() {
    var date = new Date();
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var currentTime = `${hours}:${minutes}:${seconds}`;
    timeHeader.textContent = currentTime;
    timeWords.textContent =
        "IT IS " +
        hourToWord(hours) + minutesToWords(minutes);
    setTimeout(updateTime, 1000);
}

updateTime();

const quoteSpan = document.querySelector("#quote");
const authorSpan = document.querySelector("#author");
const quoteButton = document.querySelector(".quoteButton");

const getNewQuote = async () => {
    var url = "https://favqs.com/api/qotd";
    const response = await fetch(url);
    const gotQuote = await response.json();
    if (gotQuote) {
        quoteSpan.textContent = gotQuote.quote.body;
        authorSpan.textContent = '- ' + gotQuote.quote.author;
    }
};

quoteButton.addEventListener("click", function () {
    getNewQuote();
});

getNewQuote();

const colorChangeButton = document.getElementById('colorChangeButton');
const color = document.querySelector('.colorHex');
const colorDiv = document.querySelector('.colorGenerator');

colorChangeButton.addEventListener('click', function() {
    const generatedColor = '#' + [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
    colorDiv.style.backgroundColor = generatedColor;
    color.textContent = generatedColor;
});


const stopwatchButton = document.querySelectorAll(".btn");
const stopwatch = document.getElementById("timer");

var stop = false;

let ms = 0;
let sec = 0;
let min = 0;

function startStop() {
    if (stop) {
        console.log(performance.memory);
        return;
    }
    ms++;
    if (ms == 60) {
        ms = 0;
        sec++;
        if (sec == 60) {
            sec = 0;
            min++;
        }
    }
    displayTimer(min, sec, ms);
    setTimeout(startStop, 10);
}

function resetTimer() {
    ms = 0;
    sec = 0;
    min = 0;
    displayTimer(min, sec, ms);
}

function displayTimer(min, sec, ms) {
    min = ("0" + min).slice(-2);
    sec = ("0" + sec).slice(-2);
    ms = ("0" + ms).slice(-2);
    stopwatch.textContent = `${min}:${sec}:${ms}`;
}

stopwatchButton.forEach(function (button) {
    button.addEventListener("click", function () {
        if (button.id == "start") {
            stop = false;
            startStop();
        }
        if (button.id == "stop") {
            stop = true;
        }
        if (button.id == "reset") {
            resetTimer();
        }
    });
});


let counter = 0;
let increment = 1;

const counterVal = document.querySelector(".counterValue");
const ctrButtons = document.querySelectorAll(".ctrButton");
const variation = document.querySelector("#variation");

variation.addEventListener("input", function () {
  increment = Number(variation.value);
});

ctrButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.id == "increase") {
      counter += increment;
    } else if (button.id == "decrease") {
      counter -= increment;
    } else {
      counter = 0;
    }

    if (counter > 0) {
      counterVal.style.color = "green";
    } else if (counter < 0) {
      counterVal.style.color = "red";
    } else {
      counterVal.style.color = "black";
    }

    counterVal.textContent = counter;
  });
});


// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');


// event listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkDelete);

document.getElementById("todo-input").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) { addTodo(); }
}, false);

// functions
function addTodo(event) {
    // prevents submission
    // Create new items
    if(todoInput.value != "") {
        const newTodo = document.createElement('li');
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        // Mark finished items
        const completedButton = document.createElement('button');
        completedButton.textContent = `Done`;
        completedButton.classList.add("complete-btn")
        todoDiv.appendChild(completedButton);

        // Delete item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = `Delete`;
        deleteButton.classList.add("trash-btn")
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);

        // Clear textbox value after adding
        todoInput.value = "";
    }
    else {
        console.log("Enter something bro");
    }

}

function checkDelete(e) {
    const item = e.target;
    console.log(item);
    // Delete item
    if(item.classList[0] === 'trash-btn') {
        const todoElement = item.parentElement;
        todoElement.classList.add("fall");
        todoElement.addEventListener('transitionend', () => {
            todoElement.remove();
        });

    }
    // Scratch it
    if(item.classList[0] === 'complete-btn') {
        const todoElement = item.parentElement.firstChild;
        todoElement.classList.toggle("completed");
    }

}

