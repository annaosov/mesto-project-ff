import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLikeClick } from './scripts/card.js';
import { openPopup, closePopup, handleClosePopupByButton, handleClosePopupByOverlay } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formNewPlace = document.forms['new-place'];
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

function iterateCards() {
    fetch('https://nomoreparties.co/v1/wff-cohort-6/cards', {
        headers: {
            authorization: 'c6e4de5c-a1eb-44c4-87e5-597d09502f16'
        }
    })
    .then(res => res.json())
    .then((result) => {
        result.forEach(item => {
            cardsContainer.append(createCard(item, deleteCard, handleLikeClick, onImageClick))
        });
    });
    //initialCards.forEach(item => {
        //cardsContainer.append(createCard(item, deleteCard, handleLikeClick, onImageClick))
    //});
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
    enableValidation(validationConfig);
    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
    clearValidation(formEditProfile, validationConfig);
  });

profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
    enableValidation(validationConfig);
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

    profileTitle.textContent = nameInput;
    profileDescription.textContent = jobInput;

    fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'c6e4de5c-a1eb-44c4-87e5-597d09502f16',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput,
            about: jobInput
        })
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    });

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
    clearValidation(formNewPlace, validationConfig);
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
  headers: {
    authorization: 'c6e4de5c-a1eb-44c4-87e5-597d09502f16'
  }
})
.then(res => res.json())
.then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    profileImage.style.backgroundImage = `url(${result.avatar})`;
});

