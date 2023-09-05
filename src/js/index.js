import 'babel-polyfill';

import { el, setChildren } from 'redom';
import {
    isValidNumberCard,
    isValidExpirationDate,
    isValidCode,
    isValidEmail,
    validateCard,
} from './validation.js';
import { getCreditCardNameByNumber } from 'creditcard.js';
import urlVisa from '../assets/images/visa.svg';
import urlMaster from '../assets/images/mastercard.svg';
import urlMir from '../assets/images/mir.svg';
import { createForm } from './createForm.js';
import '../scss/styles.scss';

const container = el('div', {
    class: 'container py-4 px-3 mx-auto',
});

const { form, numberCardGroup, numberCard, expirationDate, code, email } =
    createForm();

numberCard.oninput = function () {
    disableBtnWithoutInput(this);
    if (this.nextSibling) this.nextSibling.remove();
};

numberCard.onblur = () => {
    if (isValidNumberCard(numberCard)) {
        setChildren(numberCardGroup, [
            numberCard,
            logoCardType(
                getCreditCardNameByNumber(numberCard.inputmask.unmaskedvalue()),
            ),
        ]);
        validateCard(numberCard, expirationDate, code, email, btn);
    } else disableBtnAndInput(numberCard);
};

expirationDate.oninput = () => disableBtnWithoutInput(expirationDate);
expirationDate.onblur = () => {
    if (isValidExpirationDate(expirationDate)) {
        validateCard(numberCard, expirationDate, code, email, btn);
    } else disableBtnAndInput(expirationDate);
};

code.oninput = () => {
    disableBtnWithoutInput(code);
    code.value = code.value.replace(/\D/g, '');
};
code.onblur = () => {
    if (isValidCode(code, numberCard)) {
        validateCard(numberCard, expirationDate, code, email, btn);
    } else disableBtnAndInput(code);
};

email.oninput = () => disableBtnWithoutInput(email);
email.onblur = () => {
    if (isValidEmail(email)) {
        validateCard(numberCard, expirationDate, code, email, btn);
    } else disableBtnAndInput(email);
};

function logoCardType(number) {
    let logo;
    const logoVisa = el('img', {
        src: urlVisa,
        width: '38',
        height: '38',
        alt: 'Visa',
    });
    const logoMaster = el('img', {
        src: urlMaster,
        width: '38',
        height: '38',
        alt: 'Mastercard',
    });
    const logoMir = el('img', {
        src: urlMir,
        width: '38',
        height: '38',
        alt: 'Mir',
    });
    switch (number) {
        // 4731185631783138
        case 'Visa':
            logo = logoVisa;
            break;
        // 5143 5709 0399 4704
        case 'Mastercard':
            logo = logoMaster;
            break;
        // 2200 7702 1272 7079
        default:
            if (numberCard.inputmask.unmaskedvalue().startsWith('2')) {
                logo = logoMir;
                break;
            } else logo = null;
    }
    return logo;
}

const btn = el(
    'button',
    {
        type: 'submit',
        class: 'btn btn-primary',
        disabled: 'disabled',
    },
    'Оплатить',
);

function disableBtnAndInput(input) {
    input.classList.add('is-invalid');
    if (!btn.hasAttribute('disabled')) btn.setAttribute('disabled', 'disabled');
}

function disableBtnWithoutInput(input) {
    input.classList.remove('is-invalid');
    if (!btn.hasAttribute('disabled')) btn.setAttribute('disabled', 'disabled');
}

setChildren(container, [form, btn]);

setChildren(window.document.body, container);
