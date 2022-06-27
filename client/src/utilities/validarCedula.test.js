import '@testing-library/jest-dom';
import validarCedula from './validarCedula';

test('La cédula 0104926548 debe ser valida', async () => {
    expect(validarCedula('0104926548').status).toBe(true);
});

test('La cédula 0104926549 debe ser invalida', async () => {
    expect(validarCedula('0104926549').status).toBe(false);
});