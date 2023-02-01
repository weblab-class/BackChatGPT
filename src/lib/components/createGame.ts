import { gameData } from "$lib/gameStore";
import { userData } from "$lib/userStore";
import { get } from "svelte/store";

export async function createGame() {
    gameData.set('loading')

    let response = await fetch('/api/generate-prompt')
    let data = await response.json()

    const currentUserData = get(userData)

    if (currentUserData !== null) {
        console.log(currentUserData)

        if (currentUserData.gamesPlayed === undefined || currentUserData.gamesPlayed === null) {
            currentUserData.gamesPlayed = [data.prompt]
        } else {
            currentUserData.gamesPlayed = [...currentUserData.gamesPlayed, data.prompt]
        }

        userData.set(currentUserData)
    }


    gameData.set({
        prompt: data.prompt,
        id: 1,
        gptOutput: data.gptOutput,
        correctGuesses: [],
        wrongGuesses: [],
        timeStarted: new Date()
    })
}