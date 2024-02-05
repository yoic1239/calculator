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

let num1, operator, num2;
let displayVal = '';
const displayBlk = document.querySelector('.display');
const operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.numbers');
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clear');

numbers.forEach(number => number.addEventListener('click', function(){
    if (number.value === '0' && displayVal === '') return;
    displayVal += number.value;
    displayBlk.textContent = displayVal;
}));

operators.forEach(btn => btn.addEventListener('click', function(){
    num1 = (displayVal !== '') ? displayVal : displayBlk.textContent;
    operator = btn.value;
    displayVal = '';
}));

equal.addEventListener('click', function(){
    num2 = displayVal;
    displayVal = operate(num1, operator, num2);
    displayBlk.textContent = displayVal;
    displayVal = '';
});

clear.addEventListener('click', function() {
    displayVal = '';
    displayBlk.textContent = '0';
});