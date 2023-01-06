class AbstractComponent {
    constructor() {
        if(new.target === AbstractComponent) {
            throw new Error("Can't instantiate AbstractComponent, only concrete one");
        }

        this._element = null;
    }

    createElement(template) {
        const div = document.createElement("div");
        div.innerHTML = template;
    
        return div.childNodes[1];
    }

    getTemplate() {
        throw new Error("Abstract method is not emplemented: getTemplate");
    }

    getElement() {
       if(!this._element) {
        this._element = this.createElement(this.getTemplate());
       }

        return this._element;
    }

    removeElement() {
        this._element = null
    }
}