<script lang="ts">

    import "../../styles/blocks/quiz-block.css"
    interface quizBlock {
        question: string,
        options: {
            A: {
                text: string,
                isCorrect: boolean
            },
            B: {
                text: string,
                isCorrect: boolean
            },
            C: {
                text: string,
                isCorrect: boolean
            },
            D: {
                text: string,
                isCorrect: boolean
            }
        }
    }

    // takes the block data as a parameter using the above interface as the data type
    export let blockData: quizBlock[];

    function isAnswer(answer: boolean) {
        if (answer == true) {
            alert("correct")
        } else {
            alert("incorrect")
        }
    }

</script>

<div class="quiz-block">
    <h1>{blockData[0]["question"]}</h1>
    <div class="options">
        {#each Object.values(blockData[0]["options"]) as option}
            <button on:click={() => isAnswer(option.isCorrect)}>{option.text}</button>
        {/each}
    </div>
</div>