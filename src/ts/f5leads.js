/* eslint-disable no-plusplus */

const validateForm = form => {
  const nameInputEl = form.querySelector('[data-type="name"]');
  const phoneInputEl = form.querySelector('[data-type="phone"]');
  const emailInputEl = form.querySelector('[data-type="email"]');
  const cityInputEl = form.querySelector('[data-type="city"]');

  let isOk = true;

  if (nameInputEl && nameInputEl.value === '') {
    nameInputEl.classList.add('input-error');
    isOk = false;
  }
  if (phoneInputEl && phoneInputEl.value === '') {
    phoneInputEl.classList.add('input-error');
    isOk = false;
  }
  if (emailInputEl && emailInputEl.value === '') {
    emailInputEl.classList.add('input-error');
    isOk = false;
  }
  if (cityInputEl && cityInputEl.value === '') {
    cityInputEl.classList.add('input-error');
    isOk = false;
  }

  if (
    phoneInputEl
    && phoneInputEl.value !== ''
    && !validator.isMobilePhone(
      `${phoneInputEl.value.replace(/\(|\)|-|_|\s/g, '')}`,
      'ru-RU',
    )
  ) {
    phoneInputEl.classList.add('input-error');
    isOk = false;
  }

  if (
    emailInputEl
    && emailInputEl.value !== ''
    && !validator.isEmail(emailInputEl.value)
  ) {
    emailInputEl.classList.add('input-error');
    isOk = false;
  }

  if (isOk) {
    if (nameInputEl) {
      localStorage.setItem('userName', nameInputEl.value);
    } else {
      localStorage.setItem('userName', '');
    }
    if (cityInputEl) {
      localStorage.setItem('userCity', cityInputEl.value);
    } else {
      localStorage.setItem('userCity', '');
    }

    return true;
  }
  return false;
};

function parseQueryString(query) {
  const vars = query.split('&');
  const queryString = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof queryString[key] === 'undefined') {
      queryString[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof queryString[key] === 'string') {
      const arr = [queryString[key], decodeURIComponent(value)];
      queryString[key] = arr;
      // If third or later entry with this name
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }
  return queryString;
}

function serializeArray(form) {
  const arr = [];
  Array.prototype.slice.call(form.elements).forEach(field => {
    if (
      !field.name
      || field.disabled
      || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1
    ) {
      return;
    }
    if (field.type === 'select-multiple') {
      Array.prototype.slice.call(field.options).forEach(option => {
        if (!option.selected) return;
        arr.push({
          name: field.name,
          value: option.value,
        });
      });
      return;
    }
    if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) {
      return;
    }
    arr.push({
      name: field.name,
      value: field.value,
    });
  });
  return arr;
}

const query = window.location.search.substring(1);
const qs = parseQueryString(query);
const { localStorage } = window;
if (qs.utm_source) localStorage.utm_source = qs.utm_source;
if (qs.utm_source) localStorage.utm_source = qs.utm_source;
if (qs.utm_medium) localStorage.utm_medium = qs.utm_medium;
if (qs.utm_campaign) localStorage.utm_campaign = qs.utm_campaign;
if (qs.utm_campaign_name) localStorage.utm_campaign_name = qs.utm_campaign_name;
if (qs.utm_source) localStorage.utm_term = qs.utm_term;
if (qs.utm_placement) localStorage.utm_placement = qs.utm_placement;
if (qs.utm_device) localStorage.utm_device = qs.utm_device;
if (qs.utm_region_name) localStorage.utm_region_name = qs.utm_region_name;
if (qs.yclid) localStorage.yclid = qs.yclid;

function getStoredItem(item) {
  if (
    !localStorage.getItem(`lpg3746_${item}`)
    && localStorage.getItem(`lpg3746_${item}`) != 'false'
  ) { return false; }
  return localStorage.getItem(`lpg3746_${item}`);
}
function setStoredItem(item, value) {
  if (value == null || value == '' || value == undefined) return false;
  return localStorage.setItem(`lpg3746_${item}`, value);
}
function getField(name, array) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].name == name) {
      return array[i].value;
    }
  }
  return false;
}

const formsList = document.querySelectorAll('form');

document.addEventListener('DOMContentLoaded', () => {
  if (typeof ymaps !== 'undefined') {
    ymaps.ready(() => {
      ymaps.geolocation
        .get({ provider: 'yandex', autoReverseGeocode: true })
        .then(result => {
          document.usercity = result.geoObjects.get(0).properties.get('metaDataProperty')
            .GeocoderMetaData.Address.formatted || '';
          setStoredItem('city', document.usercity);
        });
    });
  }

  formsList.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(form)) {
        return;
      }

      const data = serializeArray(form);
      const formData = new FormData();

      setStoredItem('name', getField('name', data));
      if (getField('city', data)) setStoredItem('city', getField('city', data));

      if (
        !getField('name', data)
        && getStoredItem('name') != 'false'
        && getStoredItem('name')
      ) {
        data.push({ name: 'name', value: getStoredItem('name') });
      }
      let cityInserted = false;
      if (
        !getField('city', data)
        && getStoredItem('city') != 'false'
        && getStoredItem('city')
      ) {
        cityInserted = true;
        data.push({ name: 'city', value: getStoredItem('city') });
      }

      if (
        localStorage.utm_source !== undefined
        && localStorage.utm_source !== ''
      ) {
        data.push({ name: 'utm_source', value: localStorage.utm_source });
      }

      if (
        localStorage.utm_medium !== undefined
        && localStorage.utm_medium !== ''
      ) {
        data.push({ name: 'utm_medium', value: localStorage.utm_medium });
      }

      if (
        localStorage.utm_campaign !== undefined
        && localStorage.utm_campaign !== ''
      ) {
        data.push({ name: 'utm_campaign', value: localStorage.utm_campaign });
      }

      if (
        localStorage.utm_campaign_name !== undefined
        && localStorage.utm_campaign_name !== ''
      ) {
        data.push({
          name: 'utm_campaign_name',
          value: localStorage.utm_campaign_name,
        });
      }

      if (localStorage.utm_term !== undefined && localStorage.utm_term !== '') {
        data.push({ name: 'utm_term', value: localStorage.utm_term });
      }

      if (
        localStorage.utm_content !== undefined
        && localStorage.utm_content !== ''
      ) {
        data.push({ name: 'utm_content', value: localStorage.utm_content });
      }

      if (
        localStorage.utm_placement !== undefined
        && localStorage.utm_placement !== ''
      ) {
        data.push({ name: 'utm_placement', value: localStorage.utm_placement });
      }

      if (
        localStorage.utm_device !== undefined
        && localStorage.utm_device !== ''
      ) {
        data.push({ name: 'utm_device', value: localStorage.utm_device });
      }

      if (
        localStorage.utm_region_name !== undefined
        && localStorage.utm_region_name !== ''
      ) {
        data.push({
          name: 'utm_region_name',
          value: localStorage.utm_region_name,
        });
      }

      if (localStorage.yclid !== undefined && localStorage.yclid !== '') {
        data.push({ name: 'yclid', value: localStorage.yclid });
      }

      if (
        !cityInserted
        && ymaps.geolocation.city !== undefined
        && ymaps.geolocation.city !== ''
      ) {
        data.push({ name: 'city', value: ymaps.geolocation.city });
      }

      const x = new Date();
      data.push({ name: 'timezone', value: (-1 * x.getTimezoneOffset()) / 60 });

      for (let i = data.length - 1; i >= 0; i--) {
        formData.append(data[i].name, data[i].value);
      }

      fetch('php/formProcessor.php', {
        method: 'POST',
        body: formData,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(res => res.text())
        .then(res => {
          if (res == 1) {
            window.location.href = 'thanks.html';
          } else if (res == 2) {
            alert('Something was wrong. Please, contact administrator.');
          }
        })
        .catch(err => console.log(err));
    });
  });
});
