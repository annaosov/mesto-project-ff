import { openPopup } from './modal.js';
const cardTemplate = document.querySelector('#card-template').content;
const popup = document.querySelector('.popup_type_image');
const popupImage = popup.querySelector('.popup__image');
const popupCaption = popup.querySelector('.popup__caption');

export function createCard(card, onDelete, onLike, onImageClick) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    cardDeleteButton.addEventListener('click', function () {
        const deleteListItem = cardDeleteButton.closest('.card');
        onDelete(cardElement);
    });
  
    cardImage.addEventListener('click', function () {
        
        popupImage.src = card.link;
        popupImage.alt = card.name;
        popupCaption.textContent = card.name;
        onImageClick(popup);
    });
  
    cardLikeButton.addEventListener('click', function () {
        onLike(cardLikeButton);
    });
  
    return cardElement;
}
  
export function deleteCard(card) {
    card.remove();
}
  
export function handleLikeClick(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
}