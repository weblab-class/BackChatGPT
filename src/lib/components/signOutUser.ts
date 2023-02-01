import { signOut } from "@auth/sveltekit/client"

export async function signOutUser() {
    await signOut()

    const initialInterfaceData = {
        terminalOutput: [],
        terminalIsOpen: false,
        terminalOrientation: 'horizontal'
    }

    localStorage.gameData = JSON.stringify(null)
    localStorage.userInterfaceData = JSON.stringify(initialInterfaceData)
}