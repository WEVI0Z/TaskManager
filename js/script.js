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

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIndex(array) {
    return getRandomNum(0, array.length - 1);
}

function getRandomBool() {
    return true ? getRandomNum(0, 1) == 1 : false;
}

function formatDate(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num;
}

function isCardRepeated(cardData) {
    let repeatStatus = false;

    Object.values(cardData.repeatingDays).forEach((value) => {
        if (value == true) {
            repeatStatus = true;
        }
    })

    return repeatStatus
}

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

function insertMarkup(container, element) {
    container.innerHTML = '';
    container.insertAdjacentHTML('afterBegin', element);
}

function drawMenu() {
    const parent = document.querySelector(".main__control");

    function getElementMarkup() {
        return `
            <h1 class="control__title">TASKMANAGER</h1>
            <section class="control__btn-wrap">
            <input
                type="radio"
                name="control"
                id="control__new-task"
                class="control__input visually-hidden"
            />
            <label for="control__new-task" class="control__label control__label--new-task"
                >+ ADD NEW TASK</label>
            <input
                type="radio"
                name="control"
                id="control__task"
                class="control__input visually-hidden"
                checked
            />
            <label for="control__task" class="control__label">TASKS</label>
            <input
                type="radio"
                name="control"
                id="control__statistic"
                class="control__input visually-hidden"
            />
            <label for="control__statistic" class="control__label">
                STATISTICS
            </label>
            </section>
        `
    }

    insertMarkup(parent, getElementMarkup());
}

function drawFilters(filtersData) {
    const parent = document.querySelector(".main__filter");

    function getElementMarkup(filtersData) {
        return `   
        <section class="main__filter filter container">
            <input
            type="radio"
            id="filter__all"
            class="filter__input visually-hidden"
            name="filter"
            checked
            ${filtersData.all > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__all" class="filter__label">
            All <span class="filter__all-count">${filtersData.all}</span></label
            >
            <input
            type="radio"
            id="filter__overdue"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.overdue > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__overdue" class="filter__label"
            >Overdue <span class="filter__overdue-count">${filtersData.overdue}</span></label
            >
            <input
            type="radio"
            id="filter__today"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.today > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__today" class="filter__label"
            >Today <span class="filter__today-count">${filtersData.today}</span></label
            >
            <input
            type="radio"
            id="filter__favorites"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.favorites > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__favorites" class="filter__label"
            >Favorites <span class="filter__favorites-count">${filtersData.favorites}</span></label
            >
            <input
            type="radio"
            id="filter__repeating"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.repeating > 0 ? "enable" : "disable"}
            />
            <label for="filter__repeating" class="filter__label"
            >Repeating <span class="filter__repeating-count">${filtersData.repeating}</span></label
            >
            <input
            type="radio"
            id="filter__archive"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.archive > 0 ? "enable" : "disable"}
            />
            <label for="filter__archive" class="filter__label"
            >Archive <span class="filter__archive-count">${filtersData.archive}</span></label
            >
        </section>
        `
    }

    insertMarkup(parent, getElementMarkup(filtersData));
}

function drawSort() {
    const parent = document.querySelector(".board__filter-list");

    function getElementMarkup() {
        return `
        <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
        `
    }

    insertMarkup(parent, getElementMarkup());
}

function getCardsMarkup(cardsData, startIndex) {
    const cards = [];

    function createCard(cardData) {

        const disabledButtonClass = "card__btn--disabled";

        function getElementMarkup() {
            return `
            <article class="card card--${cardData.color}">
              <div class="card__form">
                <div class="card__inner">
                  <div class="card__control">
                    <button type="button" class="card__btn card__btn--edit">
                      edit
                    </button>
                    <button type="button" class="card__btn card__btn--archive ${cardData.isFavorite ? disabledButtonClass : ""}">
                      archive
                    </button>
                    <button
                      type="button"
                      class="card__btn card__btn--favorites ${cardData.isArchived ? disabledButtonClass : ""}"
                    >
                      favorites
                    </button>
                  </div>

                  <div class="card__color-bar">
                    <svg class="card__color-bar-wave" width="100%" height="10">
                      <use xlink:href="#wave"></use>
                    </svg>
                  </div>

                  <div class="card__textarea-wrap">
                    <p class="card__text">${cardData.description}</p>
                  </div>

                  <div class="card__settings">
                    <div class="card__details">
                      <div class="card__dates ${cardData.dueDate ? "" : "visually-hidden"}">
                        <div class="card__date-deadline">
                          <p class="card__input-deadline-wrap">
                            <span class="card__date">${cardData.dueDate.getDate() + " " + MONTHS[cardData.dueDate.getMonth()] + " " + cardData.dueDate.getFullYear()}</span>
                            <span class="card__time">${formatDate(cardData.dueDate.getHours())}:${formatDate(cardData.dueDate.getMinutes())}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>`
        }

        return getElementMarkup();
    }

    for (let i = 0; i < currentlyShownAmountOfCards; i++) {
        cards.push(createCard(cardsData[i]));
    }

    function getElementMarkup() {
        return cards.join(" ");
    }

    return getElementMarkup();
}

function getCardCreationMarkup(cardData = null) {
    if (cardData == null) {
        return
    }

    const repeatStatus = isCardRepeated(cardData);

    return `
    <article class="card card--edit card--${cardData.color} card--repeat">
        <form class="card__form" method="get">
        <div class="card__inner">
            <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
            </svg>
            </div>

            <div class="card__textarea-wrap">
            <label>
                <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
                >${cardData.description}</textarea>
            </label>
            </div>

            <div class="card__settings">
            <div class="card__details">
                <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${cardData.dueDate ? "yes" : "no"}</span>
                </button>

                <fieldset class="card__date-deadline ${cardData.dueDate ? "" : "visually-hidden"}">
                    <label class="card__input-deadline-wrap">
                    <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        value="${cardData.dueDate.getDate() + " " + MONTHS[cardData.dueDate.getMonth()] + " " + formatDate(cardData.dueDate.getHours()) + ":" + formatDate(cardData.dueDate.getMinutes())}"
                    />
                    </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${repeatStatus ? "yes" : "no"}</span>
                </button>

                <fieldset class="card__repeat-days ${repeatStatus ? "" : "visually-hidden"}">
                    <div class="card__repeat-days-inner">
                    <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-mo-4"
                        name="repeat"
                        value="mo"
                        ${cardData.repeatingDays.mo ? "checked" : ""}
                    />
                    <label class="card__repeat-day" for="repeat-mo-4"
                        >mo</label
                    >
                    <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-tu-4"
                        name="repeat"
                        value="tu"
                        ${cardData.repeatingDays.tu ? "checked" : ""}
                    />
                    <label class="card__repeat-day" for="repeat-tu-4"
                        >tu</label
                    >
                    <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-we-4"
                        name="repeat"
                        value="we"
                        ${cardData.repeatingDays.we ? "checked" : ""}
                    />
                    <label class="card__repeat-day" for="repeat-we-4"
                        >we</label
                    >
                    <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-th-4"
                        name="repeat"
                        value="th"
                        ${cardData.repeatingDays.th ? "checked" : ""}
                    />
                    <label class="card__repeat-day" for="repeat-th-4"
                        >th</label
                    >
                    <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-fr-4"
                        name="repeat"
                        value="fr"
                        ${cardData.repeatingDays.fr ? "checked" : ""}
                    />
                    <label class="card__repeat-day" for="repeat-fr-4"
                        >fr</label
                    >
                    <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        name="repeat"
                        value="sa"
                        id="repeat-sa-4"
                        ${cardData.repeatingDays.sa ? "checked" : ""}
                    />
                    <label class="card__repeat-day" for="repeat-sa-4"
                        >sa</label
                    >
                    <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-su-4"
                        name="repeat"
                        value="su"
                        ${cardData.repeatingDays.su ? "checked" : ""}
                    />
                    <label class="card__repeat-day" for="repeat-su-4"
                        >su</label
                    >
                    </div>
                </fieldset>
                </div>
            </div>

            <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                <input
                    type="radio"
                    id="color-black-4"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                    ${cardData.color == "black" ? "checked" : ""}
                />
                <label
                    for="color-black-4"
                    class="card__color card__color--black"
                    >black</label
                >
                <input
                    type="radio"
                    id="color-yellow-4"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                    ${cardData.color == "yellow" ? "checked" : ""}
                />
                <label
                    for="color-yellow-4"
                    class="card__color card__color--yellow"
                    >yellow</label
                >
                <input
                    type="radio"
                    id="color-blue-4"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                    ${cardData.color == "blue" ? "checked" : ""}
                />
                <label
                    for="color-blue-4"
                    class="card__color card__color--blue"
                    >blue</label
                >
                <input
                    type="radio"
                    id="color-green-4"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                    ${cardData.color == "green" ? "checked" : ""}
                />
                <label
                    for="color-green-4"
                    class="card__color card__color--green"
                    >green</label
                >
                <input
                    type="radio"
                    id="color-pink-4"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                    ${cardData.color == "pink" ? "checked" : ""}
                />
                <label
                    for="color-pink-4"
                    class="card__color card__color--pink"
                    >pink</label
                >
                </div>
            </div>
            </div>

            <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
            </div>
        </div>
        </form>
    </article>
    `
}

function getLoadMoreButtonMarkup() {
    function getElementMarkup() {
        return `
            <button class="load-more ${currentlyShownAmountOfCards >= cardsData.length ? "visually-hidden" : ""}" type="button">load more</button>
        `
    }

    return getElementMarkup();
}

function drawTasksBoard(cardsData) {
    const parent = document.querySelector(".board__tasks");
    const boardFragmentsList = [];

    boardFragmentsList.push(getCardCreationMarkup(cardsData[0]));
    boardFragmentsList.push(getCardsMarkup(cardsData, currentlyShownAmountOfCards));
    boardFragmentsList.push(getLoadMoreButtonMarkup());

    insertMarkup(parent, boardFragmentsList.join(" "));

    loadMoreButtonControl();
}

function loadMoreButtonControl() {
    const button = document.querySelector(".load-more");

    function loadButtonClickHandler() {
        currentlyShownAmountOfCards += 8;

        if (currentlyShownAmountOfCards >= cardsData.length) {
            currentlyShownAmountOfCards = cardsData.length
        }

        drawTasksBoard(cardsData);
    }

    if (button) {
        button.addEventListener("click", loadButtonClickHandler);
    }
}

const cardsData = createCardsData();
const filtersData = constructFiltersData(cardsData);
drawMenu();
drawFilters(filtersData);
drawSort();
drawTasksBoard(cardsData);