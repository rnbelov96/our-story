/* eslint-disable no-param-reassign */
export {};

const leftColor = '#FADE40';
const rightColor = '#ffffff';

const rangeElList = document.querySelectorAll('.js-range');

const rentRange = document.querySelector('.js-rent-range') as HTMLInputElement;
const trainingRange = document.querySelector(
  '.js-training-range',
) as HTMLInputElement;
const roomRange = document.querySelector('.js-room-range') as HTMLInputElement;

const resultLabelEl = document.querySelector(
  '.js-calc-result',
) as HTMLSpanElement;

let result: number;

let personCurrentStep = 2;
let adultsCurrentStep = 2;
let kidsCurrentStep = 2;

const calcResult = () => {
  result = (Number(rentRange.value) * 4500 + Number(trainingRange.value) * 10500)
    * Number(roomRange.value);
  resultLabelEl.textContent = result.toLocaleString();
  return result;
};

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;
});

rentRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  personCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (personCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (personCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

trainingRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  adultsCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (adultsCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (adultsCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

roomRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps = (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  kidsCurrentStep = (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (kidsCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (kidsCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});
