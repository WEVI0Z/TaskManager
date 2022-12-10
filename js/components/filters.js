function drawFilters(filtersData) {
    const parent = document.querySelector(".main__filter");

    function getElementMarkup(filtersData) {
        return `   
        <section class="main__filter filter container">
            <input
            type="radio"
            id="filter__all"
            class="filter__input visually-hidden"
            name="filter"
            checked
            ${filtersData.all > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__all" class="filter__label">
            All <span class="filter__all-count">${filtersData.all}</span></label
            >
            <input
            type="radio"
            id="filter__overdue"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.overdue > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__overdue" class="filter__label"
            >Overdue <span class="filter__overdue-count">${filtersData.overdue}</span></label
            >
            <input
            type="radio"
            id="filter__today"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.today > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__today" class="filter__label"
            >Today <span class="filter__today-count">${filtersData.today}</span></label
            >
            <input
            type="radio"
            id="filter__favorites"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.favorites > 0 ? "enabled" : "disabled"}
            />
            <label for="filter__favorites" class="filter__label"
            >Favorites <span class="filter__favorites-count">${filtersData.favorites}</span></label
            >
            <input
            type="radio"
            id="filter__repeating"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.repeating > 0 ? "enable" : "disable"}
            />
            <label for="filter__repeating" class="filter__label"
            >Repeating <span class="filter__repeating-count">${filtersData.repeating}</span></label
            >
            <input
            type="radio"
            id="filter__archive"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.archive > 0 ? "enable" : "disable"}
            />
            <label for="filter__archive" class="filter__label"
            >Archive <span class="filter__archive-count">${filtersData.archive}</span></label
            >
        </section>
        `
    }

    insertMarkup(parent, getElementMarkup(filtersData));
}