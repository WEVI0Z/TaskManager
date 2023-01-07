class BoardController { // переписать компонент
    constructor(container) {
        this.container = container;
    }

    render(cardsData) {
        const taskBoard = new TaskBoardComponent();
        const taskBoardElement = taskBoard.getElement();
        const board = this.container;
        let currentCardsData = [...cardsData];
        let currentlyShownAmountOfCards = 0;
        
        render(board, taskBoard.sortComponent.getElement(), "afterBegin");

        function sortClickHandler(evt) {
            evt.preventDefault();

            const sortButton = evt.target.closest(".board__filter");

            if(sortButton && sortButton.dataset.sortType !== taskBoard.sortComponent.getSortType()) {
                taskBoardElement.innerHTML = '';
                currentlyShownAmountOfCards = 0;

                switch(sortButton.dataset.sortType) {
                    case SORT_TYPES.DATE_UP:
                        currentCardsData.sort((a, b) => {
                            return a.dueDate - b.dueDate;
                        });

                        break;
                    case SORT_TYPES.DATE_DOWN:
                       currentCardsData.sort((a, b) => {
                            return b.dueDate - a.dueDate;
                        });

                        break;
                    case SORT_TYPES.DEFAULT:
                        currentCardsData = [...cardsData];
                }

                render(taskBoardElement, wrapCards(getCards(currentCardsData)), "beforeEnd")
            }
        }

        taskBoard.sortComponent.setClickHandler(sortClickHandler);

        function wrapCards(cards) {
            const cardsWrapper = document.createDocumentFragment();

            cards.forEach(card => {
                cardsWrapper.append(card);
            });

            return cardsWrapper;
        }
    
        function getCards(cardsData) {
            const cards = [];
        
            let loadCardsAmount = EVERY_LOAD_AMOUNT;
        
            if (currentlyShownAmountOfCards + EVERY_LOAD_AMOUNT >= cardsData.length) {
                loadCardsAmount = cardsData.length - currentlyShownAmountOfCards;
                currentlyShownAmountOfCards = cardsData.length - loadCardsAmount;
            }
        
            function appendCard(cards, cardData) {
                const card = new CardComponent(cardData);
                const cardElement = card.getElement();
                const editBtn = cardElement.querySelector(".card__btn--edit");
        
                function editClickButtonHandler() {
                    removeCardEventListeners();
    
                    const editCard = new CardEditComponent(cardData);
                    taskBoardElement.replaceChild(editCard.getElement(), cardElement);
                }
        
                function addCardEventListeners() {
                    editBtn.addEventListener("click", editClickButtonHandler);
                }
        
                function removeCardEventListeners() {
                    editBtn.removeEventListener("click", editClickButtonHandler);
                }
        
                addCardEventListeners();
        
                cards.push(cardElement);
            }
        
            for (let i = currentlyShownAmountOfCards; i < currentlyShownAmountOfCards + loadCardsAmount; i++) {
                appendCard(cards, cardsData[i]);
            }
        
            currentlyShownAmountOfCards += loadCardsAmount;
        
            const btn = document.querySelector(".load-more");
        
            if (currentlyShownAmountOfCards >= cardsData.length) {
                btn.classList.add("visually-hidden");
            } else {
                btn.classList.remove("visually-hidden");
            }

            return cards
        }
        
        function getTaskBoard() {
            render(board, taskBoardElement, "beforeEnd");
        
            const loadMore = new LoadMoreComponent();
        
            function loadButtonClickHandler(evt) {
                evt.preventDefault();
        
                render(taskBoardElement, wrapCards(getCards(currentCardsData)), "beforeEnd");
            }
        
            render(board, loadMore.getElement(), "beforeEnd");
            loadMore.setClickHandler(loadButtonClickHandler);
        
            render(taskBoardElement, wrapCards(getCards(currentCardsData)), "beforeEnd");
        } 
        
        getTaskBoard();
    }
}