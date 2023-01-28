const View = (function () {
    // HEADER ======================================================================== //

    const header = {
        userName: document.querySelector("[data-user-name]"),
        userLocation: document.querySelector("[data-user-location]"),
    };

    const checkUserName = (user) => {
        header.userName.textContent = user;
    };

    const checkUserLocation = (user) => {
        header.userLocation.textContent = user;
    };

    // pop up settings
    const popUpSettings = {
        window: document.querySelector("[data-pop-up-settings]"),
        closeBtn: document.querySelector("[data-close-settings]"),
    };

    const showPopUpSettings = () => {
        popUpSettings.window.classList.add("active");
    };

    const hidePopUpSettings = () => {
        popUpSettings.window.classList.remove("active");
    };

    // ADD TASK ======================================================================== //

    // add from
    const addTaskForm = {
        cutForm: document.querySelector("#add-task-form-hidden-state"),
        fullForm: document.querySelector("#add-task-form-open-state"),
        fullFormCloseBtn: document.querySelector("#close-full-form-btn"),
    };

    const showFullForm = () => {
        addTaskForm.cutForm.style.display = "none";
        addTaskForm.fullForm.style.display = "block";
    };

    const showShortForm = () => {
        addTaskForm.cutForm.style.display = "flex";
        addTaskForm.fullForm.style.display = "none";
    };

    const taskElemenents = {
        itemsList: document.querySelector("[data-tasks]"),
        inputTitle: document.querySelector(".add-container__title"),
        inputDescription: document.querySelector(".add-container__description"),
        inputTags: document.querySelector(".add-container__tags"),
    };

    const getInputsDataTask = () => {
        return {
            taskName: taskElemenents.inputTitle.value,
            taskDescription: taskElemenents.inputDescription.value,
            taskTags: taskElemenents.inputTags.value,
            test: null,
        };
    };

    const addTask = (data) => {
        const popUp = `
        <li class="tasks__item item-task">
        <div class="item-task__checkbox"></div>
        <div class="item-task__content">
            <div class="item-task__name">${data.taskName}</div>
            <div class="item-task__description">
            ${data.taskDescription}
            </div>
            <div class="item-task__tags tag">
                <button class="tag__time">15.02</button>
                <ul class="tag__category">
                    <li class="tag__item">#${data.taskTags}</li>
                </ul>
            </div>
        </div>
        <div class="item-task__priority item-task__priority_red">
            <img src="./img/FlagBanner.svg" alt="" />
        </div>
        <div class="item-task__btn-setting-block">
            <div class="item-task__btn-settings-content">
                <button class="item-task__btn-settings">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </div>
    </li>
        `;
        taskElemenents.itemsList.insertAdjacentHTML("afterbegin", popUp);
    };

    const clearInputsDataTask = () => {
        taskElemenents.inputTitle.value = "";
        taskElemenents.inputDescription.value = "";
        taskElemenents.inputTags.value = "";
    };

    return {
        showFullForm: showFullForm,
        showShortForm: showShortForm,
        showPopUpSettings: showPopUpSettings,
        hidePopUpSettings: hidePopUpSettings,
        checkUserName: checkUserName,
        checkUserLocation: checkUserLocation,
        addTask: addTask,
        getInputsDataTask: getInputsDataTask,
        clearInputsDataTask: clearInputsDataTask,
    };
})();

export default View;
