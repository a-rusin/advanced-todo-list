import View from "./View.js";
import Model from "./Model.js";

View.checkUserName(Model.userSettings.userName);
View.checkUserTheme(Model.userSettings.theme);

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
        console.log("post!");
        View.addTask(View.getInputsDataTask());
        View.clearInputsDataTask();
    }

    if (e.target.hasAttribute("data-save-settings")) {
        e.preventDefault();
        console.log("test");
        console.log(View.getInputsDataSettings());
        Model.changeSettings(View.getInputsDataSettings());

        // only for testing on github pages
        if (window.location.href === "https://a-rusin.github.io/advanced-todo-list/") {
            window.location.href = "https://a-rusin.github.io/advanced-todo-list/";
        } else {
            window.location.href = "/";
        }
    }
});
