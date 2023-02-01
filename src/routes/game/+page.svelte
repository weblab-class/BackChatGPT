<script lang="ts">
    import '../../app.css';
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import WordBlock from "$lib/components/WordBlock.svelte";
    import { gameData, prompt } from "$lib/gameStore";
    import Loading from '$lib/components/Loading.svelte';
    import { createGame } from '$lib/components/createGame';

    let progressBarLength: number | undefined
    let progress: number

    $: {
        if (($gameData !== null) && ($gameData !== 'loading') && $prompt) {
            progress = Math.round(($gameData.correctGuesses.length / $prompt.uniqueWords.length) * 100)
        }
    }

    $: {
        if (($gameData !== null) && ($gameData !== 'loading') && ($prompt !== null)) {
            if ($prompt.uniqueWords.length === $gameData.correctGuesses.length) {
                $gameData.timeCompleted = new Date()
            }
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

        const speed = 3
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
    <div class="flex flex-col text-white font-mono p-8 h-full items-center pt-32 text-center introduction">
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
{:else if $gameData === 'loading'}
    <div class="flex flex-col items-center w-full justify-center mt-32">
        <Loading />
    </div>
{:else if $prompt !== null}
    <div class='flex px-8 pt-8 pb-8 items-center'>
        <h1 class="text-white font-mono text-lg mr-auto">Can you backtrack and deduce the ChatGPT prompt from this output?</h1>

        <button on:click={abandonGame} class="bg-rose-600 shadow-lg shadow-rose-600/40 text-white font-mono py-2 px-8 text-md rounded-lg hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/50">Abandon Game</button>
    </div>
    

    <div class="wrapper mx-8 p-4 font-mono bg-zinc-900 text-base text-white rounded-lg ring-2 ring-zinc-700 whitespace-pre-wrap">
        <div class="typing-demo" in:typingAnimation>
        {$gameData.gptOutput}
        </div>
    </div>

    <h1 class="text-white font-mono text-lg px-8 pt-8">Prompt:</h1>

    <div class="mx-8 mt-8 p-4 font-mono bg-zinc-900 text-base text-white rounded-lg ring-2 ring-zinc-700">
        <p class="whitespace-pre-wrap select-none leading-[54px] font-mono">
        {#each $prompt.fullPrompt as word}
            {#if $gameData.correctGuesses.includes(word.toLowerCase())}
                <span class="text-white px-4 py-3 rounded-lg bg-[#4F6F84]">{word}</span>
            {:else if /([A-Za-z0-9]+)/.test(word)}
                <span class="text-white text-opacity-0 px-4 py-3 rounded-lg bg-zinc-600">{word}</span>
            {:else}
                <span class="text-white">{word}</span>
            {/if}
        {/each}
        </p>

        <div class="w-full mt-4 h-0.5 bg-zinc-600" />

        <div class="flex mt-4 pr-2 w-full">
            <p class="w-max flex-none">Decoding Progress:</p>
            <div bind:clientWidth={progressBarLength} class="grow">
                {#if progressBarLength && progressBarLength > 200}
                <ProgressBar totalWidth={progressBarLength} progress={progress} />
                {:else}
                <p class="text-right">{progress}%</p>
                {/if}
            </div>
        </div>
    </div>

    <p class="text-white font-mono text-base pl-8 pt-8">
        To make a guess type
        <kbd class="text-gray-300 bg-zinc-900 italic p-2 pl-4 pr-4 rounded-lg ring-2 ring-zinc-700">guess WORD</kbd>
        into the terminal. 
    </p>

    <h2 class="text-white font-mono text-lg pl-8 pt-8">Incorrect Answers:</h2>

    <div class="flex flex-wrap gap-4 pt-4 pl-8 pb-8">
        {#each $gameData.wrongGuesses as wrongGuess}
            <WordBlock style={'wrong'}>{wrongGuess}</WordBlock>
        {/each}
    </div>
{/if}



<style lang="postcss">
    .introduction span {
        color: theme(colors.sky.500);
    }
</style>