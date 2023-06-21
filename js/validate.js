const listClass = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(listClass.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(listClass.errorClass);

};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(listClass.inputErrorClass);
  errorElement.classList.remove(listClass.errorClass);
  errorElement.textContent = '';
};

//проверяет inputElement на корректность введённых данных и вызывает showInputError и hideInputError.
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    // inputElement.validationMessage - возвращает строку, 
    //представляющую локализованное сообщение, описывающее ограничения проверки, 
    //которым элемент управления не удовлетворяет (если таковые имеются).
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
    buttonElement.classList.add(listClass.inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  } else {
    buttonElement.classList.remove(listClass.inactiveButtonClass);
    buttonElement.removeAttribute('disabled',)
  }
};


const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(listClass.inputSelector));

  const buttonElement = formElement.querySelector(listClass.submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
};

validateForm = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(listClass.inputSelector));
  const buttonElement = formElement.querySelector(listClass.submitButtonSelector)

  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
    toggleButtonState(inputList, buttonElement);
  });
};

const isValid = () => {
  const formList = Array.from(document.querySelectorAll(listClass.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

isValid();