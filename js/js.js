const popup = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit');
const popupClosed = document.querySelector('.popup__closed');
const profileName = document.querySelector('.profile__name');
const profileDepiction = document.querySelector('.profile__depiction');
const popupInput = document.querySelector('.popup__input');


profileEdit.addEventListener('click', openPopup)
popupClosed.addEventListener('click', closePopup)

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM 
let nameInput = document.querySelector('.popup__input');
let jobInput = document.querySelector('.popup__textarea');


nameInput.value = profileName.textContent;
jobInput.value = profileDepiction.textContent;


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
formElement.addEventListener('submit', function (event) {
  event.preventDefault;

  // передаютс язначения из формы в профиль
  profileName.textContent = nameInput.value;
  profileDepiction.textContent = jobInput.value;
  closePopup();
})

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
}