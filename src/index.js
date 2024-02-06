import './pages/index.css';
import { getInitialCards } from './scripts/api.js'
import { getUserProfile } from './scripts/api.js';
import { updateProfile } from './scripts/api.js';
import { updateAvatar} from './scripts/api.js';
import { addNewCard } from './scripts/api.js';
import { createCard, deleteCard, handleLikeClick } from './scripts/card.js';
import { openPopup, closePopup, handleClosePopupByButton, handleClosePopupByOverlay } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupTypeImage = document.querySelector('.popup_type_image');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formNewPlace = document.forms['new-place'];
const formAvatar = document.forms['avatar'];
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

getInitialCards()
  .then((result) => {
    result.forEach(item => {
        cardsContainer.append(createCard(item, deleteCard, handleLikeClick, onImageClick))
    });
  })
  .catch((err) => {
    console.log(err);
  });

popupCloseButtons.forEach(item => {
    item.addEventListener('click', handleClosePopupByButton);
});

popupTypeEdit.addEventListener('click', handleClosePopupByOverlay);

popupTypeNewCard.addEventListener('click', handleClosePopupByOverlay);

popupTypeAvatar.addEventListener('click', handleClosePopupByOverlay);

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

profileImage.addEventListener('click', function () {
    openPopup(popupTypeAvatar);
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

    updateProfile(nameInput, jobInput)
        .then((result) => {
            //console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    const nameInput = formNewPlace.elements['place-name'].value;
    const linkInput = formNewPlace.elements['link'].value;

    addNewCard(nameInput, linkInput)
        .then((result) => {
            cardsContainer.prepend(createCard(result, deleteCard, handleLikeClick, onImageClick));
        })
        .catch((err) => {
            console.log(err);
        });

    closePopup(popupTypeNewCard);
    formNewPlace.reset();
    clearValidation(formNewPlace, validationConfig);
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

function handleFormAvatarSubmit(evt) {
    evt.preventDefault();
    const linkInput = formAvatar.elements['link'].value;
    updateAvatar(linkInput)
        .then((result) => {
            profileImage.style.backgroundImage = `url(${result.avatar})`;
        })
        .catch((err) => {
            console.log(err);
        });

    closePopup(popupTypeAvatar);
    formAvatar.reset();
    clearValidation(formAvatar, validationConfig);
}

formAvatar.addEventListener('submit', handleFormAvatarSubmit);

getUserProfile()
    .then((result) => {
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
        profileImage.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => {
        console.log(err);
    });

