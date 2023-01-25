<script lang="ts">
    export let style: "placeholder" | "correct" | "wrong"

    let backgroundColor: string

    $: {
        if (style === 'placeholder') {
            backgroundColor = '#3f3f46'
        } else if (style === 'correct') {
            backgroundColor = '#4F6F84'
        } else if (style === 'wrong') {
            backgroundColor = '#825D61'
        }
    }
</script>

<div class="flex pl-4 pr-4 h-10 items-center text-white font-mono rounded-lg" style="background-color: {backgroundColor};">
    {#if style === 'placeholder'}
        <div class="w-20"/>
    {:else}
        <slot />
    {/if}
</div>