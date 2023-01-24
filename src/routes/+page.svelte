<script lang="ts">
    import TerminalOutput from "$lib/components/TerminalOutput.svelte";
    // @ts-ignore
    import type { TerminalOutputObject } from "$lib/components/TerminalOutput.svelte"
     // The current value of the terminal entry
    let currentTerminalValue: string

    // Previous Entries
    let terminalOutput: TerminalOutputObject[] = []

    let terminalInput: HTMLElement

    // Sets the cursor in the terminal to be active
    function focusTerminal() {
        terminalInput.focus()
    }

    // Function to handle the submission of text in the terminal
    function inputKeypress(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault()

            let latestMessage: TerminalOutputObject = {
                user: "username",
                message: currentTerminalValue
            }
            terminalOutput = [...terminalOutput, latestMessage]

            parseCommand(currentTerminalValue)
            
            currentTerminalValue = ''
        }
    }


    function parseCommand(terminalEntry: string): string | null {

        if (terminalEntry.startsWith('guess')) {
            console.log('Guess command')
        } else if (terminalEntry === 'login') {
            console.log('Login Command')
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

        return null
    }
</script>

<div class='terminal text-white font-mono p-8' on:click={focusTerminal} on:keypress={focusTerminal}>

{#each terminalOutput as output}
    <TerminalOutput {output} />
{/each}

<div class='terminal-active-line'>
    <p>
    <span>&lt;username&gt; %</span>
    <span contenteditable='true' class='input' id='input' bind:this={terminalInput} bind:textContent={currentTerminalValue} on:keypress={inputKeypress} />
    </p>
</div>

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