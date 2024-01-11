export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    }

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
}