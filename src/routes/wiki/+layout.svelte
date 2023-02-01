<script lang="ts">
    import { marked } from 'marked'
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData

    // console.log(data)
    
    let markdownHTML: string
    const url = 'https://raw.githubusercontent.com/sveltejs/kit/master/README.md';
</script>

<div class='flex w-full pl-8 pt-8 h-full'>
    <!-- Navigation -->
    <div class='w-52 flex-shrink-0 h-full transition ease-in-out overflow-hidden hover:overflow-y-auto hover:transition-all'>
        <div class="sticky top-0 h-auto bg-zinc-800">
            <h1 class="text-white font-mono text-lg">Prompt Wiki</h1>
        </div>
        

        <div class="flex flex-col mt-4 gap-2">
        {#each data.wikiEntries as wiki}
            <a class="text-sky-300 hover:text-sky-600 hover:underline font-mono" href={`/wiki/${wiki.url}`}>{wiki.title}</a>
        {/each}
        </div>
        
    </div>


    <!-- Wiki Entry -->
    <div class='flex-grow h-full bg-zinc-700 rounded-tl-[48px] overflow-y-auto p-8 font-mono text-white scroll-mb-8'>
        <slot />
    </div>

</div>