<script lang="ts">
    import { page } from "$app/stores";
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { gameData, prompt } from "$lib/gameStore";
    import { userInterfaceData } from "$lib/interfaceStore";
    import TerminalOutput from "$lib/components/TerminalOutput.svelte";
    // @ts-ignore
    import type { TerminalOutputObject } from "$lib/components/TerminalOutput.svelte"
    import { beforeUpdate, afterUpdate } from "svelte";
    import { createGame } from "$lib/components/createGame";
    import { userData } from "$lib/userStore";

    // export let orientation: 'vertical' | 'horizontal'

    // The current value of the terminal entry
    let currentTerminalValue: string

    // Previous Entries
    // let terminalOutput: TerminalOutputObject[] = []

    let terminalWindow: HTMLElement
    let terminalInput: HTMLElement

    // let open: true | false = true

    let autoscroll: boolean = false

    function toggleTerminal() {
        $userInterfaceData.terminalIsOpen = !$userInterfaceData.terminalIsOpen
    }

    function toggleOrientation() {
        if ($userInterfaceData.terminalOrientation === 'horizontal') {
            $userInterfaceData.terminalOrientation = 'vertical'
        } else {
            $userInterfaceData.terminalOrientation = 'horizontal'
        }
    }

    // Sets the cursor in the terminal to be active
    function focusTerminal() {
        terminalInput.focus()
    }

    // Function to handle the submission of text in the terminal
    function inputKeypress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault()

            // Update Terminal Output with new message
            let [userMessage, systemResponse] = parseCommand(currentTerminalValue)
            $userInterfaceData.terminalOutput = [...$userInterfaceData.terminalOutput, userMessage]

            if (systemResponse) {
                $userInterfaceData.terminalOutput = [...$userInterfaceData.terminalOutput, systemResponse]
            }
            
            // Reset the terminal command entry
            currentTerminalValue = ''
        }
    }

    function username(name: string | null | undefined): string {
        if (name !== undefined && name !== null) {
            let username: string = name.toLowerCase()
            username = username.replaceAll(" ", "-")

            return username
        }

        return "guest-user-1234"
    }


    // Input: terminalEntry -- a string representing the input of the user to the terminal
    // Returns: a tuple with two TerminalOutputObjects the first is the user's message the second is the system's response if there is one
    function parseCommand(terminalEntry: string): [TerminalOutputObject, TerminalOutputObject?] {

        if (terminalEntry.startsWith('guess')) {
            let enteredGuesses = terminalEntry.split(' ')

            terminalEntry = "guess"

            if ($gameData === null || $gameData === 'loading' || $prompt === null) {
                let userMessage: TerminalOutputObject = {
                    user: username($userData?.user.name),
                    message: terminalEntry
                }

                let systemResponse: TerminalOutputObject = {
                    message: `[#ef4444(Error:)] \"Cannot use guess without an active game\" \n Try starting a game by running: \n \t [#38bdf8(run new-game)] \n`
                }

                return [userMessage, systemResponse]
            }

            for (const index in enteredGuesses) {
                // Skip the first index since that is the command: 'guess'
                if (index != '0') {
                    let guess = enteredGuesses[index]
                    let guessLower = guess.toLowerCase()

                    if ($prompt.uniqueWords.includes(guessLower)) {
                        // The word guessed is in the prompt --> Correct
                        terminalEntry = terminalEntry += ` [#4ade80(${guess})]`

                        if ($gameData.correctGuesses.includes(guessLower) === false) {
                            // Add word to guessed list if not already in the list
                            $gameData.correctGuesses = [...$gameData.correctGuesses, guessLower]
                        }
                    } else {
                        // The word guessed is NOT in the prompt --> Wrong
                        terminalEntry = terminalEntry += ` [#ef4444(${guess})]`

                        if ($gameData.wrongGuesses.includes(guessLower) === false) {
                             // Add word to guessed list if not already in the list
                            $gameData.wrongGuesses = [...$gameData.wrongGuesses, guessLower]
                        }
                    }
                }
            }

            return [{
                user: username($userData?.user.name),
                message: terminalEntry
            }]

        } else if (terminalEntry === 'login') {
            signIn('google')
        } else if (terminalEntry === 'logout') {
            signOut()
        } else if (terminalEntry === 'run new-game') {
            if ($gameData === null) {
                createGame()
            } else {
                let userMessage: TerminalOutputObject = {
                    user: username($userData?.user.name),
                    message: terminalEntry
                }

                let responseMessage: TerminalOutputObject = {
                    message: `[#ef4444(Error:)] \"Cannot use run new-game when there is an active game.\" \n Try ending the game by running: \n \t [#38bdf8(run abandon-game)] \n`
                }

                return [userMessage, responseMessage]
            }
        } else if (terminalEntry === 'run abandon-game') {
            if ($gameData !== null) {
                $gameData = null
            } else {
                let userMessage: TerminalOutputObject = {
                    user: username($userData?.user.name),
                    message: terminalEntry
                }

                let responseMessage: TerminalOutputObject = {
                    message: `[#ef4444(Error:)] \"Cannot abandon without an active game\" \n Try starting a game by running: \n \t [#38bdf8(run new-game)] \n`
                }

                return [userMessage, responseMessage]
            }
        } else if (terminalEntry === 'help') {
            let userMessage: TerminalOutputObject = {
                user: username($userData?.user.name),
                message: terminalEntry
            }

            let responseMessage: TerminalOutputObject = {
                message: `Some help message with list of commands here \n`
            }

            return [userMessage, responseMessage]
        } else {
            let userMessage: TerminalOutputObject = {
                user: username($userData?.user.name),
                message: terminalEntry
            }

            let responseMessage: TerminalOutputObject = {
                message: `[#ef4444(Command not found:)] \"${terminalEntry}\" \n To see a list of supported commands run: \n \t [#38bdf8(help)] \n`
            }

            return [userMessage, responseMessage]
        }

        return [{
            user: username($userData?.user.name),
            message: terminalEntry
        }]
    }

    // Determine if the terminal needs to scroll to fit the new line
    beforeUpdate(() => {
        autoscroll = terminalWindow && (terminalWindow.offsetHeight + terminalWindow.scrollTop) > (terminalWindow.scrollHeight - 20)
    })

    afterUpdate(() => {
        if (autoscroll) {
            terminalWindow.scrollTo(0, terminalWindow.scrollHeight)
        }
    })
</script>

<div  bind:this={terminalWindow} class="bg-zinc-900  pb-4 text-white font-mono border-t-4 border-t-zinc-400 w-full overflow-y-auto" style="{$userInterfaceData.terminalIsOpen && ($userInterfaceData.terminalOrientation === 'horizontal')? `height: 400px;` : ``} {$userInterfaceData.terminalIsOpen && ($userInterfaceData.terminalOrientation === 'vertical')? `height: 100vh;` : ``}">

    <div class="sticky top-0 flex justify-between h-auto bg-zinc-900/30 px-8 pt-4 backdrop-blur-lg" style="padding-bottom: {$userInterfaceData.terminalIsOpen ? '1rem' : '0rem'};">
        <p class="underline underline-offset-8">Terminal</p>

        {#if $userInterfaceData.terminalIsOpen}
            <div>
                <!-- <button on:click={toggleOrientation}>&#91;&#93;</button> -->
                <button on:click={toggleTerminal}>X</button>
            </div>
        {:else}
            <div>
                <!-- <button on:click={toggleOrientation}>&#91;&#93;</button> -->
                <button on:click={toggleTerminal}>^</button>
            </div>
        {/if}
    </div>

    {#if $userInterfaceData.terminalIsOpen}
        <div class='terminal px-8' on:click={focusTerminal} on:keypress={focusTerminal}>

        {#each $userInterfaceData.terminalOutput as output}
            <TerminalOutput {output} />
        {/each}
        
        <div class='flex terminal-active-line'>
            <p class="whitespace-pre-wrap">
            <span>&lt;{username($userData?.user.name)}&gt; %</span>
            <span contenteditable='true' class='input' id='input' bind:this={terminalInput} bind:textContent={currentTerminalValue} on:keypress={inputKeypress} />
            </p>
        </div>
        
        </div>
    {/if}
</div>
    
<style>
    .terminal p {
        margin-top: 0;
        margin-bottom: 0;
    }

    .terminal-active-line {
        display: flex;
    }

    .terminal-active-line .input {
        margin-right: auto;
        border: none;
        caret-color: deepskyblue;
        outline: none;
    }
</style>