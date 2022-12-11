class SortComponent {
    constructor() {
        this._element = null;
    }

    getTemplate() {
        return `
        <div class="board__filter-list">
            <a href="#" class="board__filter" data-sort-type="default">SORT BY DEFAULT</a>
            <a href="#" class="board__filter" data-sort-type="date-up">SORT BY DATE up</a>
            <a href="#" class="board__filter" data-sort-type="date-down">SORT BY DATE down</a>
        </div>
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