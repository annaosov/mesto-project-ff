(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"c6e4de5c-a1eb-44c4-87e5-597d09502f16","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=document.querySelector("#card-template").content;function r(e,t,r,o,c){var a=n.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__image"),l=a.querySelector(".card__like-button");return u.src=e.link,u.alt=e.name,a.querySelector(".card__title").textContent=e.name,a.querySelector(".card__like-count").textContent=e.likes.length,c!==e.owner._id&&i.setAttribute("style","display: none"),e.likes.forEach((function(e){e._id===c&&l.classList.add("card__like-button_is-active")})),i.addEventListener("click",(function(){t(e._id,a)})),u.addEventListener("click",(function(){return o(e)})),l.addEventListener("click",(function(){r(e._id,l,a)})),a}function o(n,r){(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))})(n).then((function(e){console.log(e.message),r.remove()})).catch((function(e){console.log(e)}))}function c(n,r,o){r.classList.contains("card__like-button_is-active")?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){o.querySelector(".card__like-count").textContent=e.likes.length,r.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then((function(e){return t(e)}))}(n).then((function(e){o.querySelector(".card__like-count").textContent=e.likes.length,r.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)}))}function a(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",s)}function i(e){e.classList.remove("popup_is-opened"),e.removeEventListener("keydown",s)}function u(e){i(e.target.closest(".popup"))}function l(e){e.target===e.currentTarget&&i(e.target)}function s(e){"Escape"===e.key&&document.querySelector(".popup_is-opened")&&i(document.querySelector(".popup_is-opened"))}function d(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){f(e,n,t)}))}var f=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var _,y=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_avatar"),k=document.querySelector(".popup_type_image"),E=document.forms["edit-profile"],q=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),A=document.forms["new-place"],x=document.forms.avatar,U=document.querySelectorAll(".popup__close"),w=k.querySelector(".popup__image"),T=k.querySelector(".popup__caption"),j={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function O(e){w.src=e.link,w.alt=e.name,T.textContent=e.name,a(k)}function B(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}))]).then((function(e){var t,n,a=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];q.textContent=i.name,L.textContent=i.about,C.style.backgroundImage="url(".concat(i.avatar,")"),_=i._id,u.forEach((function(e){y.append(r(e,o,c,O,_))}))})).catch((function(e){console.log(e)})),U.forEach((function(e){e.addEventListener("click",u)})),b.addEventListener("click",l),S.addEventListener("click",l),g.addEventListener("click",l),k.addEventListener("click",l),h.addEventListener("click",(function(){var e=b.querySelector(".popup__button");a(b),d(E,j),E.elements.name.value=q.textContent,E.elements.description.value=L.textContent,e.disabled=!0,e.classList.add(j.inactiveButtonClass)})),v.addEventListener("click",(function(){a(S)})),C.addEventListener("click",(function(){a(g)})),E.addEventListener("submit",(function(n){n.preventDefault(),B(!0,b);var r=E.elements.name.value,o=E.elements.description.value;(function(n,r){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return t(e)}))})(r,o).then((function(e){q.textContent=r,L.textContent=o,console.log("Профиль успешно обновлен."),i(b)})).catch((function(e){console.log(e)})).finally((function(){B(!1,b)}))})),A.addEventListener("submit",(function(n){var a,u;n.preventDefault(),B(!0,S),(a=A.elements["place-name"].value,u=A.elements.link.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:u})}).then((function(e){return t(e)}))).then((function(e){y.prepend(r(e,o,c,O,_)),A.reset(),i(S),d(A,j)})).catch((function(e){console.log(e)})).finally((function(){B(!1,S)}))})),x.addEventListener("submit",(function(n){var r;n.preventDefault(),B(!0,g),(r=x.elements.link.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)}))).then((function(e){C.style.backgroundImage="url(".concat(e.avatar,")"),x.reset(),i(g),d(x,j)})).catch((function(e){console.log(e)})).finally((function(){B(!1,g)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(j)})();