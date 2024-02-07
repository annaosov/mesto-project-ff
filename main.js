(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"c6e4de5c-a1eb-44c4-87e5-597d09502f16","Content-Type":"application/json"}},t=function(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},n=document.querySelector("#card-template").content;function o(o,r,c,a){var i=n.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__delete-button"),s=i.querySelector(".card__image"),l=i.querySelector(".card__like-button");return i.querySelector(".card__image").src=o.link,i.querySelector(".card__image").alt=o.name,i.querySelector(".card__title").textContent=o.name,i.querySelector(".card__like-count").textContent=o.likes.length,t().then((function(e){e._id!==o.owner._id&&u.setAttribute("style","display: none"),o.likes.forEach((function(t){t._id===e._id&&l.classList.add("card__like-button_is-active")}))})).catch((function(e){console.log(e)})),u.addEventListener("click",(function(){var t;(t=o._id,fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){console.log(e.message),r(i)})).catch((function(e){console.log(e)}))})),s.addEventListener("click",(function(){return a(o)})),l.addEventListener("click",(function(){var t;l.classList.contains("card__like-button_is-active")?(t=o._id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){i.querySelector(".card__like-count").textContent=e.likes.length,c(l)})).catch((function(e){console.log(e)})):function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(o._id).then((function(e){i.querySelector(".card__like-count").textContent=e.likes.length,c(l)})).catch((function(e){console.log(e)}))})),i}function r(e){e.remove()}function c(e){e.classList.toggle("card__like-button_is-active")}function a(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",l)}function i(e){e.classList.remove("popup_is-opened"),e.removeEventListener("keydown",l)}function u(e){i(e.target.closest(".popup"))}function s(e){e.target===e.currentTarget&&i(e.target)}function l(e){"Escape"===e.key&&document.querySelector(".popup_is-opened")&&i(document.querySelector(".popup_is-opened"))}function d(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){f(e,n,t)}))}var f=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var _=document.querySelector(".places__list"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_avatar"),k=document.querySelector(".popup_type_image"),g=document.forms["edit-profile"],q=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),L=document.querySelector(".profile__image"),C=document.forms["new-place"],j=document.forms.avatar,A=document.querySelectorAll(".popup__close"),x=k.querySelector(".popup__image"),P=k.querySelector(".popup__caption"),U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function w(e){x.src=e.link,x.alt=e.name,P.textContent=e.name,a(k)}function T(e,t){t.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}A.forEach((function(e){e.addEventListener("click",u)})),v.addEventListener("click",s),b.addEventListener("click",s),S.addEventListener("click",s),k.addEventListener("click",s),y.addEventListener("click",(function(){var e=v.querySelector(".popup__button");a(v),d(g,U),g.elements.name.value=q.textContent,g.elements.description.value=E.textContent,e.disabled=!0,e.classList.add(U.inactiveButtonClass)})),h.addEventListener("click",(function(){a(b)})),L.addEventListener("click",(function(){a(S)})),g.addEventListener("submit",(function(t){t.preventDefault(),T(!0,v);var n=g.elements.name.value,o=g.elements.description.value;q.textContent=n,E.textContent=o,function(t,n){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(n,o).then((function(e){console.log("Профиль успешно обновлен."),i(v)})).catch((function(e){console.log(e)})).finally((function(){T(!1,v)}))})),C.addEventListener("submit",(function(t){var n,a;t.preventDefault(),T(!0,b),(n=C.elements["place-name"].value,a=C.elements.link.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:a})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){_.prepend(o(e,r,c,w)),C.reset(),i(b),d(C,U)})).catch((function(e){console.log(e)})).finally((function(){T(!1,b)}))})),j.addEventListener("submit",(function(t){var n;t.preventDefault(),T(!0,S),(n=j.elements.link.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){L.style.backgroundImage="url(".concat(e.avatar,")"),j.reset(),i(S),d(j,U)})).catch((function(e){console.log(e)})).finally((function(){T(!1,S)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);p(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),p(n,o,t)}))}))}(t,e)}))}(U),Promise.all([t(),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,a=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){s=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];q.textContent=i.name,E.textContent=i.about,L.style.backgroundImage="url(".concat(i.avatar,")"),u.forEach((function(e){_.append(o(e,r,c,w))}))})).catch((function(e){console.log(e)}))})();