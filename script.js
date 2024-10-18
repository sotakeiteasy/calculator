const btnClear = document.querySelector('#clearButton');
const btnResult = document.querySelector('#resultButton');
const btnNumber = document.querySelectorAll('.number');
const btnOperator = document.querySelectorAll('.operator');
const display = document.querySelector('#display');
  
function operate(a, oper, b) {
    a = parseFloat(a)
    b = parseFloat(b)
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

            // Calculate the number of decimal places allowed
            const decimalPlaces = Math.max(0, 9 - integerPart.length);

            // Round the number to the allowed number of decimal places
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


btnClear.addEventListener('click', () => {
    display.textContent = "";
    displayContent = '';
    numberOne = ''
    operator = ''
    numberTwo = ''
});