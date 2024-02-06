function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, operator, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch(operator) {
        case "+":
            return Math.round(add(num1, num2) * 10000) / 10000;
        case "-":
            return Math.round(subtract(num1, num2) * 10000) / 10000;
        case "*":
            return Math.round(multiply(num1, num2) * 10000) / 10000;
        case "/":
            return Math.round(divide(num1, num2) * 10000) / 10000;
    }
}

function enterNumber(num) {
    if (operator !== '') {
        operators.forEach(btn => btn.classList.remove('selected-operator'));
    }

    if (num === '0' && displayVal === '0') {
        return;
    } else if (displayVal === '0') {
        displayVal = '';
    }

    if (num === '.' && displayVal.includes('.')) {
        return;
    } else if (num === '.' && displayVal === '') {
        displayVal = '0'
    }
    displayVal += num;
    displayBlk.textContent = displayVal;
}

function enterOperator(btn) {
    if (operator !== '' && displayVal === '') {
        operators.forEach(btn => btn.classList.remove('selected-operator'));
        operator = btn.value;
        btn.classList.add('selected-operator');
        return;
    }

    if (num1 !== '') {
        num2 = displayVal;
        displayVal = operate(num1, operator, num2);
        displayBlk.textContent = displayVal;
        num2 = ''
        displayVal = '';
    }

    num1 = (displayVal !== '') ? displayVal : displayBlk.textContent;
    operator = btn.value;
    btn.classList.add('selected-operator');
    displayVal = '';
}

function enterEqual() {
    if (num1 === '' || operator === '') return;
    num2 = (displayVal !== '') ? displayVal : displayBlk.textContent;
    displayVal = operate(num1, operator, num2);
    displayBlk.textContent = displayVal;
    clearVal();
}

function clearVal() {
    num1 = '';
    operator = '';
    num2 = '';
    displayVal = '';
    operators.forEach(btn => btn.classList.remove('selected-operator'));
}

function undo() {
    if (displayVal.length > 1) {
        displayVal = displayVal.slice(0, displayVal.length - 1);
    } else if (displayVal.length == 1) {
        displayVal = '0';
    } else {
        return;
    }
    displayBlk.textContent = displayVal;
}


/////////////////////////////////////////////////////////////////////////////////////////////////


let num1 = '';
let operator = '';
let num2 = '';
let displayVal = '';
const displayBlk = document.querySelector('.display');
const operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');


numbers.forEach(number => number.addEventListener('click', function(){
    enterNumber(number.value);
}));

operators.forEach(btn => btn.addEventListener('click', function(){
    enterOperator(btn);
}));

equal.addEventListener('click', enterEqual);

clear.addEventListener('click', function() {
    clearVal();
    displayBlk.textContent = '0';
});

backspace.addEventListener('click', undo);

document.addEventListener('keydown', function(e) {
    if (e.key.match(/[.0-9]/)) {
        enterNumber(e.key);
    } else if (e.key === '+') {
        enterOperator(document.querySelector('#add'));
    } else if (e.key === '-') {
        enterOperator(document.querySelector('#minus'));
    } else if (e.key === '*') {
        enterOperator(document.querySelector('#multiply'));
    } else if (e.key === '/') {
        enterOperator(document.querySelector('#divide'));
    } else if (e.key === '=' || e.key === 'Enter') {
        enterEqual();
    } else if (e.key === 'c' || e.key === 'C' || e.key === 'Escape') {
        clearVal();
        displayBlk.textContent = '0';
    } else if (e.key === 'Backspace') {
        undo();
    }
});