export function createCard(card, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    
    cardDeleteButton.addEventListener('click', function () {
        const deleteListItem = cardDeleteButton.closest('.card');
        deleteCard(deleteListItem);
    });
  
    cardImage.addEventListener('click', function () {
      document.querySelector('.popup__image').src = card.link;
      document.querySelector('.popup__caption').textContent = card.name;
      const popup = document.querySelector('.popup_type_image');
      openPopup(popup);
    });
  
    cardLikeButton.addEventListener('click', function () {
      clickLikeButton(cardLikeButton);
    });
  
    return cardElement;
  }
  
  export function deleteCard(card) {
    card.remove();
  }
  
  function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
  }
  
  function clickLikeButton(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
  }