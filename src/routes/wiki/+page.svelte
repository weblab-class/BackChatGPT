<script lang="ts">
    import { marked } from 'marked'
    // import * as fs from 'fs'

    let markdownHTML: string
    const url = 'https://raw.githubusercontent.com/sveltejs/kit/master/README.md';

    // fs.readFile('IntroWiki.md', 'utf-8', (err, data) => {
    //     markdownHTML = marked(data)
    //     console.log(markdownHTML)
    // })
</script>

<div class='grid grid-cols-6 pl-8 pt-8 h-full'>
    <!-- Navigation -->
    <div class='col-span-1 h-full overflow-y-auto'>
        <h1 class="text-white font-mono text-lg">Prompt Wiki</h1>
    </div>


    <!-- Wiki Entry -->
    <div class='wiki-container col-span-5 h-full bg-zinc-700 rounded-tl-[48px] overflow-y-auto p-8 font-mono text-white'>
        {#await fetch(url).then(r => r.text()) then text }
            {@html marked(text)}
        {/await}
    </div>

</div>

<style lang="postcss">
    :global(.wiki-container h1) {
        font-size: theme(fontSize.4xl);
        margin-top: theme(margin.4);
        margin-bottom: theme(margin.4);
    }

    :global(.wiki-container h2) {
        font-size: theme(fontSize.2xl);
        margin-top: theme(margin.4);
        margin-bottom: theme(margin.4);
    }

    :global(.wiki-container h3) {
        font-size: theme(fontSize.xl);
        margin-top: theme(margin.4);
        margin-bottom: theme(margin.4);
    }

    :global(.wiki-container h4) {
        font-size: theme(fontSize.lg);
        margin-top: theme(margin.4);
        margin-bottom: theme(margin.4);
    }

    :global(.wiki-container p) {
        font-size: theme(fontSize.lg);
        margin-top: theme(margin.4);
        margin-bottom: theme(margin.4);
    }

    :global(.wiki-container ul) {
        list-style: disc;
        margin-top: theme(margin.4);
        margin-bottom: theme(margin.4);
        padding-left: theme(padding.10);
    }

    :global(.wiki-container a) {
        color: theme(colors.sky.300);
    }

    :global(.wiki-container a:hover) {
        color: theme(colors.sky.600);
        text-decoration-line: underline;
    }
</style>