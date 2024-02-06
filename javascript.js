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
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

function clearVal() {
    num1 = '';
    operator = '';
    num2 = '';
    displayVal = '';
    operators.forEach(btn => btn.classList.remove('selected-operator'));
}

let num1 = '';
let operator = '';
let num2 = '';
let displayVal = '';
const displayBlk = document.querySelector('.display');
const operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

numbers.forEach(number => number.addEventListener('click', function(){
    if (operator !== '') {
        operators.forEach(btn => btn.classList.remove('selected-operator'));
    }

    if (number.value === '0' && displayVal === '') return;
    displayVal += number.value;
    displayBlk.textContent = displayVal;
}));

operators.forEach(btn => btn.addEventListener('click', function(){
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
}));

equal.addEventListener('click', function(){
    if (num1 === '' || operator === '') return;
    num2 = (displayVal !== '') ? displayVal : displayBlk.textContent;
    displayVal = operate(num1, operator, num2);
    displayBlk.textContent = displayVal;
    clearVal();
});

clear.addEventListener('click', function() {
    clearVal();
    displayBlk.textContent = '0';
});