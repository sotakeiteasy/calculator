const btnClear = document.querySelector('#clearButton');
const btnResult = document.querySelector('#resultButton');
const btnNumber = document.querySelectorAll('.number');
const btnOperator = document.querySelectorAll('.operator');

const display = document.querySelector('#display');


  
function operate(a, oper, b) {
    a = parseInt(a)
    b = parseInt(b)

    console.log('operate')
      if (oper === '+') a += b;
      if (oper === '-') a -= b;
      if (oper === '*') a *= b;
      if (oper === '/') a /= b;
    result = Math.round(a * 10000000) / 10000000;
    console.log(result)
    return Math.min(result, 999999999);
}

console.log(btnNumber);

let displayContent = '';

let numberOne = ''; 
let numberTwo = ''; 
let operator = '';


btnNumber.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const input = event.target.textContent;
        if(operator === '') {
            if(display.textContent === '0' || displayContent === 'ERROR'){
                numberOne = input;
                displayContent = input;
                display.textContent = displayContent;
            }else if(displayContent.length >= 9 || displayContent.length == undefined){

            }else{
                numberOne += input;
                displayContent += input;
                display.textContent = displayContent;
            }
        }else {
            if(display.textContent === '0'){
                numberTwo = input;
                displayContent = input;
                display.textContent = displayContent;
            }else if(displayContent.length >= 9 || displayContent.length == undefined){

            }else{
                numberTwo += input;
                displayContent += input;
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
            operator = ''
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
            display.textContent = displayContent;
            numberOne = displayContent;
            operator = ''
            numberTwo = ''
        };
    }else{
        return;
    }
});


btnClear.addEventListener('click', () => {
    display.textContent = "";
    displayContent = '';
    numberOne = ''
    operator = ''
    numberTwo = ''
});