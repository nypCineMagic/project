// var J = Payment.J,
//   numeric = document.querySelector('[data-numeric]'),
//   number = document.querySelector('.cc-number'),
//   exp = document.querySelector('.cc-exp'),
//   cvc = document.querySelector('.cc-cvc'),
//   validation = document.querySelector('.validation');

// Payment.restrictNumeric(numeric);
// Payment.formatCardNumber(number);
// Payment.formatCardExpiry(exp);
// Payment.formatCardCVC(cvc);

// document.querySelector('form').onsubmit = function(e) {
//   e.preventDefault();
//   J.toggleClass(document.querySelectorAll('input'), 'invalid');
//   J.removeClass(validation, 'passed failed');

//   var cardType = Payment.fns.cardType(J.val(number));

//   J.toggleClass(number, 'invalid', !Payment.fns.validateCardNumber(J.val(number)));
//   J.toggleClass(exp, 'invalid', !Payment.fns.validateCardExpiry(Payment.cardExpiryVal(exp)));

//   J.toggleClass(cvc, 'invalid', !Payment.fns.validateCardCVC(J.val(cvc), cardType));

//   if (document.querySelectorAll('.invalid').length) {
//     J.addClass(validation, 'failed');
//   } else {
//     J.addClass(validation, 'passed');
//   }
// }