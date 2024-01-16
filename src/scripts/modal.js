const formEditProfile = document.forms['edit-profile'];
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupTypeEdit = document.querySelector('.popup_type_edit');

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');

    if (popupTypeEdit == popupElement) {
        formEditProfile.elements.name.value = document.querySelector('.profile__title').textContent;
        formEditProfile.elements.description.value = document.querySelector('.profile__description').textContent;
    };

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