<script lang="ts">

    import "../../styles/block-styles/quiz-block.css"

    let data = [{
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
    }]

    function isAnswer(answer: boolean) {
        if (answer == true) {
            alert("correct")
        } else {
            alert("incorrect")
        }
    }

</script>

<div class="quiz-block">
    <h3>{data[0]["data"]["question"]}</h3>
    <div class="options">
        {#each Object.values(data[0]["data"]["options"]) as option}
            <button on:click={() => isAnswer(option.isCorrect)}>{option.text}</button>
        {/each}
    </div>
</div>