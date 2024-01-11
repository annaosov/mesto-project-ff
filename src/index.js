import './pages/index.css';
import { initialCards, createCard, deleteCard } from './scripts/cards.js';
import { openPopup } from './scripts/modals.js';

const places = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

initialCards.forEach(item => {
    places.append(createCard(item, deleteCard))
})

profileEditButton.addEventListener('click', function () {
    let popup = document.querySelector('.popup_type_edit');
    openPopup(popup);
  });

profileAddButton.addEventListener('click', function () {
    let popup = document.querySelector('.popup_type_new-card');
    openPopup(popup);
});

