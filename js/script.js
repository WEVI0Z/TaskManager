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

let = currentlyShownAmountOfCards = 8;

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

function constructFiltersData(cardsData) {
    const filtersData = {
        "all": cardsData.length,
        "overdue": 0,
        "today": 0,
        "favorites": 0,
        "repeating": 0,
        "archive": 0
    }

    cardsData.forEach((cardData) => {
        if (currentDate < cardData.dueDate) {
            filtersData.overdue += 1;
        } else if (currentDate.getDate() == cardData.dueDate.getDate() &&
            currentDate.getMonth() == cardData.dueDate.getMonth() &&
            currentDate.getFullYear() == cardData.dueDate.getFullYear()
        ) {
            filtersData.today += 1;
        }

        if (cardData.isFavorite) {
            filtersData.favorites += 1;
        }

        if (isCardRepeated(cardData)) {
            filtersData.repeating += 1;
        }

        if (cardData.isArchived) {
            filtersData.archive += 1;
        }
    })

    return filtersData;
}

const cardsData = createCardsData();
const filtersData = constructFiltersData(cardsData);

drawMenu();
drawFilters(filtersData);
drawSort();
drawTasksBoard(cardsData);