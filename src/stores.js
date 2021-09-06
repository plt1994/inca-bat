import { writable } from 'svelte/store';

export const count = writable(0);
export const nOfRepetitions = writable(5)
export const selectedTest = writable(0)
