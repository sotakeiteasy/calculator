const btnClear = document.querySelector('#clearButton');
const btnResult = document.querySelector('#resultButton');
const btnNumber = document.querySelectorAll('.number');
const btnOperator = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
const btnDecimal = document.querySelector("#decimal");
const btnBack = document.querySelector("#back");
const btnSign = document.querySelector("#sign");

function operate(a, oper, b) {
    console.log(a)
    a = parseFloat(a)
    b = parseFloat(b)
    console.log(a)

      if (oper === '+') a += b;
      if (oper === '-') a -= b;
      if (oper === '*') a *= b;
      if (oper === '/') a /= b;

    result = Math.round(a * 100000) / 100000;
    return Math.min(result, 999999999);
}

let displayContent = ''; numberOne = ''; numberTwo = ''; operator = '';

btnNumber.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const input = event.target.textContent;
        if(operator === '') {
            if(display.textContent === '0' || displayContent === 'ERROR'){
                numberOne = input;
                displayContent = input;
                display.textContent = displayContent;
            }else if(displayContent.length >= 9){

            }else{
                numberOne += input;
                displayContent += input;
                display.textContent = displayContent;
            }
        }else {
            if(displayContent === '0'){
                numberTwo = input;
                displayContent = input;
                display.textContent = displayContent;
            }else if(displayContent.length >= 9){

            }else{
                numberTwo += input;
                displayContent = numberTwo;
                display.textContent = displayContent;
            }
        }
    })
});


btnOperator.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const input = event.target.textContent;
        if(numberTwo === '' && operator === '') {
            operator = input;
            displayContent = '';
            display.textContent += displayContent;
        }else if(numberTwo !== '' && operator !== ''){
            displayContent = operate(numberOne, operator, numberTwo);
            display.textContent = displayContent;
            numberOne = displayContent;
            operator = input
            numberTwo = ''
        }else if(numberTwo === '' && operator !== ''){
            operator = input;

        }else{
            console.log('Invalid input: Cannot start or repeat operator without number');
        };
    });
});

btnResult.addEventListener('click', () => {
    if(numberOne !== '' && numberTwo !== '' && operator !== ''){
        if(operator === '/' && numberTwo === '0'){
            displayContent = "ERROR";
            numberOne = ''
            operator = ''
            numberTwo = ''
            display.textContent = displayContent
        }else{
            displayContent = operate(numberOne, operator, numberTwo);

            const numStr = displayContent.toString();
            const [integerPart] = numStr.split('.');

            const decimalPlaces = Math.max(0, 9 - integerPart.length);

            const roundedNumber = displayContent.toFixed(decimalPlaces);

            displayContent = parseFloat(roundedNumber).toString(); // Remove any trailing zeros

            display.textContent = displayContent;
            numberOne = displayContent;
            operator = ''
            numberTwo = ''
        };
    }else{
        return;
    }
});

btnDecimal.addEventListener('click', () => {
    if(!displayContent.includes('.')){
        if(numberTwo === '' && numberOne !== '' && operator === ''){
            numberOne += '.'
            displayContent = numberOne;
            display.textContent = displayContent;
        }else if(numberTwo !== ''){
            numberTwo += '.'
            displayContent = numberTwo;
            display.textContent = displayContent;
        }
    }
})

btnBack.addEventListener('click', () => {
        if(numberTwo === '' && operator === ''){
            numberOne = numberOne.slice(0, -1)
            displayContent = displayContent.slice(0, -1)
            display.textContent = displayContent;
        }else if(numberTwo === '' && operator !== ''){
            return
        }else if(numberOne === '0'){
            return '0'
        }else if(numberTwo !== ''){
            numberTwo = numberTwo.slice(0, -1)
            displayContent = displayContent.slice(0, -1);
            display.textContent = displayContent;
        }
});

btnClear.addEventListener('click', () => {
    display.textContent = "";
    displayContent = '';
    numberOne = ''
    operator = ''
    numberTwo = ''
});

btnSign.addEventListener('click', () => {
    if(numberTwo === ''){
        numberOne *= -1
        displayContent = numberOne;
        display.textContent = displayContent;
    }else if(numberTwo !== ''){
        numberTwo *= -1
        displayContent = numberTwo;
        display.textContent = displayContent;
    }else{

    }
});




const keyMap = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    'Backspace': 'back',
    '-': 'subtract',
    '+': 'add',
    '*': 'multiply',
    '/': 'divide',
    '=': 'resultButton',
    'Enter': 'resultButton',
    '.': 'decimal',
    'Escape': 'clearButton',
    'Insert': 'sign'

};

document.addEventListener('keydown', function(event) {
    const buttonId = keyMap[event.key];
    if (buttonId) {
        document.querySelector(`#${buttonId}`).click();
    }
});

// Event delegation for button clicks
document.addEventListener('click', function(event) {
    if (event.target.matches('button')) {
        // Handle button click here
        console.log(`Button ${event.target.id} clicked`);
    }
});