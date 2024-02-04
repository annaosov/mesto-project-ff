import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLikeClick } from './scripts/card.js';
import { openPopup, closePopup, handleClosePopupByButton, handleClosePopupByOverlay } from './scripts/modal.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.forms['new-place'];
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

function iterateCards() {
    initialCards.forEach(item => {
        cardsContainer.append(createCard(item, deleteCard, handleLikeClick, onImageClick))
    });
};
iterateCards();

popupCloseButtons.forEach(item => {
    item.addEventListener('click', handleClosePopupByButton);
});

popupTypeEdit.addEventListener('click', handleClosePopupByOverlay);

popupTypeNewCard.addEventListener('click', handleClosePopupByOverlay);

popupTypeImage.addEventListener('click', handleClosePopupByOverlay);

profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
  });

profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
});

function onImageClick(card) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openPopup(popupTypeImage);
};

function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    const nameInput = formEditProfile.elements.name.value;
    const jobInput = formEditProfile.elements.description.value;

    profileTitle .textContent = nameInput;
    profileDescription.textContent = jobInput;

    closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    const nameInput = formNewPlace.elements['place-name'].value;
    const jobInput = formNewPlace.elements['link'].value;
    const newCard = {
        name: nameInput,
        link: jobInput
    }

    cardsContainer.prepend(createCard(newCard, deleteCard, handleLikeClick, onImageClick))
    closePopup(popupTypeNewCard);
    formNewPlace.reset();
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_error_active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__input_error_active');
    errorElement.textContent = '';
  };

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
          buttonElement.disabled = true;
      buttonElement.classList.add('popup__button_inactive');
    } else {
          // иначе сделай кнопку активной
          buttonElement.disabled = false;
      buttonElement.classList.remove('popup__button_inactive');
    }
  };

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`.popup__input`));
  const buttonElement = formElement.querySelector('.popup__button');

  if (formElement.name === 'new-place') {
    toggleButtonState(inputList, buttonElement);
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  
  enableValidation();