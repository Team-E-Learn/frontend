<script lang="ts">

    import "../../styles/block-styles/quiz-block.css"
    interface quizBlock {
        data: {
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
    }

    let data = {
        "data": {
            "question": "press option A",
            "options" : {
                "A": {
                    "text": "Option A",
                    "isCorrect": true
                },
                "B": {
                    "text": "Option B",
                    "isCorrect": false
                },
                "C": {
                    "text": "Option C",
                    "isCorrect": false
                },
                "D": {
                    "text": "Option D",
                    "isCorrect": false
                }
            }
        }
    }
    function isAnswer(answer: boolean) {
        if (answer == true) {
            alert("correct")
        } else {
            alert("incorrect")
        }
    }

</script>

<div class="quiz-block">
    <h1>{data["data"]["question"]}</h1>
    <div class="options">
        {#each Object.values(data["data"]["options"]) as option}
            <button on:click={() => isAnswer(option.isCorrect)}>{option.text}</button>
        {/each}
    </div>
</div>