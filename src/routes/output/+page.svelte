<!-- This is an HTML Comment -->
<script>
    // This is a javascript comment
    let ai_output = "This is our current chat gpt output"
    let str_length = ai_output.length+2;
    import '../../app.css';
</script>


<h1 class="text-white font-mono text-lg p-8">Can you backtrack and deduce the ChatGPT prompt?</h1>

<div class="wrapper">
    <div class="typing-demo">
      {ai_output}
    </div>
</div>


<style>
    div {

        width: 90%;
        padding-left: 3%;
        margin: auto;
        background-color: white;
        color: black;
        font: mono;
    }
    .wrapper {

        height: 60vh;
        /*This part is important for centering*/
        /* display: grid; */
        place-items: left;
        
    }

    .typing-demo {

        width: 38ch;
        animation: typing 1s steps(38), blink .4s step-end infinite alternate;
        white-space: nowrap;
        overflow: hidden;
        border-right: 3px solid;
        font-family: monospace;
        font-size: 2em;
        margin:0;
    }

    @keyframes typing {

        from {
            width: 0
        }
     }

    @keyframes blink {
        50% {
            border-color: transparent
        }
    }
</style>