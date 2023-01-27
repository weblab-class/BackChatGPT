<script lang="ts">
    import '../../app.css';
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import WordBlock from "$lib/components/WordBlock.svelte";
    import { gameData } from "$lib/gameStore";


    let ai_output = "This is our current chat gpt output"

    let promptWords: string[]
    let uniquePromptWords: string[]

    $: {
        if ($gameData !== null) {
            console.log($gameData)
            console.log($gameData.prompt)

            promptWords = $gameData.prompt.toLowerCase().split(' ')
            uniquePromptWords = [... new Set(promptWords)]
        }
    }

    function createGame() {
        $gameData = {
            prompt: 'Write a 50 word story about AI.',
            id: 1,
            gptOutput: 'Some output based off the prompt.',
            correctGuesses: [],
            wrongGuesses: [],
            timeStarted: new Date()
        }
    }

    function abandonGame() {
        $gameData = null
    }

    function typingAnimation(node: HTMLElement) {
        const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;

        if (!text) {
            throw new Error(`No text for transition`)
        }

        const speed = 1.5
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t: number) => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			},
		};
	}
</script>

{#if $gameData === null} 
    <div class="flex flex-col text-white font-mono p-8 h-full items-center pt-32 text-center">
        <h1 class="text-3xl pb-4">Welcome to BackChatGPT</h1>

        <p>Test your knowledge of <span>AI</span> by working backwards to discover the <span>prompt</span> that generated a given <span>GPT output</span>.</p>
        <p>As you play discover <span>hidden features</span> that make decoding the prompt easier.</p>
        <p>Find all the easter-eggs to fully become an <span>AI Detective</span>.</p>

        <button on:click={createGame} class="bg-blue-500 shadow-lg shadow-blue-500/40 text-white py-2 px-8 font-semibold text-lg rounded-lg my-8 hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-400/50">New Game</button>

        <p class="w-full lg:w-2/3 text-sm leading-8 opacity-70">
            <span>Pro Tip: </span>
            To get you into the developer mindset, BackChatGPT relies on the terminal window below for most input. Try typing 
            <kbd class="text-gray-300 bg-zinc-900 italic p-2 pl-4 pr-4 rounded-lg ring-2 ring-zinc-700">run new-game</kbd>
            instead of clicking the button above.
        </p>
    </div>
{:else}
    <div class='flex px-8 pt-8 pb-8 items-center'>
        <h1 class="text-white font-mono text-lg mr-auto">Can you backtrack and deduce the ChatGPT prompt from this output?</h1>

        <button on:click={abandonGame} class="bg-rose-600 shadow-lg shadow-rose-600/40 text-white font-mono py-2 px-8 text-md rounded-lg hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/50">Abandon Game</button>
    </div>
    

    <div class="wrapper mx-8 p-4 font-mono bg-zinc-900 text-base text-white rounded-lg ring-2 ring-zinc-700">
        <div class="typing-demo" in:typingAnimation>
        {$gameData.gptOutput}
        </div>
    </div>

    <h1 class="text-white font-mono text-lg p-8">Prompt Decoding Progress</h1>

    <ProgressBar currentValue={$gameData.correctGuesses.length} endValue={uniquePromptWords.length} />

    <p class="text-white font-mono text-base pl-8 pt-8">
        To make a guess type
        <kbd class="text-gray-300 bg-zinc-900 italic p-2 pl-4 pr-4 rounded-lg ring-2 ring-zinc-700">guess WORD</kbd>
        into the terminal. 
    </p>

    <div class="flex flex-wrap gap-4 pt-8 pl-8">
    {#each promptWords as word}
        {#if $gameData.correctGuesses.includes(word)}
            <WordBlock style={'correct'}>{word}</WordBlock>
        {:else}
            <WordBlock style={'placeholder'} />
        {/if}
    {/each}
    </div>

    <h2 class="text-white font-mono text-lg pl-8 pt-8">Incorrect Answers</h2>

    <div class="flex flex-wrap gap-4 pt-4 pl-8">
        {#each $gameData.wrongGuesses as wrongGuess}
            <WordBlock style={'wrong'}>{wrongGuess}</WordBlock>
        {/each}
    </div>
{/if}



<style lang="postcss">
    span {
        color: theme(colors.sky.500);
    }

    /* span.caret {
        color: red;
        width: 1px;
        height: 100%;
        animation: blink .4s step-end infinite alternate;
        border-right: 3px solid;
    } */
/* 
    @keyframes typing {

        from {
            width: 0
        }
     } */

    /* @keyframes blink {
        50% {
            border-color: transparent
        }
    } */
</style>