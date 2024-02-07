import './pages/index.css';
import { getInitialCards, getUserProfile, updateProfile, updateAvatar, addNewCard } from './scripts/api.js'
import { createCard, deleteCard, handleLikeClick } from './scripts/card.js';
import { openPopup, closePopup, handleClosePopupByButton, handleClosePopupByOverlay } from './scripts/modal.js';
import { clearValidation, enableValidation } from './scripts/validation.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const popupTypeImage = document.querySelector('.popup_type_image');
const formEditProfile = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const formNewPlace = document.forms['new-place'];
const formAvatar = document.forms['avatar'];
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let userId;

Promise.all([getUserProfile(), getInitialCards()])
    .then(([userProfile, cards]) => {
        profileTitle.textContent = userProfile.name;
        profileDescription.textContent = userProfile.about;
        profileImage.style.backgroundImage = `url(${userProfile.avatar})`;
        userId = userProfile._id;

        cards.forEach(item => {
            cardsContainer.append(createCard(item, deleteCard, handleLikeClick, onImageClick, userId))
        });
    })
    .catch((err) => {
        console.log(err);
    });

popupCloseButtons.forEach(item => {
    item.addEventListener('click', handleClosePopupByButton);
});

popupTypeEdit.addEventListener('click', handleClosePopupByOverlay);

popupTypeNewCard.addEventListener('click', handleClosePopupByOverlay);

popupTypeAvatar.addEventListener('click', handleClosePopupByOverlay);

popupTypeImage.addEventListener('click', handleClosePopupByOverlay);

function editProfile() {
    const popupSubmitButton = popupTypeEdit.querySelector('.popup__button');

    openPopup(popupTypeEdit);
    clearValidation(formEditProfile, validationConfig);

    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
    popupSubmitButton.disabled = true;
    popupSubmitButton.classList.add(validationConfig.inactiveButtonClass);
};

profileEditButton.addEventListener('click', editProfile);

profileAddButton.addEventListener('click', function () {
    openPopup(popupTypeNewCard);
});

profileImage.addEventListener('click', function () {
    openPopup(popupTypeAvatar);
});

function onImageClick(card) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;

    openPopup(popupTypeImage);
};

function renderLoading(isLoading, popupType) {
    const popupSubmitButton = popupType.querySelector('.popup__button');
    
    if (isLoading) {
        popupSubmitButton.textContent = 'Сохранение...';
    } else {
        popupSubmitButton.textContent = 'Сохранить';
    }
}

function handleFormEditProfileSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, popupTypeEdit);

    const nameInput = formEditProfile.elements.name.value;
    const jobInput = formEditProfile.elements.description.value;

    updateProfile(nameInput, jobInput)
        .then((result) => {
            profileTitle.textContent = nameInput;
            profileDescription.textContent = jobInput;

            console.log('Профиль успешно обновлен.');
            closePopup(popupTypeEdit);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, popupTypeEdit);
        });
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

function handleFormNewPlaceSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, popupTypeNewCard);

    const nameInput = formNewPlace.elements['place-name'].value;
    const linkInput = formNewPlace.elements['link'].value;

    addNewCard(nameInput, linkInput)
        .then((result) => {
            cardsContainer.prepend(createCard(result, deleteCard, handleLikeClick, onImageClick, userId));
            formNewPlace.reset();

            closePopup(popupTypeNewCard);
            clearValidation(formNewPlace, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, popupTypeNewCard);
        });
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

function handleFormAvatarSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, popupTypeAvatar);

    const linkInput = formAvatar.elements['link'].value;

    updateAvatar(linkInput)
        .then((result) => {
            profileImage.style.backgroundImage = `url(${result.avatar})`;
            formAvatar.reset();
            
            closePopup(popupTypeAvatar);
            clearValidation(formAvatar, validationConfig);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, popupTypeAvatar);
        }); 
}

formAvatar.addEventListener('submit', handleFormAvatarSubmit);

enableValidation(validationConfig);