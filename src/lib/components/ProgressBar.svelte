<script lang="ts">
    import { onMount } from "svelte";


    export let progress: number // Number representing the progress from 0-100
    export let totalWidth: number

    let segmentWidth = 8
    let gapWidth = 4

    let totalSegments: number
    let filledSegments: number
    let remainingSegments: number

    function calculateProgress(progress: number) {
        totalSegments = Math.round(totalWidth / (segmentWidth + 4))

        filledSegments = Math.round((progress / 100) * totalSegments)
        remainingSegments = totalSegments - filledSegments
    }

    onMount(() => {
        calculateProgress(progress)
    })

    $: {
        if (totalWidth) {
            calculateProgress(progress)
        }
    }


</script>

<div class="mx-2 flex gap-1 w-full h-7 relative">
    {#each Array(filledSegments) as _, i}
        <div class="bg-sky-300 h-full opacity-80 absolute" style="width: {segmentWidth}px; left: {(segmentWidth + gapWidth) * i}px"/>
    {/each}
    {#each Array(remainingSegments) as _, i}
        <div class="bg-sky-300 h-full opacity-20 absolute" style="width: {segmentWidth}px; left: {(segmentWidth + gapWidth) * (filledSegments + i)}px"/>
    {/each}
</div>