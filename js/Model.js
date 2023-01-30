const Model = (function () {
    let startedState = {
        tasks: [
            {
                id: 0,
                name: "Настройка приложения",
                description: "Зайди в настройки профиля (шестеренка около имени пользователя) и настрой его под себя",
                date: "19.02",
                tags: ["Другое", "Личное"],
                priorety: "high",
                status: "in progress",
            },
        ],

        settings: {
            userName: "Пользователь",
            location: "Россия, Томск",
            theme: "light",
        },
    };

    let state;

    if (localStorage.getItem("taskState")) {
        state = JSON.parse(localStorage.getItem("taskState"));
    } else {
        state = startedState;
        localStorage.setItem("taskState", JSON.stringify(state));
    }

    const changeSettings = (data) => {
        if (data.userName.trim() !== "") {
            state.settings.userName = data.userName;
            state.settings.theme = data.theme;
            localStorage.setItem("taskState", JSON.stringify(state));
            return true;
        } else {
            return false;
        }
    };

    const getTasksFromLocalStorage = () => {
        return state.tasks;
    };

    const addNewTaskToLocalStorage = (data) => {
        if (data.name.length === 0 || data.description.length === 0 || data.tags.length === 0 || data.priorety.length === 0) {
            return;
        }
        state.tasks.push(data);
        localStorage.setItem("taskState", JSON.stringify(state));
    };

    const generateNewId = () => {
        return +state.tasks[state.tasks.length - 1].id + 1;
    };

    const changeTaskStatus = (id, bool) => {
        if (bool) {
            const task = state.tasks.find((task) => task.id === id);
            task.status = "done";
            localStorage.setItem("taskState", JSON.stringify(state));
        } else {
            const task = state.tasks.find((task) => task.id === id);
            task.status = "in progress";
            localStorage.setItem("taskState", JSON.stringify(state));
        }
    };

    return {
        userSettings: state.settings,
        changeSettings: changeSettings,
        getTasksFromLocalStorage: getTasksFromLocalStorage,
        addNewTaskToLocalStorage: addNewTaskToLocalStorage,
        generateNewId: generateNewId,
        changeTaskStatus: changeTaskStatus,
    };
})();

export default Model;
