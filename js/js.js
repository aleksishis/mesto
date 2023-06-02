


const profilePopup = document.querySelector(".popupProfile");
const openPopupProfileBtn = document.querySelector(".profile__edit");
const closeProfileBtn = document.querySelector(".popupProfile__closed");;

const closedPopupBtn = document.querySelector(".popup__closed");


const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_prompt_name");

const profileJob = document.querySelector(".profile__description")
const jobInput = document.querySelector(".popup__input_prompt_job");

const editForm = document.querySelector(".popup__form");

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
  const likeHeart = newCard.querySelectorAll('.card__heart'); //При querySelector все карты пропадают и не добавляются, даже document.querySelector('.card__heart')
  likeHeart.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('card__heart_active');
    })
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

