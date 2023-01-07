const SORT_TYPES = {
    DEFAULT: "default",
    DATE_UP: "date-up",
    DATE_DOWN: "date_down"
}

class SortComponent extends AbstractComponent {
    constructor() {
        super();

        this._currentSortType = SORT_TYPES.DEFAULT;
    }

    setClickHandler(event) {
        this.getElement().addEventListener("click", event);
    }

    getSortType() {
        return this._currentSortType;
    }

    getTemplate() {
        return `
        <div class="board__filter-list">
            <a href="#" class="board__filter" data-sort-type="${SORT_TYPES.DEFAULT}">SORT BY DEFAULT</a>
            <a href="#" class="board__filter" data-sort-type="${SORT_TYPES.DATE_UP}">SORT BY DATE up</a>
            <a href="#" class="board__filter" data-sort-type="${SORT_TYPES.DATE_DOWN}">SORT BY DATE down</a>
        </div>
        `
    }
}
