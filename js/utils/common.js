function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIndex(array) {
    return getRandomNum(0, array.length - 1);
}

function getRandomBool() {
    return true ? getRandomNum(0, 1) == 1 : false;
}

function formatDate(num) {
    if (num < 10) {
        return "0" + num;
    }
    return num;
}

function isCardRepeated(cardData) {
    let repeatStatus = false;

    Object.values(cardData.repeatingDays).forEach((value) => {
        if (value == true) {
            repeatStatus = true;
        }
    })

    return repeatStatus
}
