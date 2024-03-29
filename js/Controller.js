import View from "./View.js";
import Model from "./Model.js";

View.checkUserName(Model.userSettings.userName);
View.checkUserGender(Model.userSettings.gender);
View.checkUserTheme(Model.userSettings.theme);
View.renderTasks(Model.getTasksFromLocalStorage());
View.setDefaultValueFromData(Model.userSettings);
View.checkProgressBarNumbers(Model.getTastStatus()[1], Model.getTastStatus()[0], Model.getTastStatus()[2]);
View.showCurrentDateAndTime();
if (!Model.isShowManualOnStart()) {
    View.deleteAndCloseManual();
} else {
    View.showManual();
}
const userTown = Model.userSettings.location;
Model.getWeather(userTown, true).then((data) => View.showWeather(data));

document.addEventListener("click", function (e) {
    if (e.target.hasAttribute("data-scroll-up")) {
        e.preventDefault();
        View.scrollUp();
    }

    if (e.target.getAttribute("data-add-form") === "cutForm") {
        View.showFullForm();
    }

    if (e.target.hasAttribute("data-hide-full-form")) {
        View.showShortForm();
        View.clearInputsDataTask();
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
        View.checkProgressBarNumbers(Model.getTastStatus()[1], Model.getTastStatus()[0], Model.getTastStatus()[2]);
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
        View.checkProgressBarNumbers(Model.getTastStatus()[1], Model.getTastStatus()[0], Model.getTastStatus()[2]);
    }

    if (e.target.hasAttribute("data-filter-tasks")) {
        const filter = Model.filterTasksByFilter(e.target.getAttribute("data-filter-tasks"));
        View.renderDeletedTasks(filter);
        View.changeHeaderTheme(e.target.getAttribute("data-filter-tasks"));
        View.hideMenuFilterMobile();
    }

    if (e.target.hasAttribute("data-open-settings-id")) {
        if (e.target.tagName.toLowerCase() === "span") {
            View.openTaskSettings(e.target.closest(".item-task__btn-settings").nextElementSibling);
        } else if (e.target.tagName.toLowerCase() === "button") {
            View.openTaskSettings(e.target.nextElementSibling);
        }
    }

    if (e.target.hasAttribute("data-delete-task-id")) {
        e.preventDefault();
        Model.deleteTask(+e.target.getAttribute("data-delete-task-id"));
        View.deleteTask(+e.target.getAttribute("data-delete-task-id"));
        View.checkProgressBarNumbers(Model.getTastStatus()[1], Model.getTastStatus()[0], Model.getTastStatus()[2]);
    }

    if (e.target.hasAttribute("data-edit-task-id")) {
        e.preventDefault();
        View.hideTaskSettings(e.target.closest(".item-settings.active"));
        const data = Model.getTaskById(+e.target.getAttribute("data-edit-task-id"));
        View.showPopUpEditTask(data);
    }

    if (e.target.hasAttribute("data-cancel-edited-task")) {
        e.preventDefault();
        View.hidePopUpEditTask();
    }

    if (e.target.hasAttribute("data-save-edited-task")) {
        e.preventDefault();
        console.log("saved btn click");
        const data = View.getEditedTask();
        Model.editTaskProps(+e.target.getAttribute("data-save-edited-task"), data);
        if (window.location.href === "https://a-rusin.github.io/advanced-todo-list/") {
            window.location.href = "https://a-rusin.github.io/advanced-todo-list/";
        } else {
            window.location.href = "/";
        }
    }

    if (e.target.hasAttribute("data-duplicate-task-id")) {
        e.preventDefault();
        const newData = Model.duplicateTask(+e.target.getAttribute("data-duplicate-task-id"));
        console.log(newData);
        View.duplicateTask(newData);
        View.hideTaskSettings(e.target.closest(".item-settings.active"));
    }

    if (e.target.hasAttribute("data-manual-slider-btn-next")) {
        View.showNextSlide(+e.target.getAttribute("data-manual-slider-btn-next"));
        if (+e.target.getAttribute("data-manual-slider-btn-next") === 1) {
            const userName = View.checkUserNameInManual();
            Model.setUserNameFromManual(userName);
        }
    }

    if (e.target.hasAttribute("data-manual-slider-btn-finish")) {
        View.deleteAndCloseManual();
        Model.hideFirstManualOnStart();
        if (window.location.href === "https://a-rusin.github.io/advanced-todo-list/") {
            window.location.href = "https://a-rusin.github.io/advanced-todo-list/";
        } else {
            window.location.href = "/";
        }
    }

    if (e.target.hasAttribute("data-clear-items")) {
        if (e.target.getAttribute("data-clear-items") === "all") {
            View.toggleCheckAllClearItems(e.target.checked);
        }
    }

    if (e.target.hasAttribute("data-select-filter-mobile")) {
        View.showFiltersMobile();
    }
});

const searchForm = document.querySelector("[data-search-tasks]");

searchForm.addEventListener("input", function (e) {
    const filteredData = Model.searchTasksByName(e.target.value, "all");
    View.renderTasks(filteredData);
});
