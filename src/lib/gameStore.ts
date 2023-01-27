import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

interface GameData {
    id: number,
    prompt: string,
    gptOutput: string,
    correctGuesses: string[],
    wrongGuesses: string[],
    timeStarted: Date,
    timeCompleted?: Date,
}



let storedGameData: string | null = typeof window !== 'undefined' ? localStorage.getItem('gameData') : null
let initialGameData: GameData | null
if (storedGameData !== null) {
    initialGameData = JSON.parse(storedGameData)
} else {
    initialGameData = storedGameData
}

// If gameData is null then there is not an active game
export const gameData: Writable<GameData | null> = writable(initialGameData)

gameData.subscribe((value) => {
    if (typeof window !== 'undefined') {
        localStorage.gameData = JSON.stringify(value)
    }
})