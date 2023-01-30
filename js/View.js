const View = (function () {
    // HEADER ======================================================================== //

    const header = {
        userName: document.querySelector("[data-user-name]"),
        userLocation: document.querySelector("[data-user-location]"),
        cssTheme: document.querySelector("#theme"),
    };

    const checkUserName = (user) => {
        header.userName.textContent = user;
    };

    const checkUserTheme = (theme) => {
        header.cssTheme.href = `./css/${theme}-mode.css`;
    };

    const checkUserLocation = (user) => {
        header.userLocation.textContent = user;
    };

    // POP UP ================================================================================ //

    // pop up settings
    const popUpSettings = {
        window: document.querySelector("[data-pop-up-settings]"),
        closeBtn: document.querySelector("[data-close-settings]"),
        inputName: document.querySelector(".settings__input"),
        inputLightTheme: document.querySelector("#radio-1-light-theme"),
        inputDarkTheme: document.querySelector("#radio-1-dark-theme"),
    };

    const setDefaultValueFromData = (data) => {
        if (data.userName === "Пользователь") {
            popUpSettings.inputName.value = "";
        } else {
            popUpSettings.inputName.value = data.userName;
        }

        if (data.theme === "light") {
            popUpSettings.inputLightTheme.checked = true;
            popUpSettings.inputDarkTheme.checked = false;
        } else if (data.theme === "dark") {
            popUpSettings.inputDarkTheme.checked = true;
            popUpSettings.inputLightTheme.checked = false;
        }
    };

    const showPopUpSettings = () => {
        popUpSettings.window.classList.add("active");
    };

    const hidePopUpSettings = () => {
        popUpSettings.window.classList.remove("active");
    };

    const getInputsDataSettings = () => {
        return {
            userName: popUpSettings.inputName.value,
            theme: popUpSettings.inputLightTheme.checked ? "light" : "dark",
        };
    };

    // ADD TASK ======================================================================== //

    // add from
    const addTaskForm = {
        cutForm: document.querySelector("#add-task-form-hidden-state"),
        fullForm: document.querySelector("#add-task-form-open-state"),
        fullFormCloseBtn: document.querySelector("#close-full-form-btn"),
        selectPrioretyBtn: document.querySelector("[data-priorety-open-select]"),
        selectPrioretyList: document.querySelector("[data-priorety-open-select-list]"),
        selectPrioretyItems: document.querySelectorAll("[data-priorety-select-priorety]"),
    };

    const showPrioretyList = () => {
        addTaskForm.selectPrioretyList.classList.toggle("active");
    };

    const hidePrioretyList = (classItem) => {
        addTaskForm.selectPrioretyList.classList.remove("active");
        switch (classItem) {
            case "add-container__priorety-item_low":
                addTaskForm.selectPrioretyBtn.style.background = "#41a77c";
                addTaskForm.selectPrioretyBtn.style.color = "#fff";
                addTaskForm.selectPrioretyBtn.textContent = "Низкий";
                break;
            case "add-container__priorety-item_medium":
                addTaskForm.selectPrioretyBtn.style.background = "#be9e2c";
                addTaskForm.selectPrioretyBtn.style.color = "#fff";
                addTaskForm.selectPrioretyBtn.textContent = "Средний";
                break;
            case "add-container__priorety-item_high":
                addTaskForm.selectPrioretyBtn.style.background = "#a65555";
                addTaskForm.selectPrioretyBtn.style.color = "#fff";
                addTaskForm.selectPrioretyBtn.textContent = "Высокий";
                break;
            default:
                break;
        }
    };

    const removeActiveClassPrioretyItems = () => {
        addTaskForm.selectPrioretyItems.forEach((item) => {
            item.classList.remove("active");
        });
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

    const getInputsDataTask = (id) => {
        let priorety = Array.from(addTaskForm.selectPrioretyItems).find((item) => item.classList.contains("active"));
        if (priorety) {
            priorety = priorety.getAttribute("data-priorety-select-priorety");
        } else {
            priorety = "";
        }
        const tags = taskElemenents.inputTags.value.length === 0 ? [] : taskElemenents.inputTags.value.split(",");
        return {
            id: id,
            name: taskElemenents.inputTitle.value,
            description: taskElemenents.inputDescription.value,
            tags: tags,
            priorety: priorety,
            status: "in progress",
        };
    };

    const definePriortyClass = (priorety) => {
        let priortyClass = "item-task__priority";
        switch (priorety) {
            case "low":
                priortyClass += " item-task__priority_green";
                break;
            case "medium":
                priortyClass += " item-task__priority_yellow";
                break;
            case "high":
                priortyClass += " item-task__priority_red";
                break;
            default:
                break;
        }
        return priortyClass;
    };

    const defineTaskClass = (priorety) => {
        let taskClass = "tasks__item item-task";
        let isCheked;
        switch (priorety) {
            case "done":
                taskClass += " active";
                isCheked = true;
                break;
            case "in progress":
                taskClass += " ";
                isCheked = false;
                break;
            default:
                break;
        }
        return [taskClass, isCheked];
    };

    const clearInputsDataTask = () => {
        taskElemenents.inputTitle.value = "";
        taskElemenents.inputDescription.value = "";
        taskElemenents.inputTags.value = "";
        removeActiveClassPrioretyItems();
        hidePrioretyList();
        addTaskForm.selectPrioretyBtn.style.background = "#fff";
        addTaskForm.selectPrioretyBtn.style.color = "#8b8da1";
        addTaskForm.selectPrioretyBtn.texContent = "Приоритет";
    };

    const addTask = (data, newId) => {
        if (data.name.length === 0 || data.description.length === 0 || data.tags.length === 0 || data.priorety.length === 0) {
            alert("Заполните все поля!");
            return false;
        }
        const renderTag = data.tags
            .map((tag) => {
                return `<li class="tag__item">#${tag.trim()}</li>`;
            })
            .join("");
        const priortyClass = definePriortyClass(data.priorety);
        const popUp = `
        <li class="tasks__item item-task" data-task-id = '${newId}'>
            <div class="item-task__checkbox">
                <input
                    id="checkbox-5"
                    class="item-task__checkbox-input"
                    name="checkbox-5"
                    type="checkbox"
                    data-chekbox-task-item
                />
                <label for="checkbox-5" class="item-task__checkbox-input-label"></label>
            </div>
            <div class="item-task__content">
                <div class="item-task__name">${data.name}</div>
                <div class="item-task__description">
                ${data.description}
                </div>
                <div class="item-task__tags tag">
                    <button class="tag__time">15.02</button>
                    <ul class="tag__category">
                    ${renderTag}
                    </ul>
                </div>
            </div>
            <div class="${priortyClass}">
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
        return true;
    };

    const renderTasksOnStart = (data) => {
        data.forEach((task) => {
            const renderTag = task.tags
                .map((tag) => {
                    return `<li class="tag__item">#${tag.trim()}</li>`;
                })
                .join("");
            const priortyClass = definePriortyClass(task.priorety);
            const taskClass = defineTaskClass(task.status)[0];
            const popUp = `
            <li class="${taskClass}" data-task-id = '${task.id}'>
                <div class="item-task__checkbox">
                    <input
                        id="checkbox-5"
                        class="item-task__checkbox-input"
                        name="checkbox-5"
                        type="checkbox"
                        data-chekbox-task-item
                        ${defineTaskClass(task.status)[1] ? "checked" : null}
                    />
                    <label for="checkbox-5" class="item-task__checkbox-input-label"></label>
                </div>
                <div class="item-task__content">
                    <div class="item-task__name">${task.name}</div>
                    <div class="item-task__description">
                    ${task.description}
                    </div>
                    <div class="item-task__tags tag">
                        <button class="tag__time">15.02</button>
                        <ul class="tag__category">
                            ${renderTag}
                        </ul>
                    </div>
                </div>
                <div class="${priortyClass}">
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
        });
    };

    const changeTaskStatus = (task, bool) => {
        if (bool) {
            task.classList.add("active");
        } else {
            task.classList.remove("active");
        }
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
        getInputsDataSettings: getInputsDataSettings,
        checkUserTheme: checkUserTheme,
        renderTasksOnStart: renderTasksOnStart,
        showPrioretyList: showPrioretyList,
        removeActiveClassPrioretyItems: removeActiveClassPrioretyItems,
        hidePrioretyList: hidePrioretyList,
        setDefaultValueFromData: setDefaultValueFromData,
        changeTaskStatus: changeTaskStatus,
    };
})();

export default View;
