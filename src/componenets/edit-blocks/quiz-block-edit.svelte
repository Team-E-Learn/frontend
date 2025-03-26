<script lang="ts">

    import "../../styles/blocks/quiz-block.css"

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

    // parameters this block takes
    export let block_id: number;
    export let blockData: quizBlock[];
    // the current order of the block, this is as a variable in the styles for the block
    export let order: number;
    // functions for moving and deleting the block
    export let moveBlock;
    export let deleteBlock: any;

</script>

<div class="quiz-block" style="--blockOrder: {order}">
    <div class= "buttons" >
        <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
        <button class="down"  on:click={moveBlock({block_id}, false)} >Move Down</button>
        <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
    </div>
</div>