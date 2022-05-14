let bufferValue = '';
let rvtValue = '';
const signs = ['+', '-', '*', '/'];
let k = 1;
let currentValue = '';
let afterDotValue = '';
let val = '';
let flagDot = false;
let flagSign = false;
const rvtEnabled = document.querySelector('.button-success')
const calcWindow = document.querySelector('.calculateWindow');

function insert(key) { //Вывод символов с кнопок
    if (key === '(' || key === ')') {
        calcWindow.textContent += key;
    }
    if (signs.includes(key) && !flagSign) {
        calcWindow.textContent += key;
        currentValue = '';
        afterDotValue = '';
        flagDot = false;
        flagSign = true;
    }
    if (key >= 0 && !flagDot && currentValue.length < 12) {
        currentValue += key;
        k += 1;
        calcWindow.textContent += key;
        flagSign = false;
    }
    else if (key === '.') {
        if (!currentValue.includes('.')) {
            if (calcWindow.textContent.length === 0) {
                calcWindow.textContent = '0.';
                currentValue = '0.';
            }
            else {
                calcWindow.textContent += key;
                currentValue += key;
            }
        }
        flagDot = true;
        flagSign = false;
    }
    if (flagDot && afterDotValue.length < 8 && key >= 0) {
        afterDotValue += key;
        calcWindow.textContent += key;
        flagSign = false;
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
            let equalDot = equalValue.substring(equalValue.indexOf('.') + 1, equalValue.length);
            if (equalDot.length > 12) {
                equalValue = Number(equalValue).toFixed(12);
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

function backspace() { //При нажатии на кнопку "<-" удаляет один символ из выражения
    val = calcWindow.textContent;
    calcWindow.textContent = val.substring(0, val.length - 1);
}

function clean() { //При нажатии на кнопку "C" удаляет выражение
    calcWindow.textContent = '';
    k = 1;
    currentValue = '';
    afterDotValue = '';
    flagDot = false;
    flagSign = false;
}

function allClean() { // При нажатии на кнопку "AC" очищает все данные с экрана и из памяти.
    rvtValue = '';
    bufferValue = '';
    currentValue = '';
    afterDotValue = '';
    val = '';
    calcWindow.textContent = '';
    rvtEnabled.setAttribute('disabled', true);
    k = 1;
    flagDot = false;
    flagSign = false;
}

function plusMinus() { // При нажатии на кнопку "+/-" меняет знак у выражения
    val = eval(calcWindow.textContent);
    if (val) {
        calcWindow.textContent = (-1) * val;
    }
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