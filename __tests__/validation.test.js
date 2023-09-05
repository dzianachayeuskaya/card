/* eslint-disable jest/no-commented-out-tests */
import { isValidNumberCard, isValidCode } from '../src/js/validation.js';
import { el } from 'redom';
import Inputmask from 'inputmask';

const inputNumber = el('input');
Inputmask('9999 9999 9999 9999{1,3}').mask(inputNumber);

test('Проверка номера карты на содержание нецифровых символы', () => {
    Inputmask.setValue(inputNumber, '4111йцук11111111');
    expect(isValidNumberCard(inputNumber)).toBe(false);

    Inputmask.setValue(inputNumber, '4111qwer11111111');
    expect(isValidNumberCard(inputNumber)).toBe(false);

    Inputmask.setValue(inputNumber, '4111,./;11111111');
    expect(isValidNumberCard(inputNumber)).toBe(false);
});

test('Проверка номера карты на недостаток количества цифр', () => {
    Inputmask.setValue(inputNumber, '41111111');
    expect(isValidNumberCard(inputNumber)).toBe(false);
});

test('Проверка номера карты на переизбыток количества цифр', () => {
    Inputmask.setValue(inputNumber, '411111111111111111111111');
    expect(isValidNumberCard(inputNumber)).toBe(false);
});

test('Номер карты корректен', () => {
    Inputmask.setValue(inputNumber, '4111111111111111');
    expect(isValidNumberCard(inputNumber)).toBe(true);
});

const inputCode = el('input');

test('CVV/CVC корректен', () => {
    inputCode.value = '123';
    expect(isValidCode(inputCode, inputNumber)).toBe(true);
});

test('Проверка CVV/CVC на недостаток количества цифр', () => {
    inputCode.value = '1';
    expect(isValidCode(inputCode, inputNumber)).toBe(false);

    inputCode.value = '12';
    expect(isValidCode(inputCode, inputNumber)).toBe(false);
});

test('Проверка CVV/CVC на переизбыток количества цифр', () => {
    inputCode.value = '12345';
    expect(isValidCode(inputCode, inputNumber)).toBe(false);
});

test('Проверка CVV/CVC на содержание нецифровых символы', () => {
    inputCode.value = '12й';
    expect(isValidCode(inputCode, inputNumber)).toBe(false);

    inputCode.value = '12q';
    expect(isValidCode(inputCode, inputNumber)).toBe(false);

    inputCode.value = '12,';
    expect(isValidCode(inputCode, inputNumber)).toBe(false);
});
