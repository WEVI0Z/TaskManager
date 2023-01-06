class FiltersComponent extends AbstractComponent {
    constructor(data) {
        super();

        this.data = data;
        this.filtersData = {
            all: 0,
            favorites: 0,
            overdue: 0,
            today: 0,
            repeating: 0,
            archive: 0
        }

        this._element = null;
    }

    analyseCards() {
        this.filtersData.all = this.data.length;

        this.data.forEach((cardData) => {
            if (currentDate < cardData.dueDate) {
                this.filtersData.overdue += 1;
            } else if (currentDate.getDate() == cardData.dueDate.getDate() &&
                currentDate.getMonth() == cardData.dueDate.getMonth() &&
                currentDate.getFullYear() == cardData.dueDate.getFullYear()
            ) {
                this.filtersData.today += 1;
            }

            if (cardData.isFavorite) {
                this.filtersData.favorites += 1;
            }

            if (isCardRepeated(cardData)) {
                this.filtersData.repeating += 1;
            }

            if (cardData.isArchived) {
                this.filtersData.archive += 1;
            }
        })

        console.log(this.filtersData)
    }

    getTemplate() {
        this.analyseCards();

        return `   
        <section class="main__filter filter container">
            <input
            type="radio"
            id="filter__all"
            class="filter__input visually-hidden"
            name="filter"
            checked
            ${this.filtersData.all > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__all" class="filter__label">
            All <span class="filter__all-count">${this.filtersData.all}</span></label
            >
            <input
            type="radio"
            id="filter__overdue"
            class="filter__input visually-hidden"
            name="filter"
            ${this.filtersData.overdue > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__overdue" class="filter__label"
            >Overdue <span class="filter__overdue-count">${this.filtersData.overdue}</span></label
            >
            <input
            type="radio"
            id="filter__today"
            class="filter__input visually-hidden"
            name="filter"
            ${this.filtersData.today > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__today" class="filter__label"
            >Today <span class="filter__today-count">${this.filtersData.today}</span></label
            >
            <input
            type="radio"
            id="filter__favorites"
            class="filter__input visually-hidden"
            name="filter"
            ${this.filtersData.favorites > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__favorites" class="filter__label"
            >Favorites <span class="filter__favorites-count">${this.filtersData.favorites}</span></label
            >
            <input
            type="radio"
            id="filter__repeating"
            class="filter__input visually-hidden"
            name="filter"
            ${this.filtersData.repeating > 0 ? "enable" : "disable"}
            />
            <label for="filter__repeating" class="filter__label"
            >Repeating <span class="filter__repeating-count">${this.filtersData.repeating}</span></label
            >
            <input
            type="radio"
            id="filter__archive"
            class="filter__input visually-hidden"
            name="filter"
            ${this.filtersData.archive > 0 ? "enable" : "disable"}
            />
            <label for="filter__archive" class="filter__label"
            >Archive <span class="filter__archive-count">${this.filtersData.archive}</span></label
            >
        </section>
        `
    }
}