'use strict';

const COLORS = [
    "black",
    "yellow",
    "blue",
    "green",
    "pink"
];

const DESCRIPTIONS = [
    "find money for travel",
    "do homework",
    "go to school",
    "take the car to the service",
    "buy some milk",
    "write some code",
    "turn on the computer",
    "play some videogames"
];

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const POSITIONS = {
    BEFORE_END: "beforeEnd",
    AFTER_BEGIN: "afterBegin"
}

const START_SHOWN_CARDS_AMOUNT = 8;
const EVERY_LOAD_AMOUNT = 8;

const currentDate = new Date();

function createCardsData() {
    const cardsData = [];

    function createCardData() {
        return {
            "color": COLORS[getRandomIndex(COLORS)],
            "description": DESCRIPTIONS[getRandomIndex(DESCRIPTIONS)],
            "dueDate": new Date(currentDate.getFullYear(),
                getRandomNum(currentDate.getMonth() - 1, currentDate.getMonth() + 1),
                getRandomNum(currentDate.getDate() - 1, currentDate.getDate() + 15),
                getRandomNum(currentDate.getHours(), currentDate.getHours() + 23),
                getRandomNum(currentDate.getMinutes(), currentDate.getMinutes() + 59),
                getRandomNum(currentDate.getSeconds(), currentDate.getSeconds() + 23)
            ),
            "isArchived": getRandomBool(),
            "isFavorite": getRandomBool(),
            "repeatingDays": {
                "mo": getRandomBool(),
                "tu": getRandomBool(),
                "we": getRandomBool(),
                "th": getRandomBool(),
                "fr": getRandomBool(),
                "sa": getRandomBool(),
                "su": getRandomBool(),
            }
        }
    }

    for (let i = 0; i < 20; i++) {
        cardsData.push(createCardData());
    }

    return cardsData;
}

const cardsData = createCardsData();

const boardController = new BoardController(document.querySelector(".board"));
boardController.render(cardsData);

const menu = new MenuComponent();
render(document.querySelector(".main__control"), menu.getElement(), "afterBegin");

const filters = new FiltersComponent(cardsData);
render(document.querySelector(".main__filter"), filters.getElement(), "afterBegin");