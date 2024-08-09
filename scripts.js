document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('calc-typed');
    const operationDisplay = document.getElementById('calc-operation');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                currentInput = '';
                operator = '';
                operand1 = '';
                operand2 = '';
                display.textContent = '0';
                operationDisplay.textContent = '';
            } else if (button.id === 'delete') {
                if (currentInput !== '') {
                    currentInput = currentInput.slice(0, -1);
                    display.textContent = currentInput || '0';
                }
                if (operator) {
                    operationDisplay.textContent = `${operand1} ${operator} ${currentInput}`;
                }
            } else if (button.id === 'equals') {
                operand2 = currentInput;
                currentInput = calculate(operand1, operator, operand2);
                display.textContent = currentInput;
                operationDisplay.textContent = `${operand1} ${operator} ${operand2} =`;
                operator = '';
            } else if (button.classList.contains('opt')) {
                if (operator && currentInput) {
                    operand2 = currentInput;
                    operand1 = calculate(operand1, operator, operand2);
                    currentInput = '';
                } else {
                    operand1 = currentInput;
                    currentInput = '';
                }
                operator = value;
                operationDisplay.textContent = `${operand1} ${operator}`;
                display.textContent = '0';
            } else {
                currentInput += value;
                display.textContent = currentInput;
                if (operator) {
                    operationDisplay.textContent = `${operand1} ${operator} ${currentInput}`;
                }
            }
        });
    });

    function calculate(operand1, operator, operand2) {
        let result = 0;
        const num1 = parseFloat(operand1);
        const num2 = parseFloat(operand2);

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }
        return result.toString();
    }
});
