<script lang="ts">
    import { onMount } from "svelte";


    export let currentValue: number
    export let endValue: number

    let totalWidth: number
    let segmentWidth = 8

    let totalSegments: number
    let filledSegments: number
    let remainingSegments: number

    function calculateProgress(currentValue: number) {
        console.log(totalWidth)
        totalSegments = Math.round(totalWidth / (segmentWidth + 4))

        let percentComplete = currentValue / endValue

        filledSegments = Math.round(percentComplete * totalSegments)
        remainingSegments = totalSegments - filledSegments

        console.log(filledSegments)
    }

    onMount(() => {
        calculateProgress(currentValue)
    })

    $: {
        if (isFinite(totalWidth)) {
            calculateProgress(currentValue)
        }
    }


</script>

<div class="pl-8 pr-8">
    <div bind:clientWidth={totalWidth} class="flex gap-1 w-full h-7">
        {#each Array(filledSegments) as _}
            <div class="bg-sky-300 h-full opacity-80" style="width: {segmentWidth}px;"/>
        {/each}
        {#each Array(remainingSegments) as _}
            <div class="bg-sky-300 h-full opacity-20" style="width: {segmentWidth}px;"/>
        {/each}
    </div>
</div>