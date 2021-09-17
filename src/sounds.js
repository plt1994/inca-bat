export const Sounds = {
    0: null,
    1: "sounds/cards/1.mp3",

};

export const feedbackSounds = {
    0: null,
    1: "sounds/yes.mp3",
    2: "sounds/no.mp3",
    3: "sounds/correct.mp3",
    4: "sounds/incorrect.mp3",
    5: "sounds/clickoff.mp3",
}

export const feedbackSoundsOptions = {
    0: {
        fbIds: [0, 0],
        name: "No feedback sound",
    },
    1: {
        fbIds: [1, 2],
        name: "yes/no",
    },
    2: {
        fbIds: [3, 4],
        name: "correct/incorrect",
    },
    3: {
        fbIds: [5, 5],
        name: "Click sound",
    },
}