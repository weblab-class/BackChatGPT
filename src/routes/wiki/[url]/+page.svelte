<script lang="ts">
    import type { PageData } from './$types';
    import { marked } from 'marked';

    export let data: PageData
</script>


<div class='wiki-container w-full h-full'>
    {@html marked(data.wiki.body)}
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

    :global(.wiki-container pre) {
        @apply text-gray-300 bg-zinc-900 italic p-2 pl-4 pr-4 rounded-lg ring-2 ring-zinc-500
    }

    :global(.wiki-container code) {
        @apply text-gray-300 bg-zinc-900 italic p-1 pl-2 pr-2 rounded-lg
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