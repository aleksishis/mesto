export default class Card {
  constructor(data, templateSelector, openPopup, popupSelectors) {
    this._templateSelector = templateSelector;
    this._url = data.link;
    this._name = data.name;
    this._popupSelectorsList = popupSelectors; // rename reference
    this._openPopup = openPopup;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.cards__card').cloneNode(true);

    this._cardDeleteBtn = cardElement.querySelector('.card__delete');
    this._cardImage = cardElement.querySelector('.card__photo');
    this._cardLikeSelector = cardElement.querySelector('.card__heart');
    this._popupImageEL = this._popupSelectorsList.popupImage;
    this._popupTextEL = this._popupSelectorsList.popupText;

    return cardElement;
  }

  _toggleLike() {
    this._cardLikeSelector.classList.toggle("card__heart_active");
  }

  _removeCard() {
    this._card.remove();
  }

  _handleCardClick() {
    this._openPopup(this._popupSelectorsList.popup);
    this._popupImageEL.src = this._url;
    this._popupImageEL.alt = this._name;
    this._popupTextEL.textContent = this._name;
  }



  createCard() {
    this._card = this._getTemplate();

    this._setEventListeners();

    this._cardImage.src = this._url;
    this._cardImage.alt = this._name;

    this._card.querySelector(".card__tite").textContent = this._name;

    return this._card;

  }

  _setEventListeners() {
    this._cardLikeSelector.addEventListener('click', () => { this._toggleLike() })

    this._cardDeleteBtn.addEventListener('click', () => { this._removeCard() })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick()
    })
  }

}
