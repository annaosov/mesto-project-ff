import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';

const places = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');

function iterateCards() {
    initialCards.forEach(item => {
        places.append(createCard(item, deleteCard))
    });
};
iterateCards();

profileEditButton.addEventListener('click', function () {
    const popup = document.querySelector('.popup_type_edit');
    openPopup(popup);
  });

profileAddButton.addEventListener('click', function () {
    const popup = document.querySelector('.popup_type_new-card');
    openPopup(popup);
});

popupCloseButtons.forEach(item => {
    item.addEventListener('click', (event) => {
        const popup = item.closest('.popup');
        closePopup(popup);
    });
});

const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    const nameInput = formEditProfile.elements.name.value;
    const jobInput = formEditProfile.elements.description.value;
    const popup = document.querySelector('.popup_type_edit');

    profileTitle .textContent = nameInput;
    profileDescription.textContent = jobInput;

    closePopup(popup);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

const formNewPlace = document.forms['new-place'];

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    const nameInput = formNewPlace.elements['place-name'].value;
    const jobInput = formNewPlace.elements['link'].value;
    const popup = document.querySelector('.popup_type_new-card');
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
    closePopup(popup);
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

