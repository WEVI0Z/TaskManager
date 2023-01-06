class LoadMoreComponent extends AbstractComponent {
    constructor() {
        super();

        this._element = null;
    }

    getTemplate() {
        return `
            <button class="load-more" type="button">load more</button>
        `
    }
}