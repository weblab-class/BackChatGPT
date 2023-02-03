import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
// @ts-ignore
import type { TerminalOutputObject } from "$lib/components/TerminalOutput.svelte"

interface UserInterfaceData {
    terminalOutput: TerminalOutputObject[],
    terminalIsOpen: boolean,
    terminalOrientation: 'horizontal' | 'vertical'
}

let storedInterfaceData: string | null = typeof window !== 'undefined' ? localStorage.getItem('userInterfaceData') : null
let initialInterfaceData: UserInterfaceData
if (storedInterfaceData !== null && storedInterfaceData !== undefined) {
    initialInterfaceData = JSON.parse(storedInterfaceData)
} else {
    initialInterfaceData = {
        terminalOutput: [],
        terminalIsOpen: false,
        terminalOrientation: 'horizontal'
    }
}

// If gameData is null then there is not an active game
export const userInterfaceData: Writable<UserInterfaceData> = writable(initialInterfaceData)

userInterfaceData.subscribe((value) => {
    if (typeof window !== 'undefined') {
        localStorage.userInterfaceData = JSON.stringify(value)
    }
})