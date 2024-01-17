const popupCloseButtons = document.querySelectorAll('.popup__close');

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');

    popupCloseButtons.forEach(item => {
        item.addEventListener('click', (event) => {
            const popup = item.closest('.popup');
            closePopup(popup);
        });
    });

    popupElement.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(popupElement);
        }
    });

    function keydownEsc(evt) {
        if (evt.key == "Escape") {
            closePopup(popupElement);
            evt.target.removeEventListener('keydown', keydownEsc);
        }
    };

    document.addEventListener('keydown', keydownEsc);
};

export function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened')
}