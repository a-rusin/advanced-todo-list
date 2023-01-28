import View from "./view.js";
import Model from "./model.js";

View.checkUserName(Model.userSettings.userName);
View.checkUserLocation(Model.userSettings.location);

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
});
