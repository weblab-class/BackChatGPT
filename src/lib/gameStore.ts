import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const prompt: Writable<string> = writable('Write a 50 word story that explains the creation of the world to a second grader')
export const correctGuesses: Writable<string[]> = writable([])
export const wrongGuesses: Writable<string[]> = writable([])