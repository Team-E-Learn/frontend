<script lang="ts">
    import "../../../styles/module-landing/block-system.css" // import styles
    import { onMount } from "svelte";
    import image from "../../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg";
    import "../../../styles/block-system.css";
    import DownloadBlock from "../../../componenets/blocks/download-block.svelte";
    import QuizBlock from "../../../componenets/blocks/quiz-block.svelte";
    import TextBlock from "../../../componenets/blocks/text-block.svelte";
    import TextImageBlock from "../../../componenets/blocks/text-image-block.svelte";
    import ImageBlock from "../../../componenets/blocks/image-block.svelte";

    export let lesson_id: number; // pass in lesson id

    interface Blocks {
        block_type: number;
        block_id: number;
        order: number;
        name: string;
        data: any[];
    }//create block json

    // Initialize as an empty array
    /*
    block_type: 1 = text block
    block_type: 2 = image block
    block_type: 3 = text and image block
    block_type: 4 = download block
    block_type: 5 = quiz block
     */
    let blockData: Blocks[] = [];

    let count: number = 0;

    export let moveBlock = (block_id: any, up: boolean) => {
        let direction = up ? -1: 1
        let moveBlock: Blocks = blockData.find(block => block.block_id === block_id['block_id']);
        // Returns out of the function if the block is at the top or bottom
        if (!moveBlock || (moveBlock.order === 1 && up) || (moveBlock.order === blockData.length && !up)) return;
        let otherMoveBlock: Blocks = blockData.find(block => block.order === moveBlock.order + direction);
        if (otherMoveBlock) {
            moveBlock.order += direction;
            otherMoveBlock.order -= direction;
            update()
        }
    }

    export let deleteBlock = (block_id: any) => {
        let indexToRemove: number = blockData.findIndex(block => block.block_id === block_id['block_id']);
        let deletedBlock: Blocks = blockData.splice(indexToRemove, 1)[0];
        // corrects the order of the blocks below the deleted block
        for (let i in blockData) {
            if (blockData[i]['order'] > deletedBlock.order) blockData[i]['order'] -= 1;
        }
        update()
    }

    // this function makes sure the JSON is updated so svelte's reactive states can work properly
    function update() {
        blockData = [...blockData.sort((a, b) => a.order - b.order)];
    }


    onMount(() => {
        let text1 = document.querySelector(".text1")
        let blocks =  document.getElementById(`blocks-${lesson_id}`);

        if (!text1 && !blocks) return;

        text1.addEventListener("click", (event: Event) => {
            //TODO: change data from temporary data
            const newBlock: Blocks = {
                block_type: 1,
                block_id: count += 1,
                order: count,
                data: [{text: "temporary text"}],
            }
            let parent = blocks.parentElement;
            let loaded = document.getElementById("loaded-lesson")
            if(loaded === parent) {
                blockData = [...blockData, newBlock];
            }
        });
    });

</script>

<div id="blocks-{lesson_id}" class="block-container" data-block-data={JSON.stringify(blockData)}> <!-- flex box that stores the blocks -->
    {#each blockData as block} <!-- running through the block json -->
        {#if block.block_type === 1}
            <TextBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={true}/>
        {:else if block.block_type === 2}
            <ImageBlock block_id={block.block_id} order={block.order} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={true}/>
        {:else if block.block_type === 3}
            <TextImageBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={true}/>
        {:else if block.block_type === 4}
            <DownloadBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={true}/>
        {:else if block.block_type === 5}
            <QuizBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={true}/>
        {/if}
    {/each}
</div>
