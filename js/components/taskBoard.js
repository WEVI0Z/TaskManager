function getLoadMoreButtonMarkup() {
    function getElementMarkup() {
        return `
            <button class="load-more ${currentlyShownAmountOfCards >= cardsData.length ? "visually-hidden" : ""}" type="button">load more</button>
        `
    }

    return getElementMarkup();
}

function drawTasksBoard(cardsData) {
    const parent = document.querySelector(".board__tasks");
    const boardFragmentsList = [];

    boardFragmentsList.push(getCardCreationMarkup(cardsData[0]));
    boardFragmentsList.push(getCardsMarkup(cardsData, currentlyShownAmountOfCards));
    boardFragmentsList.push(getLoadMoreButtonMarkup());

    insertMarkup(parent, boardFragmentsList.join(" "));

    loadMoreButtonControl();
}

function loadMoreButtonControl() {
    const button = document.querySelector(".load-more");

    function loadButtonClickHandler() {
        currentlyShownAmountOfCards += 8;

        if (currentlyShownAmountOfCards >= cardsData.length) {
            currentlyShownAmountOfCards = cardsData.length
        }

        drawTasksBoard(cardsData);
    }

    if (button) {
        button.addEventListener("click", loadButtonClickHandler);
    }
}