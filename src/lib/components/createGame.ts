import { goto } from "$app/navigation";
import { gameData } from "$lib/gameStore";
import { userData } from "$lib/userStore";
import { error } from "@sveltejs/kit";
import { get } from "svelte/store";

export async function createGame() {
    gameData.set('loading')

    try {
        let response = await fetch('/api/generate-prompt')

        if (response.status >= 400) {
            throw error(response.status, response.statusText)
        }

        let data = await response.json()
    
        const currentUserData = get(userData)
    
        if (currentUserData !== null) {
            // console.log(currentUserData)
    
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
    } catch(err) {
        gameData.set(null)
    }
    
}