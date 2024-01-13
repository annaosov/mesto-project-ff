const formEditProfile = document.forms['edit-profile'];

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    formEditProfile.elements.name.value = document.querySelector('.profile__title').textContent;
    formEditProfile.elements.description.value = document.querySelector('.profile__description').textContent;
    }

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
}