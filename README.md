# card

[Demo](https://dzianachayeuskaya.github.io/card).

## Description
On this page, bank card data is validated when focus is lost on a field; if any data is entered incorrectly, the field with an error is highlighted in red. The project contains unit tests (jest).

Valid options for testing:
- card number: 4111 1111 1111 1111 (Visa card); 5143 5709 0399 4704 (Mastercard); 2200 7702 1272 7079 (Mir card);
- MM/YY: the specified data must be correct (month from 01 to 12) and greater than the current date (that is, if today is April 14, 2021, then the minimum possible date is 04/21).
- CVV/CVC(strictly 3 digits)
