const buttons = document.querySelectorAll('button');
const clickDown = new Audio('sounds/click-down.mp3');
const clickUp = new Audio('sounds/click-up.mp3');
const mute = document.getElementById('muted');
const muteContainer = document.querySelector('.mute');
const fas = document.querySelector('.fas');


// Mute Icon
mute.addEventListener('change', fadeIcon);


// Fade Icon
function fadeIcon() {
    if (mute.checked == true) {
        speaker.classList.add('.fa-volume-mute');
        speaker.classList.remove('.fa-volume-up');
        speaker.style = 'color:rgba(0,0,0,.3);'
        muteContainer.setAttribute('title', 'Sound off')
    }
}

// Button Click Sound
buttons.forEach(a => {
a.addEventListener('mousedown', playClick);
a.addEventListener('mouseup', playClick);
});


// Play Click Sound
function playClick(e) {
    if (mute.checked) return;
    if (e.type == 'mousedown' || e.type == 'keydown') clickDown.play();
    else if (e.type == 'mouseup' || e.type == 'keyup') clickUp.play();
}


// Caclulator Code

const screen = document.querySelector('.screen');
let currentNum = '';
let numbers = [];
let operator = '';
let answer = 0;

// Function to take in numbers
// turn key presses into digits
function logDigit(e) {
    
    // Check if equals was pressed, clears numbers
    if (pressedEquals && !operator) {
        clearNumbers();
        pressedEquals = false;
    }
    
    // Clear highlighted operator on next key press
    removeActiveOperator();
    
    // Include decimal
    if (e.target.value == '.' && currentNum.indexOf('.') >= 0) return;
    
    // Cancel if too long    
    if (screen.offsetWidth >= 170) return showTooLongPopup();
    updateScreen(currentNum);
    
    // turn digits into numbers
    currentNum += e.target.value;
    
    // Display on screen
    if (currentNum == '.') currentNum = '0.';
    updateScreen(currentNum);
}
function updateScreen(text) {
    let screenText = text;
    screen.innerText = screenText;
}
function showTooLongPopup() {
    document.querySelector('.too-long-popup').classList.add('show-popup');
    setTimeout(() => {
        document.querySelector('.too-long-popup').classList.remove('show-popup');
    }, 1000);
}

// Function to take operator
const operatorKeys = document.querySelectorAll('.operator-key');
operatorKeys.forEach(a => a.addEventListener('click', setOperator));

// turn key press into operation
function setOperator(e) {
    if (!currentNum && currentNum != '0' && !numbers.length) return;
    setNumbers();
    
    // Find answer, then set new operator
    if (numbers.length >= 2) operate(e);
    operator = e.target.value;
    
    // Highlight active operator
    removeActiveOperator();
    e.target.classList.add('active-operator');
}
function removeActiveOperator() {
    operatorKeys.forEach(a => a.classList.remove('active-operator'));
}
function setNumbers() {
    if (!currentNum && currentNum != '0') return;
    numbers.push(parseFloat(currentNum));
    currentNum = '';
}
function clearNumbers() {
    numbers = [];
}

// Function to calculate from two numbers and operators
// Add, substract, multiply, divide
document.querySelector('.equals').addEventListener('click', operate);

function add(arr) {
    let x = arr[0];
    let y = arr[1];
    return x + y;
}

function subtract(arr) {
    let x = arr[0];
    let y = arr[1];
    return x - y;
}

function multiply(arr) {
    let x = arr[0];
    let y = arr[1];
    return x * y;
}

function divide(arr) {
    let x = arr[0];
    let y = arr[1];
    return x / y;
}

let divideByZero = 0;
let pressedEquals = false;
