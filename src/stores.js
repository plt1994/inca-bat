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

export const nOfRepetitions = writable(Number(storedNOfRepetitions) || 5)
export const selectedTest = writable(0)
export const loggingStyle = writable(Number(storedLoggingStyle) || 0) //0 for verbose, 1 for simple
export const subjectName = writable(storedSubjectName || "Subject")
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
export const localLog = writable(JSON.parse(storedLocalLog || "{}") || {})
export const learnerMode = writable(false)

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


//agregar los tests las imagenes y los sonidos aqui, 
//asi se puede extender esto para que los usuarios agreguen sus propios tests