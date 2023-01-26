import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const prompt: Writable<string> = writable('')
export const correctGuesses: Writable<string[]> = writable([])
export const wrongGuesses: Writable<string[]> = writable([])