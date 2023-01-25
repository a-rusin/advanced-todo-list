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

const switchMode = document.querySelector(".header__gretting-text__blue");

switchMode.addEventListener("click", function () {
    let theme = document.querySelector("#theme");

    if (theme.getAttribute("href") == "./css/light-mode.css") {
        theme.href = "./css/dark-mode.css";
    } else {
        theme.href = "./css/light-mode.css";
    }
});
