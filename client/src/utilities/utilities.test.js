import '@testing-library/jest-dom';
import {isNumeric, isLetter, isValidEmail} from './utilities';

test('"12" es un número valido', async () => {
    expect(isNumeric("12")).toBe(true);
});

test('"12a" no es un número valido', async () => {
    expect(isNumeric("12a")).toBe(false);
});

test('"Ramón Mendoza" es un string valido', async () => {
    expect(isLetter("Ramón Mendoza")).toBe(true);
});

test('"correo@gmail.com" es un correo valido', async () => {
    expect(isValidEmail("correo@gmail.com")).toBe(true);
});

test('"correo@gmail" no es un correo valido', async () => {
    expect(isValidEmail("correo@gmail")).toBe(false);
});
