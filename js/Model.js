const Model = (function () {
    let startedState = {
        tasks: [
            {
                id: 0,
                name: "Настройка приложения",
                description: "Зайди в настройки профиля (шестеренка около имени пользователя) и настрой его под себя",
                date: "19.02",
                tags: ["Другое", "Личное"],
                priorety: "urgently",
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
        state.settings.userName = data.userName;
        state.settings.theme = data.theme;
        localStorage.setItem("taskState", JSON.stringify(state));
    };

    return {
        userSettings: state.settings,
        changeSettings: changeSettings,
    };
})();

export default Model;
