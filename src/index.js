import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';

const places = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formNewPlace = document.forms['new-place'];

function iterateCards() {
    initialCards.forEach(item => {
        places.append(createCard(item, deleteCard))
    });
};
iterateCards();

profileEditButton.addEventListener('click', function () {
    openPopup(popupTypeEdit);
    formEditProfile.elements.name.value = document.querySelector('.profile__title').textContent;
    formEditProfile.elements.description.value = document.querySelector('.profile__description').textContent;
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

    const allCards = document.querySelectorAll('.card');
    allCards.forEach((item) => {
        deleteCard(item);
    });

    initialCards.unshift(newCard);
    iterateCards();
    closePopup(popupTypeNewCard);
    formNewPlace.reset();
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

