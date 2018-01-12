window.onload = function () {
    init();
};

var numCards = 3;
var numCards_hard = 6;
var gameOver = false;
var mode = 1;   //1=easy 2=hard 3=nightmare
var colors = [];
var count = 5;
var pickedColor;
var id;
var bg;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");
var resetDisplay = document.querySelector("#reset span");

function init() {
    initCards();
    if (mode == 1) {
        reset();
    }
    else if (mode == 2) {
        resetHard();
    }
    else if (mode == 3) {
        resetNightmare();
    }
}
function backgroungChange() {
    var blink;
    if (count >= 0) {
        body.style.backgroundColor = "white";
        blink = setTimeout(function () { body.style.backgroundColor = "#232323"; }, 50);
    }
}

function initCards() {
    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function () {
            if (gameOver) {
                return;
            }
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                clearInterval(id);
                clearInterval(bg);
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                gameOver = true;
            }
            else if (clickedColor !== pickedColor && mode != 3) {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
            else {
                this.style.opacity = 0;
            }
        });
    }
}
function reset() {
    clearInterval(bg);
    hardButton.style.backgroundColor = 'white';
    hardButton.style.color = 'black';
    nightmareButton.style.backgroundColor = 'white';
    nightmareButton.style.color = 'black';
    easyButton.style.backgroundColor = 'steelblue';
    easyButton.style.color = 'white';
    //back to easy mode
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

function resetHard() {
    clearInterval(bg);
    nightmareButton.style.backgroundColor = 'white';
    nightmareButton.style.color = 'black'
    easyButton.style.backgroundColor = 'white';
    easyButton.style.color = 'black';
    hardButton.style.backgroundColor = 'steelblue';
    hardButton.style.color = 'white';
    //hard mode
    gameOver = false;
    colors = generateRandomColors(numCards_hard);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

function resetNightmare() {
    clearInterval(bg);
    clearInterval(id);
    count = 5;
    id = setInterval(countDown, 1000);
    bg = setInterval(backgroungChange, 1000);
    hardButton.style.backgroundColor = 'white';
    hardButton.style.color = 'black';
    easyButton.style.backgroundColor = 'white';
    easyButton.style.color = 'black';
    nightmareButton.style.backgroundColor = 'steelblue';
    nightmareButton.style.color = 'white';
    //nightmare mode
    gameOver = false;
    colors = generateRandomColors(numCards_hard);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

function countDown() {
    if (mode == 3) {
        messageDisplay.textContent = "What's the Color? " + count;
        count = count - 1;
        if (count == -1) {
            messageDisplay.textContent = "Timeout!";
            resetDisplay.textContent = "Play Again"
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            gameOver = true;
            count = 5;
            clearInterval(id);
            clearInterval(bg);
        }
    }
}

resetButton.addEventListener("click", function () {
    if (mode == 1)
        reset();
    else if (mode == 2)
        resetHard();
    else if (mode==3)
        resetNightmare();
})

easyButton.addEventListener("click", function () {
    mode = 1;
    reset();
})
hardButton.addEventListener("click", function () {
    mode = 2;
    resetHard();
})
nightmareButton.addEventListener("click", function () {
    mode = 3;
    resetNightmare();
})



function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
