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

let currentlyShownAmountOfCards = 0;

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

function renderTaskBoard() {
    const taskBoard = new TaskBoardComponent();
    const taskBoardElement = taskBoard.getElement();

    function getCards() {
        const cardsWrapper = document.createDocumentFragment();
    
        let loadCardsAmount = EVERY_LOAD_AMOUNT;
    
        if (currentlyShownAmountOfCards + EVERY_LOAD_AMOUNT >= cardsData.length) {
            loadCardsAmount = cardsData.length - currentlyShownAmountOfCards;
            currentlyShownAmountOfCards = cardsData.length - loadCardsAmount;
        }
    
        function appendCard(wrapper, cardData) {
            const card = new CardComponent(cardData);
            const cardElement = card.getELement();
            const editBtn = cardElement.querySelector(".card__btn--edit");
    
            function editClickButtonHandler() {
                removeCardEventListeners();

                const editCard = new CardEditComponent(cardData);
                taskBoardElement.replaceChild(editCard.getElement(), cardElement);
            }
    
            function addCardEventListeners() {
                editBtn.addEventListener("click", editClickButtonHandler);
            }
    
            function removeCardEventListeners() {
                editBtn.removeEventListener("click", editClickButtonHandler);
            }
    
            addCardEventListeners();
    
            wrapper.append(cardElement);
        }
    
        for (let i = currentlyShownAmountOfCards; i < currentlyShownAmountOfCards + loadCardsAmount; i++) {
            appendCard(cardsWrapper, cardsData[i]);
        }
    
        currentlyShownAmountOfCards += loadCardsAmount;
    
        const btn = document.querySelector(".load-more");
    
        if (currentlyShownAmountOfCards >= cardsData.length) {
            btn.classList.add("visually-hidden");
        }
    
        return cardsWrapper;
    }
    
    function getTaskBoard() {
        render(document.querySelector(".board"), taskBoardElement, "beforeEnd");
    
        const loadMore = new LoadMoreComponent();
    
        function loadButtonClickHandler(evt) {
            evt.preventDefault();
    
            render(document.querySelector(".board__tasks"), getCards(), "beforeEnd");
        }
    
        render(document.querySelector('.board'), loadMore.getELement(), "beforeEnd");
        loadMore.recieveElement().addEventListener("click", loadButtonClickHandler);
    
        render(taskBoardElement, getCards(), "beforeEnd");
    } 
    
    getTaskBoard();
}

const cardsData = createCardsData();

const menu = new MenuComponent();
render(document.querySelector(".main__control"), menu.getELement(), "afterBegin");

const filters = new FiltersComponent(cardsData);
render(document.querySelector(".main__filter"), filters.getELement(), "afterBegin");

const sort = new SortComponent();
render(document.querySelector(".board"), sort.getELement(), "afterBegin");

renderTaskBoard();