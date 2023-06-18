


const profilePopup = document.querySelector(".popupProfile");
const openPopupProfileBtn = document.querySelector(".profile__edit");
const closeProfileBtn = document.querySelector(".popupProfile__closed");;

const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_prompt_name");

const profileJob = document.querySelector(".profile__description")
const jobInput = document.querySelector(".popup__input_prompt_job");

const editForm = document.querySelector(".popupProfile__form");

const popupAddCard = document.querySelector(".popupAddCard");
const openpopupAddCard = document.querySelector(".profile__add");
const closedpopupAddCardBtn = document.querySelector(".popupAddCard__closed");

const template = document.querySelector('.card__template');
const templateContent = template.content;
const itemCardEl = templateContent.querySelector('.cards__card');// КАРТОЧКА 
const cardsItemsEl = document.querySelector('.cards'); //СЮДА ДОБАВЛЯЮТСЯ КАРТОЧКИ 
const formPopupAddCardEl = document.querySelector('.popupAddCard__form');// ФОРМА ПОАПА 
const inputTitlePopupAddCardEl = formPopupAddCardEl.querySelector('.popupAddCard__input_prompt_title');
const inputUrlPopupAddCardEl = formPopupAddCardEl.querySelector('.popupAddCard__input_prompt_url')

const popupImageEL = document.querySelector(".popupImage");
const closedPopupImageBtnEL = popupImageEL.querySelector('.popupImage__closed');

const imgPopupImageEL = popupImageEL.querySelector('.popupImage__image');
const textPopupImageEL = popupImageEL.querySelector('.popupImage__title');

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

const closeButtons = document.querySelectorAll('.popup__closed');
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  enableValidation()
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
  const newCard = createCard(item.name, item.link);
  cardsItemsEl.prepend(newCard);

});

function createCard(name, link) {
  const newCard = itemCardEl.cloneNode(true);
  //  ПЕРЕДАЮ ТАЙТЛЫ ИЗ ОБЕКТА 
  const textCardEl = newCard.querySelector('.card__tite');
  textCardEl.textContent = name;
  //  ПЕРЕДАЮ ФОТО ИЗ ОБЕКТА 
  const photoCardEl = newCard.querySelector(".card__photo");
  photoCardEl.src = link;
  photoCardEl.alt = name; //alt картинки
  //  Работаю с иконкой сердца 
  const likeHeart = newCard.querySelector(".card__heart");
  likeHeart.addEventListener("click", function () {
    likeHeart.classList.toggle("card__heart_active");
  });
  //  Удаление картчоки 
  const deleteButton = newCard.querySelector('.card__delete');
  deleteButton.addEventListener('click', function () {
    cardsItemsEl.removeChild(newCard);
  });

  //  ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ 
  photoCardEl.addEventListener('click', function () {
    openPopup(popupImageEL);
    imgPopupImageEL.src = photoCardEl.src;
    imgPopupImageEL.alt = photoCardEl.alt;
    textPopupImageEL.textContent = textCardEl.textContent;

  })
  return newCard;
}

formPopupAddCardEl.addEventListener('submit', function (event) {
  event.preventDefault();


  const form = event.target;
  const formData = new FormData(form);
  const values = Object.fromEntries(formData);

  const valueName = values['name'];
  const valueUrl = values['url'];

  const newCard = createCard(valueName, valueUrl);
  cardsItemsEl.prepend(newCard)

  form.reset()
  closePopup(popupAddCard);
}
)

















const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');

};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  const buttonElement = formElement.querySelector('.popup__button')
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);

  });
};
enableValidation();




//checkInputValidity()
//toggleButtonState()
//setEventListeners()
//hasInvalidInput()


//document.getElementById('myForm').addEventListener('submit', function (event) {
//  let input = document.getElementById('myInput')
//  let error = document.querySelector('.error')

//  // Очистим сообщение об ошибке перед каждой попыткой отправки
//  error.textContent = ''

//  if (!input.validity.valid) {
//    // Если поле не проходит проверку, отображаем соответствующее сообщение об ошибке
//    if (input.validity.valueMissing) {
//      error.textContent = "Поле не может быть пустым"
//    } else if (input.validity.tooShort) {
//      error.textContent = "Введенное значение должно быть длиной не менее 2 символов"
//    } else if (input.validity.tooLong) {
//      error.textContent = "Введенное значение должно быть длиной не более 40 символов"
//    }
//    event.preventDefault() // Останавливаем отправку формы
//  }
//})


