import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleLikeClick } from './scripts/card.js';
import { openPopup, closePopup, handleClosePopupByButton, handleClosePopupByOverlay } from './scripts/modal.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.forms['new-place'];
const popupCloseButtons = document.querySelectorAll('.popup__close');

function iterateCards() {
    initialCards.forEach(item => {
        cardsContainer.append(createCard(item, deleteCard, handleLikeClick, openPopup))
    });
};
iterateCards();

popupCloseButtons.forEach(item => {
    item.addEventListener('click', handleClosePopupByButton);
});

popupTypeEdit.addEventListener('click', handleClosePopupByOverlay);

popupTypeNewCard.addEventListener('click', handleClosePopupByOverlay);

profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
  });

profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
});

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

    cardsContainer.prepend(createCard(newCard, deleteCard))
    closePopup(popupTypeNewCard);
    formNewPlace.reset();
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

