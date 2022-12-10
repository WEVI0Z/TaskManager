function getCardsMarkup(cardsData) {
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