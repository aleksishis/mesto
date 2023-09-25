export default class FormValidator {
  constructor(formElement, options) {
    this._options = options;
    this._formElement = formElement;

    this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);
  }

  startValidation() {
    this._setEvenetListeners();
  }

  disableButtonState() {
    this._buttonElement.classList.add(this._options.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

  _hasError() {
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputEl) {
    const errorElement = this._formElement.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.add(this._options.inputErrorClass);
    errorElement.textContent = inputEl.validationMessage;

    errorElement.classList.add(this._options.errorClass);
  }

  _hideInputError(inputEl) {
    const errorElement = this._formElement.querySelector(`.${inputEl.id}-error`);
    inputEl.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputEl) {
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl);
      // inputElement.validationMessage - возвращает строку,
      //представляющую локализованное сообщение, описывающее ограничения проверки,
      //которым элемент управления не удовлетворяет (если таковые имеются).
    } else {
      this._showInputError(inputEl);
    }
  }

  _toggleButtonState() {
    if (this._hasError()) {
      this._buttonElement.classList.add(this._options.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
    } else {
      this._buttonElement.classList.remove(this._options.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled')
    }
  }

  _setEvenetListeners() {
    this._inputList.forEach(inputEl => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      })
    });

    this._toggleButtonState();
  }
}
