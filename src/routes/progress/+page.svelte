<script>
    import ProgressBar from "$lib/components/ProgressBar.svelte";
    import WordBlock from "$lib/components/WordBlock.svelte";

    let currentValue = 3
</script>



<h1 class="text-white font-mono text-lg p-8">Prompt Decoding Progress</h1>

<ProgressBar currentValue={currentValue} endValue={10} />

<div class="flex gap-4 pt-8 pl-8">
<WordBlock style={'placeholder'} />
<WordBlock style={'placeholder'} />
<WordBlock style={'correct'}>Something</WordBlock>
<WordBlock style={'placeholder'} />
<WordBlock style={'placeholder'} />
</div>

<h2 class="text-white font-mono text-lg pl-8 pt-8">Incorrect Answers</h2>

<div class="flex gap-4 pt-4 pl-8">
    <WordBlock style={'wrong'}>Not</WordBlock>
    <WordBlock style={'wrong'}>This</WordBlock>
</div>
