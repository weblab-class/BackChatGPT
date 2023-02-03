import { writable, derived } from "svelte/store";
import type { Writable, Readable } from "svelte/store";

interface GameData {
    id: number,
    prompt: string,
    gptOutput: string,
    correctGuesses: string[],
    wrongGuesses: string[],
    timeStarted: Date,
    timeCompleted?: Date
}

interface Prompt {
    fullPrompt: string[],
    uniqueWords: string[]
}


let storedGameData: string | null = typeof window !== 'undefined' ? localStorage.getItem('gameData') : null
let initialGameData: GameData | null
if (storedGameData !== null) {
    initialGameData = JSON.parse(storedGameData)
    if (initialGameData) {
        initialGameData.timeStarted = new Date(initialGameData.timeStarted)
        initialGameData.timeCompleted = initialGameData.timeCompleted !== undefined ? new Date(initialGameData.timeCompleted) : undefined
    }
} else {
    initialGameData = storedGameData
}

// If gameData is null then there is not an active game
export const gameData: Writable<GameData | 'loading' | null> = writable(initialGameData)
export const prompt: Readable<Prompt | null> = derived(gameData, $gameData => {
    if ($gameData !== 'loading' && $gameData !== null && $gameData.prompt !== undefined) {
        const regex = /([A-Za-z0-9]+)/g
        const fullPrompt = $gameData.prompt.split(regex)
        const promptWords = fullPrompt.filter((value) => {
            return regex.test(value) 
        })
        const uniqueWords = [... new Set(promptWords.map((word) => word.toLowerCase()))]
        
        return {
            fullPrompt,
            uniqueWords
        }
    }

    return null
})

gameData.subscribe((value) => {
    if (typeof window !== 'undefined' && value !== 'loading') {
        localStorage.gameData = JSON.stringify(value)
    }
})