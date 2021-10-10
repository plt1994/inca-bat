import { tests } from "./tests.js";
import { card } from "./cards"
import { Sounds } from "./sounds"
import { Images } from "./images"

export function getImage(id) {
    return Images[id] || "images/default.png";
}

export function getTests() {
    return tests
}

export function getTest(id) {
    for (let i = 0; i < tests.length; i++) {
        let test = tests[i];
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
    return card[id]
}

export function getCards() {
    return Object.values(card)
}

export function getSound(id) {
    return Sounds[id]
}
