// function getCardsMarkup(cardsData) {
//     const cards = [];

//     function createCard(cardData) {


//         function getElementMarkup() {
//             return ``
//         }

//         return getElementMarkup();
//     }

//     for (let i = 0; i < currentlyShownAmountOfCards; i++) {
//         cards.push(createCard(cardsData[i]));
//     }

//     function getElementMarkup() {
//         return cards.join(" ");
//     }

//     return getElementMarkup();
// }

class CardComponent {
    constructor(data) {
        this.cardData = data;

        this._element = null;
    }

    getTemplate() {
        const disabledButtonClass = "card__btn--disabled";

        return `
        <article class="card card--${this.cardData.color}">
          <div class="card__form">
            <div class="card__inner">
              <div class="card__control">
                <button type="button" class="card__btn card__btn--edit">
                  edit
                </button>
                <button type="button" class="card__btn card__btn--archive ${this.cardData.isFavorite ? disabledButtonClass : ""}">
                  archive
                </button>
                <button
                  type="button"
                  class="card__btn card__btn--favorites ${this.cardData.isArchived ? disabledButtonClass : ""}"
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
                <p class="card__text">${this.cardData.description}</p>
              </div>

              <div class="card__settings">
                <div class="card__details">
                  <div class="card__dates ${this.cardData.dueDate ? "" : "visually-hidden"}">
                    <div class="card__date-deadline">
                      <p class="card__input-deadline-wrap">
                        <span class="card__date">${this.cardData.dueDate.getDate() + " " + MONTHS[this.cardData.dueDate.getMonth()] + " " + this.cardData.dueDate.getFullYear()}</span>
                        <span class="card__time">${formatDate(this.cardData.dueDate.getHours())}:${formatDate(this.cardData.dueDate.getMinutes())}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        `
    }

    getELement() {
        this._element = createElement(this.getTemplate());

        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}