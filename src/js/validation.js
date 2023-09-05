import {
    isValid,
    isExpirationDateValid,
    isSecurityCodeValid,
} from 'creditcard.js';

export function isValidNumberCard(input) {
    if (
        !input.inputmask.isComplete() ||
        !isValid(input.inputmask.unmaskedvalue())
    ) {
        return false;
    } else return true;
}

export function isValidExpirationDate(input) {
    if (
        !input.inputmask.isComplete() ||
        !isExpirationDateValid(
            input.value.split('/')[0],
            input.value.split('/')[1],
        )
    ) {
        return false;
    } else return true;
}

export function isValidCode(input, numberCard) {
    if (
        input.value.length !== 3 ||
        !isSecurityCodeValid(numberCard.inputmask.unmaskedvalue(), input.value)
    ) {
        return false;
    } else return true;
}

export function isValidEmail(input) {
    if (!input.inputmask.isComplete()) {
        return false;
    } else return true;
}

export function validateCard(numberCard, expirationDate, code, email, btn) {
    if (
        isValid(numberCard.inputmask.unmaskedvalue()) &&
        isSecurityCodeValid(numberCard.inputmask.unmaskedvalue(), code.value) &&
        isExpirationDateValid(
            expirationDate.value.split('/')[0],
            expirationDate.value.split('/')[1],
        ) &&
        email.inputmask.isComplete()
    ) {
        btn.removeAttribute('disabled');
    }
}
