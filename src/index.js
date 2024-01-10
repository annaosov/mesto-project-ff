import './pages/index.css';
import { initialCards } from './scripts/cards.js';
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const places = document.querySelector('.places__list');

function createCard(card, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.card');
        deleteCard(listItem);
    });

    return cardElement;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach(item => {
    places.append(createCard(item, deleteCard))
})