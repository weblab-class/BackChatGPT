<script>
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import WordBlock from "$lib/components/WordBlock.svelte";
    import { prompt, correctGuesses, wrongGuesses } from "$lib/gameStore";

    let promptWords = $prompt.toLowerCase().split(' ')
    let uniquePromptWords = [... new Set(promptWords)]
</script>



<h1 class="text-white font-mono text-lg p-8">Prompt Decoding Progress</h1>

<ProgressBar currentValue={$correctGuesses.length} endValue={uniquePromptWords.length} />

<p class="text-white font-mono text-base pl-8 pt-8">
    To make a guess type
    <kbd class="text-gray-300 bg-zinc-900 italic p-2 pl-4 pr-4 rounded-lg ring-2 ring-zinc-700">guess WORD</kbd>
    into the terminal. 
</p>

<div class="flex flex-wrap gap-4 pt-8 pl-8">
{#each promptWords as word}
    {#if $correctGuesses.includes(word)}
        <WordBlock style={'correct'}>{word}</WordBlock>
    {:else}
        <WordBlock style={'placeholder'} />
    {/if}
{/each}
</div>

<h2 class="text-white font-mono text-lg pl-8 pt-8">Incorrect Answers</h2>

<div class="flex flex-wrap gap-4 pt-4 pl-8">
    {#each $wrongGuesses as wrongGuess}
        <WordBlock style={'wrong'}>{wrongGuess}</WordBlock>
    {/each}
</div>
