
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

const calculatorState = {
    firstValue: null,
    operator: null,
    secondValue: null,
    waitingForSecondOperand: false,
};

const calculate = (n1, operator, n2) => {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (operator === 'add') return num1 + num2;
    if (operator === 'subtract') return num1 - num2;
    if (operator === 'multiply') return num1 * num2;
    if (operator === 'divide') return num1 / num2;

    return n2;
};

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    const key = target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    let displayedNum = display.textContent;

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

    if (!action) {
        if (displayedNum === '0' || calculatorState.waitingForSecondOperand) {
            display.textContent = keyContent;
            calculatorState.waitingForSecondOperand = false;
        } else {
            display.textContent = displayedNum + keyContent;
        }
    }
    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
        }
        if (calculatorState.waitingForSecondOperand) {
            display.textContent = '0.';
            calculatorState.waitingForSecondOperand = false;
        }
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        key.classList.add('is-depressed');

        if (calculatorState.firstValue && calculatorState.operator && !calculatorState.waitingForSecondOperand) {
            const result = calculate(calculatorState.firstValue, calculatorState.operator, displayedNum);
            display.textContent = result;
            calculatorState.firstValue = result;
        } else if (!calculatorState.firstValue) {
            calculatorState.firstValue = displayedNum;
        }

        calculatorState.waitingForSecondOperand = true;
        calculatorState.operator = action;
    }
    if (action === 'calculate') {
        if (calculatorState.firstValue) {
            calculatorState.secondValue = displayedNum;

            const result = calculate(calculatorState.firstValue, calculatorState.operator, calculatorState.secondValue);
            display.textContent = result;

            calculatorState.firstValue = result;
            calculatorState.operator = null;
            calculatorState.secondValue = null;
            calculatorState.waitingForSecondOperand = true;
        }
    }
    if (action === 'clear') {
        display.textContent = '0';
        calculatorState.firstValue = null;
        calculatorState.operator = null;
        calculatorState.secondValue = null;
        calculatorState.waitingForSecondOperand = false;
    }

    console.log(calculatorState);
});