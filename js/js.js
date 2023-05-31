//popup - попап изменения профиля
const popup = document.querySelector(".popup");

const openPopupBtn = document.querySelector(".profile__edit");
const closedPopupBtn = document.querySelector(".popup__closed");

const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_prompt_name");

const profileJob = document.querySelector(".profile__description")
const jobInput = document.querySelector(".popup__input_prompt_job");

const editForm = document.querySelector(".popup__form");


openPopupBtn.addEventListener('click', function () {
  openPopup(popup);
})

closedPopupBtn.addEventListener('click', function () {
  closePopup(popup);
})

editForm.addEventListener('submit', function (event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  //закрываю попап изменения профиля
  closePopup(popup);
})

function openPopup(namePopup) {
  namePopup.classList.add("popup_opened")
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

}
function closePopup(namePopup) {
  namePopup.classList.remove("popup_opened")
}

//--//--//--//--//--//--//Код для попапа добалвения карточки//--//--//--//--//--//--//
//    popupAddCard - попап добплаени карточки
const popupAddCard = document.querySelector(".popupAddCard");
const openpopupAddCard = document.querySelector(".profile__add");
const closedpopupAddCardBtn = document.querySelector(".popupAddCard__closed");

openpopupAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

closedpopupAddCardBtn.addEventListener('click', function () {
  closePopup(popupAddCard);
});

//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/
//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=//=/

const template = document.querySelector('.card__template');
const templateContent = template.content;
const itemCardEl = templateContent.querySelector('.cards__card');// КАРТОЧКА
const cardsItemsEl = document.querySelector('.cards'); //СЮДА ДОБАВЛЯЮТСЯ КАРТОЧКИ
const formPopupAddCardEl = document.querySelector('.popupAddCard__form');// ФОРМА ПОАПА
const inputTitlePopupAddCardEl = formPopupAddCardEl.querySelector('.popupAddCard__input_prompt_title');
const inputUrlPopupAddCardEl = formPopupAddCardEl.querySelector('.popupAddCard__input_prompt_url')
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
  //  Работаю с иконкой сердца
  const likeHeart = newCard.querySelectorAll('.card__heart');
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
  const popupImageEL = document.querySelector(".popupImage");
  const closedPopupImageBtnEL = popupImageEL.querySelector('.popupImage__closed');
  const textPopupImageEL = popupImageEL.querySelector('.popupImage__title');
  //  ОТКРЫТИЕ ПОПАПА С КАРТИНКОЙ
  photoCardEl.addEventListener('click', function () {
    openPopup(popupImageEL);
    const imgPopupImageEL = popupImageEL.querySelector('.popupImage__image');
    imgPopupImageEL.src = photoCardEl.src;
    textPopupImageEL.textContent = textCardEl.textContent;
  })
  closedPopupImageBtnEL.addEventListener('click', function () {
    closePopup(popupImageEL);

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
})





