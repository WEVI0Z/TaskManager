class CardEditComponent extends AbstractComponent {
    constructor(data) {
        super();

        this.data = data;
    }

    getTemplate() {
        const repeatStatus = isCardRepeated(this.data);

        return `
        <article class="card card--edit card--${this.data.color} card--repeat">
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
                    >${this.data.description}</textarea>
                </label>
                </div>
    
                <div class="card__settings">
                <div class="card__details">
                    <div class="card__dates">
                    <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${this.data.dueDate ? "yes" : "no"}</span>
                    </button>
    
                    <fieldset class="card__date-deadline ${this.data.dueDate ? "" : "visually-hidden"}">
                        <label class="card__input-deadline-wrap">
                        <input
                            class="card__date"
                            type="text"
                            placeholder=""
                            name="date"
                            value="${this.data.dueDate.getDate() + " " + MONTHS[this.data.dueDate.getMonth()] + " " + formatDate(this.data.dueDate.getHours()) + ":" + formatDate(this.data.dueDate.getMinutes())}"
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
                            ${this.data.repeatingDays.mo ? "checked" : ""}
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
                            ${this.data.repeatingDays.tu ? "checked" : ""}
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
                            ${this.data.repeatingDays.we ? "checked" : ""}
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
                            ${this.data.repeatingDays.th ? "checked" : ""}
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
                            ${this.data.repeatingDays.fr ? "checked" : ""}
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
                            ${this.data.repeatingDays.sa ? "checked" : ""}
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
                            ${this.data.repeatingDays.su ? "checked" : ""}
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
                        ${this.data.color == "black" ? "checked" : ""}
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
                        ${this.data.color == "yellow" ? "checked" : ""}
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
                        ${this.data.color == "blue" ? "checked" : ""}
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
                        ${this.data.color == "green" ? "checked" : ""}
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
                        ${this.data.color == "pink" ? "checked" : ""}
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
}