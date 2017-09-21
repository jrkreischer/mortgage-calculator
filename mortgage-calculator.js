var years = document.getElementById('years');
var interestRate = document.getElementById('interest-rate');
var loanAmount = document.getElementById('loan-amount');
var annualTax = document.getElementById('annual-tax');
var annualInsurance = document.getElementById('annual-insurance');
var monthlyPayment = document.getElementById('monthly-payment');
var calculate = document.getElementById('calculate');

function calcMortgageMonthly() {
  // M = P[i(1+i)^n] / [(1+i)^n-1]
  var n = parseFloat(years.value) * 12;
  var i = parseFloat(interestRate.value/12) / 100;
  var p = parseFloat(loanAmount.value);
  var t = parseFloat(annualTax.value) / 12;
  var ins = parseFloat(annualInsurance.value) / 12;

  var m = p * ( i*(Math.pow((1+i),n)) / ( Math.pow((1+i),n)-1) );
  m += (t+ins);

  monthlyPayment.textContent = '$' + m.toFixed(2);
}

calculate.addEventListener('click', calcMortgageMonthly);

// function percentToDecimal() {
//
// }
