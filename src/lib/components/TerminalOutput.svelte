<script lang="ts">
    interface TerminalOutputObject {
        user?: string
        message: string
    }

    interface MessageFragment {
        message: string
        color?: string
    }
    
    export let output: TerminalOutputObject

    console.log(output)
    let fragments = spliceMessage(output.message)

    export type { TerminalOutputObject }

    function spliceMessage(message: string): MessageFragment[] {

        // Finds and splits the message based on inline color styling of the format [#ffffff(the text that should be styled)]
        let fragments = message.split(/(\[#(?:[a-f\d]{6})\b.*?\)])/gm)

        return fragments.map( fragment => {
            // Finds the color and message within the message fragment
            let regexIterator = fragment.matchAll(/\[#(?<Color>[a-f\d]{6})\b(?<Message>.*?\))]/gm)
            let regexResultsArray = Array.from(regexIterator)[0]

            if (regexResultsArray === undefined) {
                return {
                    message: fragment
                }
            }

            let color: string = regexResultsArray[1]
            let message: string = regexResultsArray[2]

            message = message.replaceAll(/[(-)]/gm, '') // Removes parenthesis

            return {
                message: message,
                color: color
            }
        })
    }

</script>

<div class="whitespace-pre-wrap">
{#if output.user !== undefined} 
    <span>&lt;{output.user}&gt; %</span>
{/if}

{#each fragments as fragment}
    {#if fragment.color !== undefined}
        <span style="color: #{fragment.color}">{fragment.message}</span>
    {:else}
        <span>{fragment.message}</span>
    {/if}
{/each}


</div>
