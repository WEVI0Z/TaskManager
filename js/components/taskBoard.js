class TaskBoardComponent {
    constructor() {
        this._element = null;
    }

    getTemplate() {
        return `
            <div class="board__tasks">

            </div>
        `
    }

    getElement() {
        this._element = createElement(this.getTemplate());

        return this._element;
    }

    removeElement() {
        this._element = null
    }
}