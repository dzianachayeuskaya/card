import { createForm } from '../src/js/createForm.js';

test('Форма содержит строго четыре поля для ввода с плейсхолдерами «Номер карты», «ММ/ГГ», «CVV/CVC», «Email»', () => {
    const form = createForm().form;
    const inputs = form.querySelectorAll('input');
    expect(form).toBeInstanceOf(HTMLFormElement);
    expect(inputs).toHaveLength(4);

    function checkPlaceholders() {
        let match = 0;
        const placeholders = ['Номер карты', 'ММ/ГГ', 'CVV/CVC', 'Email'];
        for (let i = 0; i < inputs.length; i++) {
            for (let ind = 0; ind < placeholders.length; ind++) {
                if (
                    inputs[i].getAttribute('placeholder') === placeholders[ind]
                ) {
                    match++;
                    break;
                } else continue;
            }
        }
        if (match === inputs.length) return true;
        else return false;
    }

    expect(checkPlaceholders()).toBeTruthy();
});
