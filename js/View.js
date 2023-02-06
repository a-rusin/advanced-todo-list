const View = (function () {
    // Started Manual (tab/slider) ==================================================== //

    const sliderManual = {
        popUp: document.querySelector("[data-manual-slider]"),
        slides: document.querySelectorAll("[data-manual-slide-number]"),
        inputName: document.querySelector("[data-manual-slider-username]"),
    };

    const checkUserNameInManual = () => {
        return sliderManual.inputName.value;
    };

    const showNextSlide = (currentSlide) => {
        if (sliderManual.inputName.value.trim().length !== 0) {
            sliderManual.slides.forEach((slide) => {
                slide.classList.remove("active");
                if (slide.getAttribute("data-manual-slide-number") == currentSlide + 1) {
                    slide.classList.add("active");
                }
            });
        } else {
            alert("Введите имя!");
        }
    };

    const deleteAndCloseManual = () => {
        sliderManual.popUp.remove();
    };

    const showManual = () => {
        sliderManual.popUp.classList.add("active");
    };

    // HEADER ======================================================================== //

    const header = {
        userAvatar: document.querySelector("[data-avatar-header]"),
        userName: document.querySelector("[data-user-name]"),
        userLocation: document.querySelector("[data-user-location]"),
        cssTheme: document.querySelector("#theme"),
        propgressBarNumbers: document.querySelector("[data-progress-bar-numbers]"),
        propgressBarPercentages: document.querySelector("[data-progress-bar-percentages]"),
        propgressBarLine: document.querySelector("[data-progress-bar-line-inner]"),
        countAllTask: document.querySelector("[data-all-tasks]"),
        countActiveTask: document.querySelector("[data-active-tasks]"),
        countDoneTask: document.querySelector("[data-done-tasks]"),
        countDeletedTask: document.querySelector("[data-deleted-tasks]"),
        filterHeader: document.querySelectorAll(".item-filter"),
        timeLabel: document.querySelector("[data-time-header]"),
        dateLabel: document.querySelector("[data-date-header]"),
        weatherNumbersLabel: document.querySelector("[data-weather-numbers]"),
        weatherLocationLabel: document.querySelector("[data-user-location]"),
    };

    const showWeather = (data) => {
        console.log(data);
        if (data) {
            header.weatherNumbersLabel.textContent = `${data.temprature}°C`;
            header.weatherLocationLabel.textContent = `${data.country}, ${data.town}`;
        }
    };

    const changeHeaderTheme = (value) => {
        header.filterHeader.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("data-filter-tasks") === value) {
                item.classList.add("active");
            }
        });
    };

    const setTime = () => {
        const date = new Date();
        const time = date.toLocaleTimeString().split(":");
        const weekdayNames = ["Вскр", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
        const currentWeekday = weekdayNames[date.getDay()];
        const monthNames = [
            "Января",
            "Февраля",
            "Марта",
            "Апреля",
            "Мая",
            "Июня",
            "Июля",
            "Августа",
            "Сентября",
            "Октября",
            "Ноября",
            "Декабря",
        ];
        const currentMonth = monthNames[date.getMonth()];
        const currentDay = date.getDate();
        header.timeLabel.innerHTML = `${time[0]}<span class = "header-cell__count-blink" >:</span>${time[1]}`;
        header.dateLabel.innerHTML = `${currentWeekday}, ${currentDay} ${currentMonth}`;
    };

    const showCurrentDateAndTime = () => {
        setTime();
        setInterval(() => {
            setTime();
        }, 60000);
    };

    const checkProgressBarNumbers = (min, max, deleted) => {
        header.propgressBarNumbers.textContent = `${min}/${max}`;
        const percentages = Math.floor((min / max) * 100);
        if (!isNaN(percentages)) {
            header.propgressBarPercentages.textContent = `${percentages}%`;
        } else {
            header.propgressBarPercentages.textContent = `0%`;
        }
        header.propgressBarLine.style.width = `${percentages}%`;
        header.countAllTask.textContent = max;
        header.countActiveTask.textContent = max - min;
        header.countDoneTask.textContent = min;
        header.countDeletedTask.textContent = deleted;
    };

    const checkUserName = (user) => {
        header.userName.textContent = user;
    };

    const checkUserGender = (gender) => {
        if (gender === "male") {
            header.userAvatar.src = "./img/avatar.png";
        } else {
            header.userAvatar.src = "./img/avatar2.png";
        }
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
        inputName: document.querySelector("[data-input-settings-name]"),
        inputTown: document.querySelector("[data-input-settings-town]"),
        inputLightTheme: document.querySelector("#radio-1-light-theme"),
        inputDarkTheme: document.querySelector("#radio-1-dark-theme"),
        deleteTasksCheckboxes: document.querySelectorAll("[data-clear-items]"),
        genderMale: document.querySelector("#select-gender1"),
        genderFemale: document.querySelector("#select-gender2"),
    };

    const setDefaultValueFromData = (data) => {
        popUpSettings.inputName.value = data.userName;

        popUpSettings.inputTown.value = data.location;

        if (data.theme === "light") {
            popUpSettings.inputLightTheme.checked = true;
            popUpSettings.inputDarkTheme.checked = false;
        } else if (data.theme === "dark") {
            popUpSettings.inputDarkTheme.checked = true;
            popUpSettings.inputLightTheme.checked = false;
        }

        if (data.gender === "male") {
            popUpSettings.genderMale.checked = true;
            popUpSettings.genderFemale.checked = false;
        } else if (data.gender === "female") {
            popUpSettings.genderFemale.checked = true;
            popUpSettings.genderMale.checked = false;
        }
    };

    const showPopUpSettings = () => {
        popUpSettings.window.classList.add("active");
    };

    const hidePopUpSettings = () => {
        popUpSettings.window.classList.remove("active");
    };

    const getInputsDataSettings = () => {
        let markedCheckboxes = [];

        Array.from(popUpSettings.deleteTasksCheckboxes).forEach((item) => {
            if (item.checked) {
                markedCheckboxes.push(item.getAttribute("data-clear-items"));
            }
        });

        return {
            userName: popUpSettings.inputName.value,
            town: popUpSettings.inputTown.value,
            theme: popUpSettings.inputLightTheme.checked ? "light" : "dark",
            gender: popUpSettings.genderMale.checked ? "male" : "female",
            markedCheckboxes: markedCheckboxes,
        };
    };

    const toggleCheckAllClearItems = (isCheked) => {
        if (isCheked) {
            popUpSettings.deleteTasksCheckboxes.forEach((item) => (item.checked = true));
        } else {
            popUpSettings.deleteTasksCheckboxes.forEach((item) => (item.checked = false));
        }
    };

    // pop up edit task

    const popUpEditTask = {
        window: document.querySelector("[data-pop-up-edit-task]"),
        taskId: document.querySelector(".edit-task__text-number"),
        inputName: document.querySelector(".edit-task__name"),
        inputDescription: document.querySelector(".edit-task__description"),
        inputTags: document.querySelector(".edit-task__tags"),
        btnSave: document.querySelector("[data-save-edited-task]"),
    };

    const showPopUpEditTask = (data) => {
        popUpEditTask.taskId.textContent = `№${data.id}`;
        popUpEditTask.inputName.value = data.name;
        popUpEditTask.inputDescription.value = data.description;
        popUpEditTask.inputTags.value = data.tags.join(", ");
        popUpEditTask.btnSave.setAttribute("data-save-edited-task", data.id);
        popUpEditTask.window.classList.add("active");
    };

    const hidePopUpEditTask = () => {
        popUpEditTask.window.classList.remove("active");
    };

    const getEditedTask = () => {
        return {
            name: popUpEditTask.inputName.value,
            description: popUpEditTask.inputDescription.value,
            tags: popUpEditTask.inputTags.value.split(","),
        };
    };

    // Filter mobile

    const filterMobile = {
        list: document.querySelector("[data-filter-menu-mobile]"),
    };

    const showFiltersMobile = () => {
        filterMobile.list.classList.toggle("active");
    };

    const hideMenuFilterMobile = () => {
        if (filterMobile.list) {
            filterMobile.list.classList.remove("active");
        }
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
        inputDate: document.querySelector("#datepicker"),
    };

    const getInputsDataTask = (id) => {
        let priorety = Array.from(addTaskForm.selectPrioretyItems).find((item) => item.classList.contains("active"));
        if (priorety) {
            priorety = priorety.getAttribute("data-priorety-select-priorety");
        } else {
            priorety = "";
        }
        const tags = taskElemenents.inputTags.value.length === 0 ? [] : taskElemenents.inputTags.value.split(",");
        const date =
            taskElemenents.inputDate.value.length === 0
                ? ""
                : taskElemenents.inputDate.value.split("-")[0] + "." + taskElemenents.inputDate.value.split("-")[1];
        return {
            id: id,
            name: taskElemenents.inputTitle.value,
            description: taskElemenents.inputDescription.value,
            tags: tags,
            priorety: priorety,
            status: "in progress",
            date: date,
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
        taskElemenents.inputDate.value = "";
        removeActiveClassPrioretyItems();
        hidePrioretyList();
        addTaskForm.selectPrioretyBtn.style.background = "#fff";
        addTaskForm.selectPrioretyBtn.style.color = "#8b8da1";
        addTaskForm.selectPrioretyBtn.texContent = "Приоритет";
    };

    const addTask = (data, newId) => {
        if (
            data.name.length === 0 ||
            data.description.length === 0 ||
            data.tags.length === 0 ||
            data.priorety.length === 0 ||
            data.date.length === 0
        ) {
            alert("Заполните все поля!");
            console.log(data);
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
                    <button class="tag__time">${data.date}</button>
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
                    <button class="item-task__btn-settings" data-open-settings-id='${newId}'>
                        <span data-open-settings-id='${newId}'></span>
                        <span data-open-settings-id='${newId}'></span>
                        <span data-open-settings-id='${newId}'></span>
                    </button>
                    <ul class="item-settings">
                        <li class="item-settings__item">
                            <a class="item-settings__link item-settings__link_edit" href="#" data-edit-task-id='${newId}'>
                                Редактировать
                            </a>
                        </li>
                        <li class="item-settings__item">
                            <a class="item-settings__link item-settings__link_duplicate" href="#" data-duplicate-task-id='${newId}'>
                                Дублировать
                            </a>
                        </li>
                        <li class="item-settings__item">
                            <a class="item-settings__link item-settings__link_delete" href="#" data-delete-task-id='${newId}'>
                                Удалить
                            </a>
                        </li>
                        </ul>
                </div>
            </div>
        </li>
        `;
        taskElemenents.itemsList.insertAdjacentHTML("afterbegin", popUp);
        return true;
    };

    const renderTasks = (data) => {
        taskElemenents.itemsList.innerHTML = "";
        data.forEach((task) => {
            if (task.status !== "deleted") {
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
                        <button class="tag__time">${task.date}</button>
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
                        <button class="item-task__btn-settings" data-open-settings-id='${task.id}'>
                            <span data-open-settings-id='${task.id}'></span>
                            <span data-open-settings-id='${task.id}'></span>
                            <span data-open-settings-id='${task.id}'></span>
                        </button>
                        <ul class="item-settings">
                            <li class="item-settings__item">
                                <a class="item-settings__link item-settings__link_edit" href="#" data-edit-task-id='${task.id}'>
                                    Редактировать
                                </a>
                            </li>
                            <li class="item-settings__item">
                                <a class="item-settings__link item-settings__link_duplicate" href="#" data-duplicate-task-id='${
                                    task.id
                                }'>
                                    Дублировать
                                </a>
                            </li>
                            <li class="item-settings__item">
                                <a class="item-settings__link item-settings__link_delete" href="#" data-delete-task-id='${
                                    task.id
                                }'>
                                    Удалить
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        `;
                taskElemenents.itemsList.insertAdjacentHTML("afterbegin", popUp);
            }
        });
    };

    const renderDeletedTasks = (data) => {
        taskElemenents.itemsList.innerHTML = "";
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
                        <button class="item-task__btn-settings" data-open-settings-id='${task.id}'>
                            <span data-open-settings-id='${task.id}'></span>
                            <span data-open-settings-id='${task.id}'></span>
                            <span data-open-settings-id='${task.id}'></span>
                        </button>
                        <ul class="item-settings">
                                <li class="item-settings__item">
                                    <a class="item-settings__link item-settings__link_edit" href="#" data-edit-task-id='${
                                        task.id
                                    }'>
                                        Редактировать
                                    </a>
                                </li>
                                <li class="item-settings__item">
                                    <a class="item-settings__link item-settings__link_duplicate" href="#" data-duplicate-task-id='${
                                        task.id
                                    }'>
                                        Дублировать
                                    </a>
                                </li>
                                <li class="item-settings__item">
                                    <a class="item-settings__link item-settings__link_delete" href="#" data-delete-task-id='${
                                        task.id
                                    }'>
                                        Удалить
                                    </a>
                                </li>
                        </ul>
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

    const openTaskSettings = (elem) => {
        elem.classList.toggle("active");
    };

    const hideTaskSettings = (elem) => {
        elem.classList.remove("active");
    };

    const deleteTask = (id) => {
        document.querySelector(`[data-task-id="${id}"]`).remove();
    };

    const duplicateTask = (data) => {
        const renderTag = data.tags
            .map((tag) => {
                return `<li class="tag__item">#${tag.trim()}</li>`;
            })
            .join("");
        const priortyClass = definePriortyClass(data.priorety);
        const taskClass = defineTaskClass(data.status)[0];
        const popUp = `
            <li class="${taskClass}" data-task-id = '${data.id}'>
                <div class="item-task__checkbox">
                    <input
                        id="checkbox-5"
                        class="item-task__checkbox-input"
                        name="checkbox-5"
                        type="checkbox"
                        data-chekbox-task-item
                        ${defineTaskClass(data.status)[1] ? "checked" : null}
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
                        <button class="item-task__btn-settings" data-open-settings-id='${data.id}'>
                            <span data-open-settings-id='${data.id}'></span>
                            <span data-open-settings-id='${data.id}'></span>
                            <span data-open-settings-id='${data.id}'></span>
                        </button>
                        <ul class="item-settings">
                                <li class="item-settings__item">
                                    <a class="item-settings__link item-settings__link_edit" href="#" data-edit-task-id='${
                                        data.id
                                    }'>
                                        Редактировать
                                    </a>
                                </li>
                                <li class="item-settings__item">
                                    <a class="item-settings__link item-settings__link_duplicate" href="#" data-duplicate-task-id='${
                                        data.id
                                    }'>
                                        Дублировать
                                    </a>
                                </li>
                                <li class="item-settings__item">
                                    <a class="item-settings__link item-settings__link_delete" href="#" data-delete-task-id='${
                                        data.id
                                    }'>
                                        Удалить
                                    </a>
                                </li>
                        </ul>
                    </div>
                </div>
            </li>
        `;
        taskElemenents.itemsList.insertAdjacentHTML("afterbegin", popUp);
    };

    // footer ===============================================================================

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
    };

    return {
        showNextSlide: showNextSlide,
        deleteAndCloseManual: deleteAndCloseManual,
        checkUserNameInManual: checkUserNameInManual,
        showFullForm: showFullForm,
        showShortForm: showShortForm,
        showPopUpSettings: showPopUpSettings,
        hidePopUpSettings: hidePopUpSettings,
        checkUserName: checkUserName,
        checkUserLocation: checkUserLocation,
        showWeather: showWeather,
        addTask: addTask,
        getInputsDataTask: getInputsDataTask,
        clearInputsDataTask: clearInputsDataTask,
        getInputsDataSettings: getInputsDataSettings,
        checkUserTheme: checkUserTheme,
        renderTasks: renderTasks,
        renderDeletedTasks: renderDeletedTasks,
        showPrioretyList: showPrioretyList,
        removeActiveClassPrioretyItems: removeActiveClassPrioretyItems,
        hidePrioretyList: hidePrioretyList,
        setDefaultValueFromData: setDefaultValueFromData,
        changeTaskStatus: changeTaskStatus,
        checkProgressBarNumbers: checkProgressBarNumbers,
        changeHeaderTheme: changeHeaderTheme,
        showCurrentDateAndTime: showCurrentDateAndTime,
        openTaskSettings: openTaskSettings,
        hideTaskSettings: hideTaskSettings,
        deleteTask: deleteTask,
        showPopUpEditTask: showPopUpEditTask,
        hidePopUpEditTask: hidePopUpEditTask,
        duplicateTask: duplicateTask,
        getEditedTask: getEditedTask,
        scrollUp: scrollUp,
        toggleCheckAllClearItems: toggleCheckAllClearItems,
        showFiltersMobile: showFiltersMobile,
        hideMenuFilterMobile: hideMenuFilterMobile,
        checkUserGender: checkUserGender,
        showManual: showManual,
    };
})();

export default View;
