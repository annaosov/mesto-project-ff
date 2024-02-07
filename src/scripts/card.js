import { deleteSelfCard, putLike, removeLike } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, onDelete, onLike, onImageClick, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__like-count').textContent = card.likes.length;

    if (userId !== card.owner._id) {
        cardDeleteButton.setAttribute('style',
        `display: none`);
    };
    card.likes.forEach(item => {
        if (item._id === userId) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    });
    
    cardDeleteButton.addEventListener('click', function () {
        onDelete(card._id, cardElement);
    });
  
    cardImage.addEventListener('click', () => onImageClick(card)); 
  
    cardLikeButton.addEventListener('click', function () {
        onLike(card._id, cardLikeButton, cardElement);
    });

    return cardElement;
}
  
export function deleteCard(cardId, cardElement) {
    deleteSelfCard(cardId)
        .then((result) => {
            console.log(result.message);
            cardElement.remove();
        })
        .catch((err) => {
            console.log(err);
        });
}
  
export function handleLikeClick(cardId, cardLikeButton, cardElement) {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
        removeLike(cardId)
            .then((result) => {
                cardElement.querySelector('.card__like-count').textContent = result.likes.length;
                cardLikeButton.classList.toggle('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        putLike(cardId)
            .then((result) => {
                cardElement.querySelector('.card__like-count').textContent = result.likes.length;
                cardLikeButton.classList.toggle('card__like-button_is-active');
            })
            .catch((err) => {
                console.log(err);
            });
    }
}