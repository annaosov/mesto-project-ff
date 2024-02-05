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
    
    cardDeleteButton.addEventListener('click', function () {
        onDelete(cardElement);
    });
  
    cardImage.addEventListener('click', () => onImageClick(card)); 
  
    cardLikeButton.addEventListener('click', function () {
        fetch(`https://nomoreparties.co/v1/wff-cohort-6/cards/likes/${card._id}`, {
            method: 'PUT',
            headers: {
                authorization: 'c6e4de5c-a1eb-44c4-87e5-597d09502f16',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            cardElement.querySelector('.card__like-count').textContent = result.likes.length;
            onLike(cardLikeButton);
        });
    });
  
    return cardElement;
}
  
export function deleteCard(card) {
    card.remove();
}
  
export function handleLikeClick(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
}