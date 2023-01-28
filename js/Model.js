const Model = (function () {
    let state = {
        tasks: [
            {
                name: "Оформить курсовую работу",
                description: "Курсовая работа по Ионов А.Г. на тему «Бережливое производство»",
                date: "19.02",
                tags: ["Учеба", "Курсовая"],
                priorety: "urgently",
                status: "in progress",
            },
            {
                name: "Оформить курсовую работу",
                description: "Курсовая работа по Ионов А.Г. на тему «Бережливое производство»",
                date: "19.02",
                tags: ["Учеба", "Курсовая"],
                priorety: "urgently",
                status: "in progress",
            },
        ],

        settings: {
            userName: "Александр",
            location: "Россия, Томск",
            theme: "light",
        },
    };

    return {
        userSettings: state.settings,
    };
})();

export default Model;
