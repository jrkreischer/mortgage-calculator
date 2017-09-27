
// Inputs
var calculator = document.getElementById('calculator');
var years = document.getElementById('years');
var interestRate = document.getElementById('interest-rate');
var loanAmount = document.getElementById('loan-amount');
var annualTax = document.getElementById('annual-tax');
var annualInsurance = document.getElementById('annual-insurance');
var calculate = document.getElementById('calculate');
// Outputs
var error = document.getElementById('error');
var principlePlusInterest = document.getElementById('principal-plus-interest');
var monthlyTax = document.getElementById('monthly-tax');
var monthlyInsurance = document.getElementById('monthly-insurance');
var monthlyPayment = document.getElementById('monthly-payment');
// Vars for calculation
var n, i, p, t, ins;

function calcMortgageMonthly() {
  'use strict';

  n = parseInt(years.value) * 12;
  i = percentage();
  p = parseFloat(loanAmount.value);
  t = parseFloat(annualTax.value) / 12;
  ins = parseFloat(annualInsurance.value) / 12;

  // M = P[i(1+i)^n] / [(1+i)^n-1]
  var m = p * ( i*(Math.pow((1+i),n)) / ( Math.pow((1+i),n)-1) );
  var totalMonthlyPayment = m + (t+ins);

  // Output
  principlePlusInterest.innerHTML = '$' + m.toFixed(2);
  monthlyTax.innerHTML = '$' + t.toFixed(2);
  monthlyInsurance.innerHTML = '$' + ins.toFixed(2);
  monthlyPayment.innerHTML = '$' + totalMonthlyPayment.toFixed(2);
}

function percentage() {
  'use strict';

  if (interestRate.value < 1.0) {
    i = parseFloat(interestRate.value/12);
  } else {
    i = parseFloat(interestRate.value/12) / 100;
  }
  return i;
}

function validate() {
  'use strict';

  // Clear outputs
  var clearOutputs = (function() {
    var outputs = document.querySelectorAll('#outputs span');
    for (var i = 0; i < outputs.length; i++) {
      outputs[i].innerHTML = '';
    }
  }());

  var validateInputs = (function() {
    var re = /^\d+(?:\.\d{1,2})?$/; // Regex to check for valid number
    var reDecPercent = /^(\.\d{1,2})?$/; // Regex for decimal percentage
    var good = 0; // Counter for validated inputs
    var inputs = document.querySelectorAll('#calculator input[type=text]');

    // Loop text inputs, compare with regex, update status(good)
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].value.match(re) || inputs[i].value.match(reDecPercent)) {
        good++;
        if (inputs[i].style.borderColor == 'red') {
          inputs[i].style.borderColor = 'initial';
        }
      } else {
        good--;
        inputs[i].style.borderColor = 'red';
      }
    }

    // All inputs pass validation -> calculate, otherwise error message
    if (good == inputs.length) {
      calcMortgageMonthly();
    } else {
      error.innerHTML = '* Please enter valid number(s).';
    }
  }());
}

calculate.addEventListener('click', validate);
