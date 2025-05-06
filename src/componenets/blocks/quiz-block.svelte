<script lang="ts">

    import "../../styles/blocks/quiz-block.css"
    interface quizBlock {
        question: string;
        options: {
            text: string;
            isCorrect: boolean;
        }[];
    }

    function isAnswer(answer: boolean) {
        if (answer == true) {
            alert("correct")
        } else {
            alert("incorrect")
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
    export let editMode: boolean;
    export let name: string;

    // Local initialization of variables for blockData
    let question: string = blockData[0]?.question ?? "";
    let options = blockData[0]?.options.map(o => ({ ...o })) ?? [];

    // Functions for editing
    function addOption(): void {
        options = [...options, { text: "", isCorrect: false }];
    }

    function removeOption(index: number): void {
        options = options.filter((_, i) => i !== index);
    }
</script>

<div class="quiz-block" style="--blockOrder: {order}">
    {#if editMode}
        <input type="text" class="input" bind:value={question} placeholder="Enter question here"/>

        <div class="options-edit">
            {#each options as option, index}
                <div class="option-row">
                    <input type="text" class="input" bind:value={option.text} placeholder="Option text"/>
                    <label>
                        <input type="checkbox" bind:checked={option.isCorrect} />
                        Correct
                    </label>
                    <button on:click={() => removeOption(index)}>Remove</button>
                </div>
            {/each}
            <button on:click={addOption}>Add Option</button>#
        </div>
    {:else}
    <h1>{blockData[0]["question"]}</h1>
    <div class="options">
        {#each Object.values(blockData[0]["options"]) as option}
            <button on:click={() => isAnswer(option.isCorrect)}>{option.text}</button>
        {/each}
    </div>
    {/if}
</div>