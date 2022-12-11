// function loadMoreButtonControl() {
//     const button = document.querySelector(".load-more");

//     if (button) {
//         button.addEventListener("click", loadButtonClickHandler);
//     }
// }

class LoadMoreComponent {
    constructor() {
        this._element = null;
    }

    getTemplate() {
        return `
            <button class="load-more" type="button">load more</button>
        `
    }

    getELement() {
        this._element = createElement(this.getTemplate());

        return this._element;
    }

    recieveElement() {
        return this._element;
    }

    removeElement() {
        this._element = null;
    }
}