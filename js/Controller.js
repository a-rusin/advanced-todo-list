import View from "./View.js";
import Model from "./Model.js";

View.checkUserName(Model.userSettings.userName);
View.checkUserTheme(Model.userSettings.theme);
View.renderTasksOnStart(Model.getTasksFromLocalStorage());
View.setDefaultValueFromData(Model.userSettings);
View.checkProgressBarNumbers(Model.getTastStatus()[1], Model.getTastStatus()[0]);

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
        const isAdd = View.addTask(View.getInputsDataTask(), Model.generateNewId());
        Model.addNewTaskToLocalStorage(View.getInputsDataTask(Model.generateNewId()));
        if (isAdd) {
            View.clearInputsDataTask();
        }
        View.checkProgressBarNumbers(Model.getTastStatus()[1], Model.getTastStatus()[0]);
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

    if (e.target.hasAttribute("data-chekbox-task-item")) {
        if (e.target.checked) {
            View.changeTaskStatus(e.target.closest(".item-task"), true);
            Model.changeTaskStatus(+e.target.closest(".item-task").getAttribute("data-task-id"), true);
        } else {
            View.changeTaskStatus(e.target.closest(".item-task"), false);
            Model.changeTaskStatus(+e.target.closest(".item-task").getAttribute("data-task-id"), false);
        }
        View.checkProgressBarNumbers(Model.getTastStatus()[1], Model.getTastStatus()[0]);
    }

    if (e.target.hasAttribute("data-filter-tasks")) {
        const filter = Model.filterTasksByFilter(e.target.getAttribute("data-filter-tasks"));
        View.renderTaskByFilter(filter);
    }
});
