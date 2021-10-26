import { writable } from 'svelte/store';

//check for client local storage store values
const storedSubjectName = localStorage.subjectName
const storedNOfRepetitions = localStorage.nOfRepetitions
const storedLoggingStyle = localStorage.loggingStyle
const storedCardsSeparation = localStorage.cardsSeparation
const storedNOfCardsOnScreen = localStorage.nOfCardsOnScreen
const storedTimeHoldToExit = localStorage.timeHoldToExit
const storedShowTitle = localStorage.showTitle
const storedShowCardText = localStorage.showCardText
const storedSilenceVoice = localStorage.silenceVoice
const storedSilenceFeedback = localStorage.silenceFeedback
const storedCurrentFeedbackSound = localStorage.currentFeedbackSound
const storedSaveLog = localStorage.saveLog
const storedCardH = localStorage.cardH
const storedCardW = localStorage.cardW
const storedLocalLog = localStorage.localLog
const storedBackgroundColor = localStorage.bgColor
const storedCardBackgroundColor = localStorage.cardBgColor
const storedLocalTests = localStorage.localTests
const storedLocalCards = localStorage.localCards
const storedUsername = localStorage.username


export const nOfRepetitions = writable(Number(storedNOfRepetitions) || 5)
export const selectedTest = writable("0")
export const loggingStyle = writable(Number(storedLoggingStyle) || 0) //0 for verbose, 1 for simple
export const subjectName = writable(storedSubjectName || "Subject")
export const username = writable(storedUsername || "Default")
export const cardsSeparation = writable(Number(storedCardsSeparation) || 5) //1 to 10
export const nOfCardsOnScreen = writable(Number(storedNOfCardsOnScreen) || 2)
export const timeHoldToExit = writable(Number(storedTimeHoldToExit) || 2)
export const showTitle = writable(false)
export const showCardText = writable(false)
export const silenceVoice = writable(storedSilenceVoice === "true" || false)
export const silenceFeedback = writable(Boolean(storedSilenceFeedback) || false)
export const currentFeedbackSound = writable(Number(storedCurrentFeedbackSound) || 1)
export const saveLog = writable(true)
export const cardH = writable(Number(storedCardH) || 180)
export const cardW = writable(Number(storedCardW) || 160)
export const localLog = writable(JSON.parse(storedLocalLog || "{}"))
export const learnerMode = writable(false)
export const page = writable("menu")
export const bgColor = writable(storedBackgroundColor || "#fff")
export const cardBgColor = writable(storedCardBackgroundColor || "#fff")

//local Tests
export const localTests = writable(JSON.parse(storedLocalTests || "[]") || [{
    localId: 0,
    id: "local-0",
    cards: [
        {
            cardId: 0,
            msg: "touch the white",
            selectable: false,
            soundSrc: null
        },
        {
            cardId: 2,
            msg: "touch the number 1",
            selectable: true,
            soundSrc: "sounds/cards/1.mp3"
        },
        {
            cardId: 3,
            msg: "touch the number 2",
            selectable: true,
            soundSrc: "sounds/cards/2.mp3"
        },
        {
            cardId: "local-0",
            msg: "",
            selectable: false,
            soundSrc: null
        }
    ],
    name: "touch the dot demo 3",
    tags: ["Local"]
}])
export const localCards = writable(JSON.parse(storedLocalCards || "[]") || [{
    localId: 0,
    id: "local-0",
    cardName: "queen card",
    cardType: "imageCard",
    details: {
        imgSrc: "images/card-1.png"
    }
}])

localTests.subscribe((value) => {
    localStorage.localTests = JSON.stringify(value)
})

localCards.subscribe((value) => {
    localStorage.localCards = JSON.stringify(value)
})

username.subscribe((value) => {
    localStorage.username = value
})

cardBgColor.subscribe((value) => {
    localStorage.cardBgColor = value
})

bgColor.subscribe((value) => {
    localStorage.bgColor = value
})

subjectName.subscribe((value) => {
    localStorage.subjectName = value
})

nOfRepetitions.subscribe((value) => {
    localStorage.nOfRepetitions = value
})

loggingStyle.subscribe((value) => {
    localStorage.loggingStyle = value
})

cardsSeparation.subscribe((value) => {
    localStorage.cardsSeparation = value
})

nOfCardsOnScreen.subscribe((value) => {
    localStorage.nOfCardsOnScreen = value
})

timeHoldToExit.subscribe((value) => {
    localStorage.timeHoldToExit = value
})

silenceVoice.subscribe((value) => {
    console.log(value)
    localStorage.silenceVoice = value
})

silenceFeedback.subscribe((value) => {
    localStorage.silenceFeedback = value
})

currentFeedbackSound.subscribe((value) => {
    localStorage.currentFeedbackSound = value
})

cardH.subscribe((value) => {
    localStorage.cardH = value
})

cardW.subscribe((value) => {
    localStorage.cardW = value
})

localLog.subscribe((value) => {
    localStorage.localLog = JSON.stringify(value)
})
