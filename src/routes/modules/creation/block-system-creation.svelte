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
    let blockData: Blocks[] = [
        {
            block_type: 1,
            block_id: 1,
            order: 1,
            name: "text block",
            data: [{
                title: "Lorem Ipsum",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }],
        },
        {
            block_type: 2,
            block_id: 2,
            order: 2,
            name: "image block",
            data: [{
                image: image,
                altText: "Bliss location, Sonoma Valley in 2006"
            }],
        },
        {
            block_type: 3,
            block_id: 3,
            order: 3,
            name: "text and image block",
            data: [{
                title: "Lorem Ipsum",
                text: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                image: image,
                altText: "Bliss location, Sonoma Valley in 2006"
            }],
        },
        {
            block_type: 4,
            block_id: 4,
            order: 4,
            name: "download block",
            data: [{
                downloadLink: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsillycattvseries.fandom.com%2Fwiki%2FBig_Poo&psig=AOvVaw2p48Vdi8o33dYzsITLi7Xa&ust=1740067636205000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOD-uq-P0IsDFQAAAAAdAAAAABAE",
                fileName: "document.docx"
            }],
        },
        {
            block_type: 5,
            block_id: 5,
            order: 5,
            name: "quiz block",
            data: [{
                question: "press option A",
                options : {
                    A: {
                        text: "Option A",
                        isCorrect: true
                    },
                    B: {
                        text: "Option B",
                        isCorrect: false
                    },
                    C: {
                        text: "Option C",
                        isCorrect: false
                    },
                    D: {
                        text: "Option D",
                        isCorrect: false
                    },
                }
            }],
        }
    ];

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

<div id="blocks-{lesson_id}" class="block-container"> <!-- flex box that stores the blocks -->
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
