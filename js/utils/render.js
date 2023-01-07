function insertMarkup(container, element) {
    container.innerHTML = '';
    container.insertAdjacentHTML('afterBegin', element);
}

function render(parent, child, position) {
    switch (position) {
        case POSITIONS.BEFORE_END:
            parent.append(child);
            break;
        case POSITIONS.AFTER_BEGIN:
            parent.prepend(child);
            break;
    }
}

function createElement(template) {
    const div = document.createElement("div");
    div.innerHTML = template;

    return div.childNodes[1];
}

function replaceElement() {
}