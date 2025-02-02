const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
};

// Вішаємо прослуховувач події на форму form, а подія буде спливати, і на формі ми будемо її ловити.

refs.form.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  const data = { email, message };
  saveToLS(STORAGE_KEY, data);
});

// ЗАВАНТАЖУВАТИ ПІД ЧАС ВІДКРИТТЯ СТОРІНКИ:

function initPage() {
  const formData = loadFromLS(STORAGE_KEY);
  refs.form.elements.email.value = formData?.email || '';
  refs.form.elements.message.value = formData?.message || '';
}
initPage(); // викликається функція як тільки відкривається/оновлюється сторінка

// ВИВОДИТИ В КОНСОЛЬ(під час сабміту) ЗІБРАНУ ІНФОРМАЦІЮ:
refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  const data = { email, message };

  if (!email || !message) {
    return alert('Fill please all fields');
  } else {
    console.log(data);
  }

  localStorage.removeItem(STORAGE_KEY); //видаляємо данні
  e.target.reset(); // очищаємо форму після відправлення(submit)
});

//Вставляємо дві функції для роботи з localStorage

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}
