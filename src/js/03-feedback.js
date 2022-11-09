import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const keyLocalStorage = 'feedback-form-state';

let formData = {};

formEl.addEventListener('submit', handleForm);
formEl.addEventListener('input', throttle(onImputForm, 500));

function onImputForm(e) {
  formData[e.target.name] = e.target.value;
  const stringifyedData = JSON.stringify(formData);
  localStorage.setItem(keyLocalStorage, stringifyedData);
}

function handleForm(e) {
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(keyLocalStorage);
}

loadData();

function loadData() {
  const savedForm = JSON.parse(localStorage.getItem(keyLocalStorage));
  formData = savedForm || {};
  console.log(formData);

  if (savedForm) {
    formEl.email.value = savedForm.email || '';
    formEl.message.value = savedForm.message || '';
  }
}
