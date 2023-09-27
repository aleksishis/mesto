import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { listClass } from "./listClass.js";

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
const editPopupCloseBtnSelector = document.querySelector('.popupProfile__closed');
const addCardPopupCloseBtnSelector = document.querySelector('.popupAddCard__closed');
const imagePopupCloseBtnSelector = document.querySelector('.popupImage__closed');


const popUpSelectors = {
  popup: openPopupSelector,
  popupText: popupTextSelector,
  popupImage: popupImageSelector
}

const editPopUpValidation = new FormValidator(editForm, listClass)
editPopUpValidation.startValidation();

const createCardValidation = new FormValidator(formPopupAddCardEl, listClass)
createCardValidation.startValidation();

editPopupCloseBtnSelector.addEventListener('click', () => {
  closeEditPopup();
})

addCardPopupCloseBtnSelector.addEventListener('click', () => {
  closeAddCardPopup();
})

imagePopupCloseBtnSelector.addEventListener('click', () => {
  const openedPopup = document.querySelector('.popup_opened');
  closeImagePopup(openedPopup);
})

const editKeyDownHandler = (event) => {
  if (event.code === "Escape") {
    closeEditPopup();
  }
}

const editCloseClickHandler = ({ target }) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (!openedPopup) {
    return;
  };

  const isOutsideClick = target.classList.contains('popup_opened')

  if (isOutsideClick) {
    closeEditPopup();
  }
}

function openEditPopup() {
  profilePopup.classList.add("popup_opened");
  document.addEventListener('keydown', editKeyDownHandler);
  document.addEventListener('click', editCloseClickHandler);
}

const addCardKeyDownHandler = (event) => {
  if (event.code === "Escape") {
    closeAddCardPopup();
  }
}

const addCardCloseClickHandler = ({ target }) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (!openedPopup) {
    return;
  };

  const isOutsideClick = target.classList.contains('popup_opened')

  if (isOutsideClick) {
    closeAddCardPopup();
  }
}

function openAddCardPopup() {
  popupAddCard.classList.add("popup_opened");
  document.addEventListener('keydown', addCardKeyDownHandler);
  document.addEventListener('click', addCardCloseClickHandler);
}

function openImagePopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', keyDownHandler);
  document.addEventListener('click', documentClickHandler);
}

function closeEditPopup() {
  editPopUpValidation.disableButtonState();
  profilePopup.classList.remove("popup_opened");
  document.removeEventListener('keydown', editKeyDownHandler);
  document.removeEventListener('click', editCloseClickHandler);
}

function closeAddCardPopup() {
  createCardValidation.disableButtonState();
  formPopupAddCardEl.reset()
  popupAddCard.classList.remove("popup_opened");
  document.removeEventListener('keydown', addCardKeyDownHandler);
  document.removeEventListener('click', addCardCloseClickHandler);
}

function createNewCard(name, link) {
  const card = new Card({ name, link }, '.card__template', openImagePopup, popUpSelectors);
  const newCard = card.createCard();
  return newCard;
}

function closeImagePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyDownHandler);
  document.removeEventListener('click', documentClickHandler);
}

openPopupProfileBtn.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openEditPopup();
})

const keyDownHandler = (event) => {
  if (event.code === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closeImagePopup(openedPopup);
  }
}

const documentClickHandler = ({ target }) => {
  const openedPopup = document.querySelector('.popup_opened');

  if (!openedPopup) {
    return;
  };

  const isOutsideClick = target.classList.contains('popup_opened')

  if (isOutsideClick) {
    closeImagePopup(openedPopup);
  }
}

openpopupAddCard.addEventListener('click', function () {
  openAddCardPopup();
});


initialCards.forEach(function (item) {
  const newCard = createNewCard(item.name, item.link)
  cardsItemsEl.prepend(newCard);

});


editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeEditPopup();
})

formPopupAddCardEl.addEventListener('submit', function (event) {
  event.preventDefault();


  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const valueName = values['name'];
  const valueUrl = values['url'];

  const newCard = createNewCard(valueName, valueUrl)

  cardsItemsEl.prepend(newCard)

  form.reset()
  closeAddCardPopup()
})
