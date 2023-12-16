// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const places = document.querySelector('.places__list');

function showCard(card) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    places.append(cardElement); 
}

initialCards.forEach(item => {
    showCard(item);
})
