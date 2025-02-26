const result = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');
const historyList = document.getElementById('history-list');
const clearHistoryButton = document.getElementById('clear-history');
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const body = document.body;

let history = [];
let isRadians = true; // Default to radians

// Load history from localStorage
if (localStorage.getItem('calculatorHistory')) {
    history = JSON.parse(localStorage.getItem('calculatorHistory'));
    updateHistory();
}

// Calculator Logic
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            result.value = '';
        } else if (value === 'DEL') {
            result.value = result.value.slice(0, -1);
        } else if (value === '=') {
            try {
                const expression = result.value;
                const answer = evaluateExpression(expression);
                result.value = answer;
                addToHistory(`${expression} = ${answer}`);
            } catch (error) {
                result.value = 'Error';
            }
        } else if (value === 'sqrt') {
            result.value = Math.sqrt(eval(result.value));
        } else if (value === '^') {
            result.value += '**';
        } else if (value === 'sin') {
            result.value = isRadians ? Math.sin(eval(result.value)) : Math.sin((eval(result.value) * Math.PI) / 180);
        } else if (value === 'cos') {
            result.value = isRadians ? Math.cos(eval(result.value)) : Math.cos((eval(result.value) * Math.PI) / 180);
        } else if (value === 'tan') {
            result.value = isRadians ? Math.tan(eval(result.value)) : Math.tan((eval(result.value) * Math.PI) / 180);
        } else if (value === 'log') {
            result.value = Math.log10(eval(result.value));
        } else if (value === 'ln') {
            result.value = Math.log(eval(result.value));
        } else if (value === '!') {
            result.value = factorial(eval(result.value));
        } else if (value === '%') {
            result.value = eval(result.value) / 100;
        } else if (value === 'exp') {
            result.value = Math.exp(eval(result.value));
        } else if (value === 'Rad') {
            isRadians = true;
        } else if (value === 'Deg') {
            isRadians = false;
        } else if (value === 'π') {
            result.value += Math.PI;
        } else if (value === 'e') {
            result.value += Math.E;
        } else if (value === 'Ans') {
            result.value += history[history.length - 1]?.split('=')[1].trim() || '';
        } else if (value === 'x²') {
            result.value = Math.pow(eval(result.value), 2);
        } else {
            result.value += value;
        }
    });
});

// Evaluate Expression
function evaluateExpression(expression) {
    expression = expression.replace(/\^/g, '**');
    return eval(expression);
}

// Factorial Function
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Add to History
function addToHistory(entry) {
    history.push(entry);
    if (history.length > 10) history.shift(); // Keep only the last 10 entries
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
    updateHistory();
}

// Update History Display
function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Clear History
clearHistoryButton.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('calculatorHistory');
    updateHistory();
});

// Dark/Light Mode Toggle
themeToggle.addEventListener('change', () => {
    body.classList.toggle('light-mode');
    themeLabel.textContent = body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode';
});
