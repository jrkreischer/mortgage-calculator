/* jshint browser: true */

// Inputs
// var mortgageCalcForm = document.getElementById('mortgage-calculator');
var years = document.getElementById('years');
var interestRate = document.getElementById('interest-rate');
var loanAmount = document.getElementById('loan-amount');
var annualTax = document.getElementById('annual-tax');
var annualInsurance = document.getElementById('annual-insurance');
var calculate = document.getElementById('calculate');
// Outputs
var principlePlusInterest = document.getElementById('principal-plus-interest');
var monthlyTax = document.getElementById('monthly-tax');
var monthlyInsurance = document.getElementById('monthly-insurance');
var monthlyPayment = document.getElementById('monthly-payment');

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


  // console.log(n);
  // console.log(i);
  // console.log(p);
  // console.log(t);
  // console.log(ins);
}

// calculate.addEventListener('click', calcMortgageMonthly);
calculate.addEventListener('click', validate());

function percentage() {
  if (interestRate.value < 1.0) {
    i = parseFloat(interestRate.value/12);
  } else {
    i = parseFloat(interestRate.value/12) / 100;
  }
  // console.log(i);
  return i;
}
