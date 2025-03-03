let display = document.getElementById('display');
        let currentInput = '';
        let operator = null;
        let firstOperand = null;
        let shouldResetDisplay = false;

        function appendDoubleZero() {
            if (shouldResetDisplay) {
                currentInput = '';
                shouldResetDisplay = false;
            }
            if (currentInput === '0') {
                currentInput = '0'; 
            } else {
                currentInput += '00'; 
            }
            if (operator && firstOperand !== null) {
                updateDisplay(`${firstOperand} ${operator} ${currentInput}`);
            } else {
                updateDisplay(currentInput);
            }
        }


        function appendNumber(number) {
            if (shouldResetDisplay) {
                currentInput = '';
                shouldResetDisplay = false;
            }
            currentInput += number;
            updateDisplay(currentInput);
        }
        
        function setOperator(op) {
            if (currentInput === '' && operator !== null) {
                currentInput = currentInput.slice(0, -1) + op;
            } else {
                currentInput += ` ${op} `;
            }
            updateDisplay(currentInput);
            shouldResetDisplay = false;
        }
        
        function calculateResult() {
            try {
                let result = new Function('return ' + currentInput)();
                updateDisplay(`${currentInput} = ${result}`);
                currentInput = result.toString();
                shouldResetDisplay = true;
            } catch (error) {
                updateDisplay("Error");
                currentInput = "";
            }
        }
        

        function clearDisplay() {
            currentInput = '';
            operator = null;
            firstOperand = null;
            shouldResetDisplay = false;
            updateDisplay(0);
        }

        function updateDisplay(value) {
            display.textContent = value;
        }

        function operate(op, a, b) {
            switch (op) {
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/': return a / b;
                default: return b;
            }
        }

        function calculateSquare() {
            if (currentInput !== '') {
                let number = parseFloat(currentInput);
                let result = number * number;
                updateDisplay(`${number}² = ${result}`);
                currentInput = result.toString();
                shouldResetDisplay = true;
            }
        }

        function calculateSquareRoot() {
            if (currentInput !== '') {
                let number = parseFloat(currentInput);
                if (number >= 0) {
                    let result = Math.sqrt(number);
                    updateDisplay(`√${number} = ${result}`);
                    currentInput = result.toString();
                    shouldResetDisplay = true;
                } else {
                    updateDisplay('Error');
                }
            }
        }

        function deleteLastDigit() {
            if (currentInput.length > 0) {
                currentInput = currentInput.slice(0, -1);
                if (operator && firstOperand !== null) {
                    updateDisplay(`${firstOperand} ${operator} ${currentInput}`);
                } else {
                    updateDisplay(currentInput);
                }
            }
        }

        function appendDecimal() {
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay(currentInput);
            }
        }

        function calculatePercentage() {
            if (currentInput !== '') {
                let number = parseFloat(currentInput);
                let result = number / 100;
                updateDisplay(`${number}% = ${result}`);
                currentInput = result.toString();
                shouldResetDisplay = true;
            }
        }

        function factorialFunction() {
            if (currentInput === '') return;

            let num = parseFloat(currentInput);
            let result = factorial(num);
            updateDisplay(`${num}! = ${result}`);
            currentInput = result.toString();
            expression = [];
            shouldResetDisplay = true;
        }
        
        function factorial(n) {
            if (n === 0 || n === 1) return 1;
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        }
        

        function powerFunction() {
            if (currentInput !== '') {
                currentInput += ' ^ ';
                updateDisplay(currentInput);
            }
        }
        
        function calculateResult() {
            try {
                if (currentInput.includes('^')) {
                    let parts = currentInput.split(' ^ ');
                    if (parts.length === 2 && parts[1] !== '') {
                        let base = parseFloat(parts[0]);
                        let exponent = parseFloat(parts[1]);
                        let result = Math.pow(base, exponent);
                        updateDisplay(`${base}^${exponent} = ${result}`);
                        currentInput = result.toString();
                        return;
                    }
                }
                let result = new Function('return ' + currentInput)();
                updateDisplay(`${currentInput} = ${result}`);
                currentInput = result.toString();
            } catch (error) {
                updateDisplay("Error");
                currentInput = "";
            }
        }
        


// Scientific Functions (Fixed and Improved)
let isParenthesisOpen = false;

// Add Trigonometric or Logarithmic Functions
function addFunction(func) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += func;
    updateDisplay(currentInput);
}

// Add Constants (π or e)
function addConstant(constant) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    const value = constant === 'π' ? 'Math.PI' : 'Math.E';
    currentInput += value;
    updateDisplay(currentInput);
}

// Add Parenthesis (Open or Close)
function addParenthesis() {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    currentInput += isParenthesisOpen ? ')' : '(';
    isParenthesisOpen = !isParenthesisOpen;
    updateDisplay(currentInput);
}

// Update calculateResult Function to Handle Scientific Operations
function calculateResult() {
    try {
        let expression = currentInput
            .replace(/π/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
            .replace(/\^/g, '**') 
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(');

        // Handle trigonometric functions in degrees
        expression = expression.replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        expression = expression.replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        expression = expression.replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');

        // Evaluate the Expression
        let result = eval(expression);
        result = parseFloat(result.toFixed(10)); 
        updateDisplay(result.toString().length > 15 ? result.toExponential(6) : result);
        
        currentInput = result.toString();
        shouldResetDisplay = true;
    } catch (error) {
        updateDisplay("Error");
        currentInput = "";
    }
}

function addParenthesis(parenthesis) {
    currentInput += parenthesis;
    updateDisplay(currentInput);
}
