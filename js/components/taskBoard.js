class TaskBoardComponent extends AbstractComponent {
    constructor() {
        super();

        this.sortComponent = new SortComponent;
    }

    getTemplate() {
        return `
            <div class="board__tasks">

            </div>
        `
    }
}
