import '../scss/thanks.scss';
import './year';
// import './modals';

const userName = localStorage.getItem('userName');
const userCity = localStorage.getItem('userCity');

const nameTitleEL = document.querySelector('.thanks__title_name');
const cityTitleEL = document.querySelector('.thanks__title_city');

const nameLabelElList = document.querySelectorAll('.js-name');
const cityLabelElList = document.querySelectorAll('.js-city');
nameLabelElList.forEach(el => {
  const labelEl = el as HTMLSpanElement;
  labelEl.textContent = userName || 'Гость';
});
cityLabelElList.forEach(el => {
  const labelEl = el as HTMLSpanElement;
  labelEl.textContent = userCity || 'Город';
});

if (userCity) {
  cityTitleEL?.classList.remove('visually-hidden');
} else {
  nameTitleEL?.classList.remove('visually-hidden');
}

document.title = userName
  ? `${userName}, спасибо, Ваша заявка принята`
  : 'Cпасибо, Ваша заявка принята';
