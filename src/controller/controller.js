import { localCards, localTests } from "stores/stores.js";

import { cards } from "./cards"
import { tests } from "./tests.js";

let allCards;
let allTests;
let localCardsValues;
let localTestsValues;

localCards.subscribe((value) => {
    allCards = [...cards, ...value]
})

localTests.subscribe((value) => {
    allTests = [...tests, ...value]
})

localCards.subscribe((value) => {
    localCardsValues = value;
})

export function getTests() {
    return allTests
}

export function getTest(id) {
    for (let i = 0; i < allTests.length; i++) {
        let test = allTests[i];
        if (test.id == id) {
            return test
        }
    }
    return null;
};


//TODO: put this in stores
function createTest(testCards, name) {
    let lastId = 0;
    for (let i = 0; i < tests.length; i++) {
        let test = tests[i];
        if (test.id > lastId) {
            lastId = test.id
        }
    }
    newTest = {
        "id": lastId,
        "name": name,
        "cards": testCards
    }
    tests.push(newTest)
}

export function getCard(id) {
    for (let i = 0; i < allCards.length; i++) {
        let card = allCards[i];
        if (card.id == id) {
            return card
        }
    }
    return null;
}

export function getCards() {
    return allCards
}

export function getLocalCards() {
    return localCardsValues;
}

export function verifyCardUsage(id) {
    let testsList = [];
    for (let i = 0; i < allTests.length; i++) {
        let test = allTests[i];
        let testCards = test.cards;
        testCards.forEach(testCard => {
            if (testCard.cardId == id) {
                testsList.push(test.name);
            }
        });
    }
    return testsList;
}

export function deleteCard(id) {
    localCards.update((localCards) => {
        let newLocalCards = localCards.filter(item => item.id !== id)
        return newLocalCards;
    });
}
