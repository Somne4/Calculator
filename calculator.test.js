const calculate = require('./calculator');

test(
    'Проверяем математические вычисления калькулятора и функционал',
    () => {
        expect(calculate("2 + 2")).toBe("4");
        expect(calculate("2.22 - 1.11")).toBe("1.11");
        expect(calculate("2.4 * 5")).toBe("12");
        expect(calculate("3 * (2 + 4) / 2")).toBe("9");
        }
);