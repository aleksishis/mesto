const popup = document.querySelector(".popup");
const openPopupBtn = document.querySelector(".profile__edit");
const closedPopupBtn = document.querySelector(".popup__closed");

const profileName = document.querySelector(".profile__name");
const nameInput = document.querySelector(".popup__input_prompt_name");

const profileJob = document.querySelector(".profile__description")
const jobInput = document.querySelector(".popup__input_prompt_job");

const editForm = document.querySelector(".popup__form");


openPopupBtn.addEventListener('click', openPopup)

closedPopupBtn.addEventListener('click', closePopup)

editForm.addEventListener('submit', function (event) {
  event.preventDefault()

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup();
})

function openPopup() {
  popup.classList.add("popup_opened")
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function closePopup() {
  popup.classList.remove("popup_opened")
}
