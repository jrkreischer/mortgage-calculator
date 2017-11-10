
var mortgageCalculator = (function() {
  // Inputs
  var calculator = document.getElementById('mortgage-calculator');
  var years = document.querySelector('#mortgage-calculator #years');
  var interestRate = document.querySelector('#mortgage-calculator #interest-rate');
  var loanAmount = document.querySelector('#mortgage-calculator #loan-amount');
  var annualTax = document.querySelector('#mortgage-calculator #annual-tax');
  var annualInsurance = document.querySelector('#mortgage-calculator #annual-insurance');
  var calculate = document.querySelector('#mortgage-calculator #calculate');
  // Outputs
  var error = document.querySelector('#mortgage-calculator #error');
  var principlePlusInterest = document.querySelector('#mortgage-calculator #principal-plus-interest');
  var monthlyTax = document.querySelector('#mortgage-calculator #monthly-tax');
  var monthlyInsurance = document.querySelector('#mortgage-calculator #monthly-insurance');
  var monthlyPayment = document.querySelector('#mortgage-calculator #monthly-payment');
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
      var reDecPercent = /^(\.\d{1,4})?$/; // Regex for decimal percentage
      var good = 0; // Counter for validated inputs
      var inputs = document.querySelectorAll('#mortgage-calculator input[type=text]');

      // Loop text inputs, compare with regex, update status(good)
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value.match(re) || inputs[i].value.match(reDecPercent) && inputs[i].value != '') {
          good++;
          if (inputs[i].classList.contains('error')) {
            inputs[i].classList.remove('error');
            error.innerHTML = '&nbsp;';
          }
        } else {
          good--;
          inputs[i].classList.add('error');
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
}());
