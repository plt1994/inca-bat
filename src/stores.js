import { writable } from 'svelte/store';

const storedSubjectName = localStorage.subjectName

export const count = writable(0);
export const nOfRepetitions = writable(5)
export const selectedTest = writable(0)
export const loggingStyle = writable(0) //0 for verbose, 1 for simple
export const subjectName = writable(storedSubjectName || "Subject")
export const cardsSeparation = writable(5) //1 to 10
export const nOfCardsOnScreen = writable(2)
export const timeHoldToExit = writable(2)
export const showTitle = writable(false)
export const showCardText = writable(true)
export const silenceVoice = writable(false)
export const silenceFeedback = writable(false)
export const currentFeedbackSound = writable(1)
export const saveLog = writable(true)
export const cardH = writable(180)
export const cardW = writable(160)

subjectName.subscribe((value) => {
    console.log(localStorage)
    localStorage.subjectName = value
})