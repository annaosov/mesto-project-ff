//import { getUserProfile } from './api.js';
import { putLike } from './api.js';
import { removeLike } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(card, onDelete, onLike, onImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__like-count').textContent = card.likes.length;

    //getUserProfile()
        //.then((result) => {
            //const userId = result._id;
        //})
        //.catch((err) => {
            //console.log(err);
        //});

    //console.log(userId);
    //card.likes.forEach(item => {
        //if (item._id == userId) {
            //cardLikeButton.classList.add('card__like-button_is-active');
        //}
    //});
    
    cardDeleteButton.addEventListener('click', function () {
        onDelete(cardElement);
    });
  
    cardImage.addEventListener('click', () => onImageClick(card)); 
  
    cardLikeButton.addEventListener('click', function () {
        if (cardLikeButton.classList.contains('card__like-button_is-active')) {
            removeLike(card._id)
                .then((result) => {
                    cardElement.querySelector('.card__like-count').textContent = result.likes.length;
                    onLike(cardLikeButton);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            putLike(card._id)
                .then((result) => {
                    cardElement.querySelector('.card__like-count').textContent = result.likes.length;
                    onLike(cardLikeButton);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    });
  
    return cardElement;
}
  
export function deleteCard(card) {
    card.remove();
}
  
export function handleLikeClick(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
}