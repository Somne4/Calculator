let bufferValue = '';
let rvtValue = '';
const signs = ['+', '-', '*', '/'];
let k = 1;
let beforeDotValue = '';
let afterDotValue = '';
let val = '';
let currentValue = '';
let flagDot = false;
let flagSign = false;
const rvtEnabled = document.querySelector('.button-success');
const calcWindow = document.querySelector('.calculateWindow');
const nums = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9'];

//Обработка события клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.key in nums) {
        event.preventDefault();
        insert(event.key)
    }
    switch(event.key) {
        case '.':
            insert('.');
            break;
        case '+':
            insert('+');
            break;
        case '-':
            insert('-');
            break;
        case '*':
            insert('*');
            break;
        case '/':
            insert('/');
            break;
        case '(':
            insert('(');
            break;
        case ')':
            insert(')');
            break;
        case 'Backspace':
            insert('<-');
            break;
        case 'c':
        case 'C':
            clean();
            break;
        case 'a':
        case 'A':
            allClean();
            break;
        case 'r':
        case 'R':
            revert();
            break;
        case '=':
        case 'Enter':
            equal();
            break;
        default:
            break
    }
});

//Ввод символов и их отображение на экране
function insert(key) {
    //Обработка ввода символа скобки
    if (key === '(' || key === ')') {
        calcWindow.textContent += key;
        flagSign = false;
    }

    //Обработка ввода знаков операции
    if (signs.includes(key) && !flagSign) {
        calcWindow.textContent += key;
        beforeDotValue = '';
        afterDotValue = '';
        flagDot = false;
        flagSign = true;
    }

    //Ограничение на количество ввода знаков перед запятой < 12
    if (key >= 0 && !flagDot && beforeDotValue.length < 12) {
        beforeDotValue += key;
        k += 1;
        calcWindow.textContent += key;
        flagSign = false;
    }

    //Обработка ввода символа точки
    else if (key === '.') {
        if (!beforeDotValue.includes('.')) {
            if (calcWindow.textContent.length === 0) {
                calcWindow.textContent = '0.';
                beforeDotValue = '0.';
            }
            else {
                calcWindow.textContent += key;
                beforeDotValue += key;
            }
        }
        flagDot = true;
        flagSign = true;
    }

    //Ограничение на количество ввода знаков после запятой < 8
    if (flagDot && afterDotValue.length < 8 && key >= 0) {
        afterDotValue += key;
        calcWindow.textContent += key;
        flagSign = false;
    }

    //Операция <-
    if (key === '<-') {
        val = calcWindow.textContent;
        if (signs.includes(val.slice(-1))) {
            flagSign = false;
        }
        if (val.slice(-1) === '.') {
            flagDot = false;
            flagSign = false;
            beforeDotValue = beforeDotValue.substring(0, beforeDotValue.length - 1);
        }
        if (val.slice(-1) >= 0) {
            if (beforeDotValue.includes('.')) {
                afterDotValue = afterDotValue.substring(0, afterDotValue.length - 1);
            } else {
                beforeDotValue = beforeDotValue.substring(0, beforeDotValue.length - 1);
            }
        }
        calcWindow.textContent = val.substring(0, val.length - 1);
    }

    currentValue = beforeDotValue + afterDotValue;

    //Операция +/-
    if (key === '+/-') {
        val = calcWindow.textContent;
        if (val) {
            let posValue = val.lastIndexOf(currentValue);
            let signBeforeValue = val.charAt(posValue - 1);
            if (!flagSign && currentValue.slice(-1) !== '.') {
                switch (signBeforeValue) {
                    case '':
                        val = -val;
                        break;
                    case '+': {
                        val = val.substring(0, posValue - 1);
                        val += "-" + currentValue;
                    }
                        break;
                    case '-': {
                        val = val.substring(0, posValue - 1);
                        if (nums.includes(val.slice(-1)))
                        {
                            val += "+" + currentValue;
                        }
                        else if (val === '') {
                            val = currentValue;
                        }
                        else {
                            val += currentValue;
                        }
                    }
                        break;
                    case '*':
                    case '/':
                        val = val.substring(0, posValue) + (-1) * currentValue;
                        break;
                }
            }
            calcWindow.textContent = val;
        }
    }
 }

function calculate(value) {
    return String(eval(value));
 }

function equal() { //Операция "=" и активирование кнопки "Rvt"
    rvtValue = calcWindow.textContent;
    if (rvtValue) {
        try {
            let equalValue = calculate(rvtValue);
            if (equalValue.includes('.')) {
                let splitString = equalValue.split('.');
                while (splitString[1].length > 8 || splitString[1].slice(-1) === '0') {
                    splitString[1] = splitString[1].substring(0, splitString[1].length - 1);
                }
                equalValue = splitString.join('.');
            }
            calcWindow.textContent = equalValue;
            rvtEnabled.removeAttribute('disabled');
        }
        catch (e) {
            alert("Ошибка вычисления: " + e.textContent);
            clean();
        }
    }
    return rvtValue;
}

function revert() { //При нажатии на кнопку "Rvt" выводит на экран последнее выражение
    calcWindow.textContent = rvtValue;
    rvtEnabled.setAttribute('disabled', true);
}

function clean() { //При нажатии на кнопку "C" удаляет выражение
    calcWindow.textContent = '';
    k = 1;
    beforeDotValue = '';
    afterDotValue = '';
    currentValue = '';
    flagDot = false;
    flagSign = false;
}

function allClean() { // При нажатии на кнопку "AC" очищает все данные с экрана и из памяти.
    rvtValue = '';
    bufferValue = '';
    currentValue = '';
    afterDotValue = '';
    beforeDotValue = '';
    calcWindow.textContent = '';
    rvtEnabled.setAttribute('disabled', true);
    k = 1;
    flagDot = false;
    flagSign = false;
}

function memoryOperations(M) { // Операции с памятью при нажатии на кнопки "MS MC MR M+ M-"
    val = eval(calcWindow.textContent);
    switch (M) {
        case "MS":
            bufferValue = val;
            break;
        case "MC":
            bufferValue = '';
            break;
        case "MR":
            calcWindow.textContent = bufferValue;
            break;
        case "M+":
            bufferValue = (+bufferValue) + (+val);
            break;
        case "M-":
            bufferValue -= val;
            break;
    }
    return bufferValue;
}

module.exports = calculate;