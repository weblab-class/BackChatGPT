<script lang="ts">
    import { page } from "$app/stores";
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { prompt, correctGuesses, wrongGuesses } from "$lib/gameStore";

    import TerminalOutput from "$lib/components/TerminalOutput.svelte";
    // @ts-ignore
    import type { TerminalOutputObject } from "$lib/components/TerminalOutput.svelte"

    export let orientation: 'vertical' | 'horizontal'

    // The current value of the terminal entry
    let currentTerminalValue: string

    // Previous Entries
    let terminalOutput: TerminalOutputObject[] = []

    let terminalInput: HTMLElement

    let open: true | false = true

    function toggleTerminal() {
        open = !open
    }

    function toggleOrientation() {
        if (orientation === 'horizontal') {
            orientation = 'vertical'
        } else {
            orientation = 'horizontal'
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

            currentTerminalValue = parseCommand(currentTerminalValue)

            let latestMessage: TerminalOutputObject = {
                user: username(),
                message: currentTerminalValue
            }
            terminalOutput = [...terminalOutput, latestMessage]

            
            
            currentTerminalValue = ''
        }
    }


    function parseCommand(terminalEntry: string): string {

        if (terminalEntry.startsWith('guess')) {
            console.log('Guess command')

            let enteredGuesses = terminalEntry.split(' ')

            terminalEntry = "guess"

            let promptWords = $prompt.toLowerCase().split(' ')
            let uniquePromptWords = [... new Set(promptWords)]

            for (const index in enteredGuesses) {
                // Skip the first index since that is the command: 'guess'
                if (index != '0') {
                    let guess = enteredGuesses[index]
                    let guessLower = guess.toLowerCase()

                    if (uniquePromptWords.includes(guessLower)) {
                        // The word guessed is in the prompt --> Correct
                        terminalEntry = terminalEntry += ` [#4ade80(${guess})]`

                        if ($correctGuesses.includes(guessLower) === false) {
                            // Add word to guessed list if not already in the list
                            $correctGuesses = [...$correctGuesses, guessLower]
                        }
                    } else {
                        // The word guessed is NOT in the prompt --> Wrong
                        terminalEntry = terminalEntry += ` [#ef4444(${guess})]`

                        if ($wrongGuesses.includes(guessLower) === false) {
                             // Add word to guessed list if not already in the list
                            $wrongGuesses = [...$wrongGuesses, guessLower]
                        }
                    }
                }
            }

            return terminalEntry

        } else if (terminalEntry === 'login') {
            signIn('google')
        } else if (terminalEntry === 'logout') {
            signOut()
        } else if (terminalEntry === 'help') {
            let responseMessage: TerminalOutputObject = {
                message: `Some help message with list of commands here \n`
            }

            terminalOutput = [...terminalOutput, responseMessage]
        } else {
            console.log('Command not found')
            let responseMessage: TerminalOutputObject = {
                message: `[#ef4444(Command not found:)] \"${terminalEntry}\" \n To see a list of supported commands run: \n \t [#38bdf8(help)] \n`
            }

            terminalOutput = [...terminalOutput, responseMessage]
        }

        return terminalEntry
    }

    let username = (): string => {
        if ($page.data.session) {
            console.log("Is session")
            console.log($page.data.session.user)

            if ($page.data.session.user?.name) {
                console.log($page.data.session.user?.name)

                let username: string = $page.data.session.user?.name.toLowerCase()
                username = username.replaceAll(" ", "-")

                return username
            }
        }

        return "guest-user-1234"
    }
</script>

<div class="bg-zinc-900 pl-8 pr-8 pt-4 pb-4 text-white font-mono border-t-4 border-t-zinc-400 w-full" style="{open && (orientation === 'horizontal')? `height: 400px;` : ``} {open && (orientation === 'vertical')? `height: 100vh;` : ``}" on:click={focusTerminal} on:keypress={focusTerminal}>

    <div class="flex justify-between h-auto" style="padding-bottom: {open ? '1rem' : '0rem'};">
        <p class="underline underline-offset-8">Terminal</p>

        {#if open}
            <div>
                <button on:click={toggleOrientation}>&#91;&#93;</button>
                <button on:click={toggleTerminal}>X</button>
            </div>
        {:else}
            <div>
                <button on:click={toggleOrientation}>&#91;&#93;</button>
                <button on:click={toggleTerminal}>^</button>
            </div>
        {/if}
    </div>

    {#if open}
        <div class='terminal h-full overflow-y-auto' on:click={focusTerminal} on:keypress={focusTerminal}>

        {#each terminalOutput as output}
            <TerminalOutput {output} />
        {/each}
        
        <div class='flex terminal-active-line'>
            <p>
            <span>&lt;{username()}&gt; %</span>
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