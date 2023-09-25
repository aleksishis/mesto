import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { listClass } from "./listClass.js";

const profilePopup = document.querySelector(".popupProfile");
const openPopupProfileBtn = document.querySelector(".profile__edit");

const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_prompt_name");

const profileJob = document.querySelector(".profile__description")
const jobInput = document.querySelector(".popup__input_prompt_job");

const editForm = document.querySelector(".popupProfile__form");

const popupAddCard = document.querySelector(".popupAddCard");
const openpopupAddCard = document.querySelector(".profile__add");

const cardsItemsEl = document.querySelector('.cards'); // СЮДА ДОБАВЛЯЮТСЯ КАРТОЧКИ
const formPopupAddCardEl = document.querySelector('.popupAddCard__form');// ФОРМА ПОАПА
const openPopupSelector = document.querySelector('.popupImage');
const popupImageSelector = document.querySelector('.popupImage__image');
const popupTextSelector = document.querySelector('.popupImage__title');

const popUpSelectors = {
  popup: openPopupSelector,
  popupText: popupTextSelector,
  popupImage: popupImageSelector
}

const popupList = document.querySelectorAll('.popup__form');


const popupListSelectors = document.querySelectorAll('.popup__form');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


//popupList.forEach(form => {
//  const validation = new FormValidator(form, listClass);
//  validation.startValidation();
//});

const editPopUpValidation = new FormValidator(editForm, listClass)
editPopUpValidation.startValidation();

const createCardValidation = new FormValidator(formPopupAddCardEl, listClass)
createCardValidation.startValidation();

const closeButtons = document.querySelectorAll('.popup__closed');
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('click', documentClickHandler);
}


const keyDownHandler = (event) => {
  if (event.code === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const documentClickHandler = ({ target }) => {
  const openedPopup = document.querySelector('.popup_opened');

  if (!openedPopup) {
    return;
  };

  const isOutsideClick = target.classList.contains('popup_opened')

  if (isOutsideClick) {
    closePopup(openedPopup);
  }
}

function createNewCard(name, link) {
  const card = new Card({ name, link }, '.card__template', openPopup, popUpSelectors);
  const newCard = card.createCard();

  return newCard;
}

function closePopup(popup) {
  editPopUpValidation.disableButtonState();
  createCardValidation.disableButtonState();
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyDownHandler);
  document.removeEventListener('click', documentClickHandler);
}

openPopupProfileBtn.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
})

editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  //закрываю попап изменения профиля


  closePopup(profilePopup);
})

openpopupAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});


initialCards.forEach(function (item) {
  const newCard = createNewCard(item.name, item.link)
  cardsItemsEl.prepend(newCard);

});


formPopupAddCardEl.addEventListener('submit', function (event) {
  event.preventDefault();


  const form = event.target;
  const popup = form.closest('.popup');
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const valueName = values['name'];
  const valueUrl = values['url'];

  const newCard = createNewCard(valueName, valueUrl)

  cardsItemsEl.prepend(newCard)

  form.reset()
  closePopup(popup);
}
)
