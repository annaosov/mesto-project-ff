export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', handleClosePopupByEsc);
};

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    popupElement.removeEventListener('keydown', handleClosePopupByEsc);
};

export function handleClosePopupByButton(evt) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
};

export function handleClosePopupByOverlay (evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

function handleClosePopupByEsc(evt) {
    if (evt.key == "Escape") {
        const popups = document.querySelectorAll('.popup');
        popups.forEach(item => {
            closePopup(item);
        });
    }
};