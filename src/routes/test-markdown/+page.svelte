<script lang="ts">
    import type { PageData } from './$types';

    let title: string
    let url: string
    let body: string

    async function upload() {
        const bodyJSON = JSON.stringify({
            title: title,
            url: url,
            body: body
        })
        
        const response = await fetch('/api/upload-db', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: bodyJSON })

        console.log(response)
    }
</script>

<div class="p-8 w-full">
    <h1 class="text-white">Title</h1>
    <textarea bind:value={title} class="w-full text-black" />
    
    <h1 class="text-white">URL</h1>
    <textarea bind:value={url} class="w-full text-black" />
    
    <h1 class="text-white">Markdown</h1>
    <textarea bind:value={body} class="w-full text-black" />
    
    <button class="text-white pt-8" on:click={upload}>Upload to MongoDB</button>
</div>

