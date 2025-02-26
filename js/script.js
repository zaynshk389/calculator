const result = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === 'C') {
            result.value = '';
        } else if (value === 'DEL') {
            result.value = result.value.slice(0, -1);
        } else if (value === '=') {
            try {
                result.value = eval(result.value);
            } catch (error) {
                result.value = 'Error';
            }
        } else {
            result.value += value;
        }
    });
});
