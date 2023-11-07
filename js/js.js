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


const openPopupProfileBtn = document.querySelector(".profile__edit");

const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_prompt_name");

const profileJob = document.querySelector(".profile__description")
const jobInput = document.querySelector(".popup__input_prompt_job");

const editForm = document.querySelector(".popupProfile__form");

const openpopupAddCardBtn = document.querySelector(".profile__add");

const cardsItemsEl = document.querySelector('.cards'); // СЮДА ДОБАВЛЯЮТСЯ КАРТОЧКИ
const formPopupAddCardEl = document.querySelector('.popupAddCard__form');// ФОРМА ПОАПА
const imagePopupContainerSelector = document.querySelector('.popupImage');
const popupImageSelector = document.querySelector('.popupImage__image');
const popupImageTextSelector = document.querySelector('.popupImage__title');


const popUpSelectors = {
  popup: imagePopupContainerSelector,
  popupText: popupImageTextSelector,
  popupImage: popupImageSelector
}



class PopUp {
  constructor(elementPopup) {
    this.elementPopup = elementPopup;
    this.closePopup = this.closePopup.bind(this); // Привязываем this к closePopup
    this.keyDownHandler = this.keyDownHandler.bind(this); // Привязываем this к keyDownHandler
    this.closeByClickOverlay = this.closeByClickOverlay.bind(this);
  }

  keyDownHandler(e) {
    if (e.code === "Escape") {
      this.closePopup();
    }
    else { return null }
  }

  closeByClickOverlay(e) {
    if (e.target === this.elementPopup) {
      this.closePopup();
    }
  }

  setEventListeners() {
    // overlay and close btn
    const closeBtn = this.elementPopup.querySelector('.popup__closed');
    closeBtn.addEventListener('click', this.closePopup)
    document.addEventListener('keydown', this.keyDownHandler);
    this.elementPopup.addEventListener('mousedown', this.closeByClickOverlay)

    this.keyDownHandler;
    this.closeByClickOverlay;

  }

  openPopup() {
    this.elementPopup.classList.add("popup_opened");
    this.setEventListeners();
  }

  closePopup() {
    this.elementPopup.classList.remove("popup_opened");
    document.removeEventListener('keydown', this.closePopupUpEsc);
    document.removeEventListener('keydown', this.keyDownHandler);
  }

}


class PopupWithEditProfile extends PopUp {
  constructor(elementPopup, validation, _profileName, nameInput, profileJob, jobInput) {
    super(elementPopup);
    this._form = elementPopup.querySelector('.popupProfile__form'); //? заменил на уникальный класс
    this._validation = validation;

    this._profileName = profileName;
    this._nameInput = nameInput;
    this._profileJob = profileJob;
    this._jobInput = jobInput;

    this._setEventListeners();
  }
  editPopUpValidation() {
    //const editPopUpValidation = new FormValidator(editForm, listClass);
    //editPopUpValidation.startValidation();
  }
  _setEventListeners() {
    super.setEventListeners();
    // Обработчик события клика на кнопку открытия попапа
    openPopupProfileBtn.addEventListener('click', () => popupProfile.openPopup());
    // Добавьте обработчик события отправки формы
    this._form.addEventListener('submit', (event) => this._handleFormSubmit(event));
  }
  _handleFormSubmit(event) {
    event.preventDefault();
    // Получите данные из формы
    const newName = this._nameInput.value;
    const newJob = this._jobInput.value;
    // Обновите текст профиля
    this._profileName.textContent = newName;
    this._profileJob.textContent = newJob;

    // Закройте попап
    this.closePopup();
  }


  openPopup() {
    super.openPopup();
    this._nameInput.value = this._profileName.textContent;
    this._jobInput.value = this._profileJob.textContent;
    this._validation.startValidation();
    this._setEventListeners();

    //!Поменял местами 2 строчки с началом валидации
  }
  closePopup() {
    super.closePopup();
    this._form.querySelector('.name-input-error').textContent = '';
    this._form.querySelector('.job-input-error').textContent = '';
  }
}


class PopupWithAddCard extends PopUp {
  constructor(elementPopup, validation) {
    super(elementPopup);
    this._form = elementPopup.querySelector('.popupAddCard__form'); //? заменил на уникальный класс
    this._validation = validation;
  }

  _setEventListeners() {
    super.setEventListeners();

  }

  openPopup() {
    super.openPopup();
    this._validation.startValidation();
  }

  closePopup() {
    super.closePopup();
    this._form.querySelector('.title-input-error').textContent = '';
    this._form.querySelector('.title-url-error').textContent = '';
    this._form.reset();

  }

}


class PopupWithImage extends PopUp {
  constructor(elementPopup) {
    super(elementPopup);
    this._popupImage = elementPopup.querySelector('.popupImage__image');
    this._popupDesc = elementPopup.querySelector('.popupImage__title');
    // 1. Сюда селекторы (картинка и описание)

  }

  openPopup(imageUrl, imageDesc) {
    this._popupImage.src = imageUrl;
    this._popupImage.alt = imageDesc;
    this._popupDesc.textContent = imageDesc;
    super.openPopup();
  }
}

//? создам попапы елементы из новых классов:
const createCardValidation = new FormValidator(formPopupAddCardEl, listClass)
const popupImage = new PopupWithImage(document.querySelector('.popupImage')) //объект попап открытия картинки
const editPopUpValidation = new FormValidator(editForm, listClass)
const popupProfile = new PopupWithEditProfile(document.querySelector('.popupProfile'), editPopUpValidation, profileName, nameInput, profileJob, jobInput) //объект попап редактирования профиля
//editPopUpValidation.startValidation();
const popupAddCard = new PopupWithAddCard(document.querySelector('.popupAddCard'), createCardValidation) //объект попап добавления карточки

function createNewCard(name, link) {
  const card = new Card({ name, link }, '.card__template', popupImage, popUpSelectors);
  const newCard = card.createCard();

  return newCard;
}

openpopupAddCardBtn.addEventListener('click', function () {
  popupAddCard.openPopup()
});


initialCards.forEach(function (item) {
  const newCard = createNewCard(item.name, item.link)
  cardsItemsEl.prepend(newCard);

});

formPopupAddCardEl.addEventListener('submit', function (event) {
  event.preventDefault();


  const form = event.target;
  console.log(form)

  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const valueName = values['name'];
  const valueUrl = values['url'];

  const newCard = createNewCard(valueName, valueUrl)

  cardsItemsEl.prepend(newCard)
  popupAddCard.closePopup()
  form.reset()


})







