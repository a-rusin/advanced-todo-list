const openAddForm = document.querySelector("#add-task-form-hidden-state");
const hideAddForm = document.querySelector("#add-task-form-open-state");
const addFormCloseBtn = document.querySelector("#add-form-close-btn");

openAddForm.addEventListener("click", function () {
    this.style.display = "none";
    hideAddForm.style.display = "block";
});

addFormCloseBtn.addEventListener("click", function () {
    openAddForm.style.display = "flex";
    hideAddForm.style.display = "none";
});

// const openSettingsBtn = document.querySelector("#header-open-settings");
// const popUpSettings = document.querySelector("#pop-up-settings");

// openSettingsBtn.addEventListener("click", function () {
//     popUpSettings.classList.add("active");
// });

// window.addEventListener("click", function (e) {
//     if (e.target.classList.contains("popup__overlay")) {
//         popUpSettings.classList.remove("active");
//     }
// });

// document.querySelector(".item-task__btn-settings-content").addEventListener("click", function () {
//     const markup = `
//     <ul class="item-settings">
//         <li class="item-settings__item">
//             <a class="item-settings__link" href="#">
//                 <img src="./img/PencilLine.svg" alt="" class="item-settings__icon" />
//                 <div class="item-settings__text">Редактировать</div>
//             </a>
//         </li>
//         <li class="item-settings__item">
//             <a class="item-settings__link" href="#">
//                 <img src="./img/Copy.svg" alt="" class="item-settings__icon" />
//                 <div class="item-settings__text">Дублировать</div>
//             </a>
//         </li>
//         <li class="item-settings__item">
//             <a class="item-settings__link" href="#">
//                 <img src="./img/Trash.svg" alt="" class="item-settings__icon" />
//                 <div class="item-settings__text">Удалить</div>
//             </a>
//         </li>
//     </ul>
//     `;
//     this.insertAdjacentHTML("beforeend", markup);
// });
