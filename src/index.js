import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';

const places = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');

function iterateCards() {
    initialCards.forEach(item => {
        places.append(createCard(item, deleteCard))
    });
};
iterateCards();

profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
  });

profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
});

popupCloseButtons.forEach(item => {
    item.addEventListener('click', (event) => {
        const popup = item.closest('.popup');
        closePopup(popup);
    });
});

popups.forEach(item => {
    item.addEventListener('click', (evt) => {
        if(evt.target === evt.currentTarget) {
            closePopup(item);
        }
    });
});

const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    const nameInput = formEditProfile.elements.name.value;
    const jobInput = formEditProfile.elements.description.value;

    profileTitle .textContent = nameInput;
    profileDescription.textContent = jobInput;

    closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

const formNewPlace = document.forms['new-place'];

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    const nameInput = formNewPlace.elements['place-name'].value;
    const jobInput = formNewPlace.elements['link'].value;
    const newCard = {
        name: nameInput,
        link: jobInput
    }

    const allCards = document.querySelectorAll('.card');
    allCards.forEach((item) => {
        deleteCard(item);
    });

    initialCards.unshift(newCard);
    iterateCards();
    closePopup(popupTypeNewCard);
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

