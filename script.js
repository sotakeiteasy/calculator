const btnClear = document.querySelector('#clearButton');
const btnResult = document.querySelector('#resultButton');
const btn = document.querySelectorAll('.button')
const display = document.querySelector('#display');


function splitExpressionUsingMatch(expr) {
    expr = expr.replace(/\s+/g, '');
    return expr.match(/(\d+\.?\d*|[+\-*/])/g);
}
  
function operate(components) {
    let result = parseFloat(components[0]);
    
    for (let i = 1; i < components.length; i += 2) {
      const operator = components[i];
      const nextNumber = parseFloat(components[i + 1]);
  
      if (operator === '+') result += nextNumber;
      if (operator === '-') result -= nextNumber;
      if (operator === '*') result *= nextNumber;
      if (operator === '/') result /= nextNumber;
    }
    return Math.round(result * 10000000) / 10000000;
}


let expression = ''; // Full expression for evaluation
let lastInputType = ''; // Tracks the last type of input: 'number' or 'operator'
let displayContent = '';

btn.forEach(btn => {
    btn.addEventListener('click', (event) => {
        const input = event.target.textContent;
        const hasNumbers = /[0-9]/.test(input); // Checks for digits (0-9)
        const hasOperators = /[+\-*/]/.test(input); // Checks for operators (+, -, *, /)
        const isEqualSign = /=/.test(input); // Checks for the equals sign

        
        if(hasNumbers){
            if(display.textContent === '0'){
                expression = input;
                displayContent = input;
                display.textContent = displayContent;
                lastInputType = 'number';
            }else if(displayContent.length >= 9){
            }else{
                expression += input;
                displayContent += input;
                display.textContent = displayContent;
                lastInputType = 'number';
            }
        } else if (hasOperators) {
            if(lastInputType === 'number') {
                expression += input;
                displayContent = ''
                display.textContent += displayContent;
                lastInputType = 'operator';
            }else if(lastInputType === 'operator'){
                expression = expression.slice(0, -1) + input;
                console.log(expression)
            }else{
                console.log('Invalid input: Cannot start or repeat operator without number');
            }
        } else if(isEqualSign){
            if(lastInputType === 'number'){
                const splitExpression = splitExpressionUsingMatch(expression);
                displayContent = operate(splitExpression);
                expression = operate(splitExpression);
                display.textContent = displayContent
            }else{
                
            }
            
        }
    });
});


btnClear.addEventListener('click', () => {
    display.textContent = "";
    displayContent = '';
    expression = "";
});