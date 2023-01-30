import View from "./View.js";
import Model from "./Model.js";

View.checkUserName(Model.userSettings.userName);
View.checkUserTheme(Model.userSettings.theme);
View.renderTasksOnStart(Model.getTasksFromLocalStorage());
View.setDefaultValueFromData(Model.userSettings);

document.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-add-form") === "cutForm") {
        View.showFullForm();
    }

    if (e.target.hasAttribute("data-hide-full-form")) {
        View.showShortForm();
    }

    if (e.target.hasAttribute("data-open-settings")) {
        View.showPopUpSettings();
    }

    if (e.target.hasAttribute("data-close-settings")) {
        View.hidePopUpSettings();
    }

    if (e.target.hasAttribute("data-post-task")) {
        const isAdd = View.addTask(View.getInputsDataTask());
        Model.addNewTaskToLocalStorage(View.getInputsDataTask());
        if (isAdd) {
            View.clearInputsDataTask();
        }
    }

    if (e.target.hasAttribute("data-save-settings")) {
        e.preventDefault();
        const isSuccessful = Model.changeSettings(View.getInputsDataSettings());

        if (isSuccessful) {
            // only for testing on github pages
            if (window.location.href === "https://a-rusin.github.io/advanced-todo-list/") {
                window.location.href = "https://a-rusin.github.io/advanced-todo-list/";
            } else {
                window.location.href = "/";
            }
        } else {
            alert("Заполните все поля!");
        }
    }

    if (e.target.hasAttribute("data-priorety-open-select")) {
        View.showPrioretyList();
    }

    if (e.target.hasAttribute("data-priorety-select-priorety")) {
        View.removeActiveClassPrioretyItems();
        e.target.classList.add("active");
        View.hidePrioretyList(e.target.classList[1]);
    }
});
