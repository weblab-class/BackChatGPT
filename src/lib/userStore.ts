import { get, writable } from "svelte/store";
import type { Writable } from "svelte/store";
import { page } from "$app/stores";

export interface UserData {
    user: {
        name?: string | null,
        email?: string | null,
        id?: string | null
    },
    loginMethod: 'google',
    gamesPlayed: string[],
    completedGames: string[],
    fastestCompletion: number | null
}

export const userData: Writable<UserData | null> = writable(null)

userData.subscribe(async (value) => {
    if (typeof window !== 'undefined') {
        console.log("New User Data Value", value)

        if (value !== null && value !== undefined && value.user.id) {
            const bodyJSON = JSON.stringify({
                name: value.user.name,
                email: value.user.email,
                loginMethod: value.loginMethod,
                gamesPlayed: value.gamesPlayed,
                completedGames: value.completedGames,
                fastestCompletion: value.fastestCompletion
            })

            await fetch(`/api/user/${value.user.id}`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: bodyJSON})
        }
    }
})