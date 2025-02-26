let memory = 0;

function appendToDisplay(value) {
  const display = document.getElementById('display');
  display.value += value;
}

function clearDisplay() {
  const display = document.getElementById('display');
  display.value = '';
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  const display = document.getElementById('display');
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = 'Error';
  }
}

// Advanced Math Functions
function factorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Memory Functions
function memoryStore() {
  const display = document.getElementById('display');
  memory = parseFloat(display.value);
}

function memoryRecall() {
  const display = document.getElementById('display');
  display.value = memory;
}

function memoryClear() {
  memory = 0;
}

function memoryAdd() {
  const display = document.getElementById('display');
  memory += parseFloat(display.value);
}

// Unit Conversions
function convertUnit(type) {
  const display = document.getElementById('display');
  let value = parseFloat(display.value);
  switch (type) {
    case 'degToRad':
      display.value = (value * Math.PI / 180).toFixed(4);
      break;
    case 'radToDeg':
      display.value = (value * 180 / Math.PI).toFixed(4);
      break;
    case 'celsiusToFahrenheit':
      display.value = ((value * 9/5) + 32).toFixed(2);
      break;
    case 'fahrenheitToCelsius':
      display.value = ((value - 32) * 5/9).toFixed(2);
      break;
  }
}
