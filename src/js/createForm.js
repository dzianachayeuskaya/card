import Inputmask from 'inputmask';
import { el } from 'redom';

export function createForm() {
    const numberCard = el('input', {
        placeholder: 'Номер карты',
        class: 'form-control',
        name: 'numberCard',
        required: true,
    });
    Inputmask('9999 9999 9999 9999{1,3}').mask(numberCard);

    const numberCardGroup = el(
        'div',
        {
            class: 'input-group mb-3',
        },
        numberCard,
    );

    const expirationDate = el('input', {
        placeholder: 'ММ/ГГ',
        class: 'form-control mb-3',
        name: 'expirationDate',
        required: true,
    });
    Inputmask({
        alias: 'datetime',
        inputFormat: 'mm/yy',
        jitMasking: true,
    }).mask(expirationDate);

    const code = el('input', {
        placeholder: 'CVV/CVC',
        class: 'form-control mb-3',
        name: 'code',
        maxLength: 3,
        required: true,
        onmouseover: function () {
            code.placeholder = '';
        },
        onmouseout: function () {
            code.placeholder = 'CVV/CVC';
        },
    });

    const email = el('input', {
        placeholder: 'Email',
        class: 'form-control mb-3',
        name: 'email',
        required: true,
    });
    Inputmask({
        mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}.*{2,6}[.*{1,2}]',
        alias: 'email',
    }).mask(email);

    const form = el('form', [numberCardGroup, expirationDate, code, email]);
    return { form, numberCardGroup, numberCard, expirationDate, code, email };
}
