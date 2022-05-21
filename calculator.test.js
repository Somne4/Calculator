const calculate = require('./calculator.js');

test(
    'Проверка математических вычислений калькулятора и его функциональность',
    () => {
        expect(calculate('2+2')).toBe('4');
        expect(calculate('2.22-1.11')).toBe('1.11');
        expect(calculate('2.4*5')).toBe('12');
        expect(calculate('3*(2+4)/2')).toBe('9');
        expect(calculate('54.88/4*1.1-6*(7+9)')).toBe('-80.908');
        expect(calculate('1234')).toBe('1234');
        }
);