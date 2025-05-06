<script lang="ts">
    import "../../styles/module-landing/block-system.css" // import styles
    import { onMount } from "svelte";
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg";
    import "../../styles/block-system.css";
    import DownloadBlock from "../../componenets/blocks/download-block.svelte";
    import QuizBlock from "../../componenets/blocks/quiz-block.svelte";
    import TextBlock from "../../componenets/blocks/text-block.svelte";
    import TextImageBlock from "../../componenets/blocks/text-image-block.svelte";
    import ImageBlock from "../../componenets/blocks/image-block.svelte";
    import lessonService from "../../services/lessonService";

    export let lesson_id: number; // pass in lesson id
    export let create: boolean

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
    //TODO: get this data from the database
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
        }
    ];

    function getDefaultBlockData(type: number): any[] {
        switch(type) {
            case 1: return [{ title: "New Title", text: "Edit this text..." }];
            case 2: return [{ image: "", altText: "" }];
            case 3: return [{ title: "", text: "", image: "", altText: "" }];
            case 4: return [{ downloadLink: "", fileName: "file.txt" }];
            case 5: return [{ question: "", options: [], answer: "" }];
            default: return [];
        }
    }

    export let moveBlock = (block_id: any, up: boolean) => {
        let direction = up ? -1: 1
        let currentBlock = blockData.find(block => block.block_id === block_id['block_id']);

        if (!currentBlock || (currentBlock.order === 1 && up) || (currentBlock.order === blockData.length && !up)) return;

        let targetBlock = blockData.find(block => block.order === currentBlock.order + direction);

        if (targetBlock) {
            blockData = blockData.map(block => {
                if (block.block_id === currentBlock.block_id) {
                    return { ...block, order: block.order + direction };
                } else if (block.block_id === targetBlock.block_id) {
                    return { ...block, order: block.order - direction };
                } else {
                    return block;
                }
            });
        }
    }

    export let deleteBlock = (block_id: any) => {
        let indexToRemove: number = blockData.findIndex(block => block.block_id === block_id['block_id']);
        blockData = [...blockData.slice(0, indexToRemove), ...blockData.slice(indexToRemove + 1)];
        // corrects the order of the blocks below the deleted block
        for (let i = indexToRemove; i < blockData.length; i++) {
            blockData[i].order -= 1;
        }
    }

    function addBlock(blockType: number, blocks: any){
        // Checks it is adding block to loaded lesson
        let parent = blocks.parentElement;
        let loaded = document.getElementById("loaded-lesson")
        if(loaded !== parent) {
            return;
        }

        // gets the next highest count and order and adds new block
        let count = Math.max(0, ...blockData.map(b => b.block_id)) + 1;
        let order = Math.max(0, ...blockData.map(b => b.order)) + 1;
        const newBlock: Blocks = {
            block_type: blockType,
            block_id: count,
            order: order,
            data: getDefaultBlockData(blockType),
        }
        blockData = [...blockData, newBlock];
    }

    onMount(() => {
        console.log(lesson_id)
        let text = document.querySelector(".text-block-button")
        let image = document.querySelector(".image-block-button")
        let textImage = document.querySelector(".text-image-block-button")
        let download = document.querySelector(".download-block-button")
        let quiz = document.querySelector(".quiz-block-button")
        let blocks =  document.getElementById(`blocks-${lesson_id}`);

        text?.addEventListener("click", (event: Event) => {
            addBlock(1, blocks);
        });
        image?.addEventListener("click", (event: Event) => {
            addBlock(2, blocks);
        });
        textImage?.addEventListener("click", (event: Event) => {
            addBlock(3, blocks);
        });
        download?.addEventListener("click", (event: Event) => {
            addBlock(4, blocks);
        });
        quiz?.addEventListener("click", (event: Event) => {
            addBlock(5, blocks);
        });
    });

</script>

<div id="blocks-{lesson_id}" class="block-container"> <!-- flex box that stores the blocks -->
    {#each blockData.slice().sort((a, b) => a.order - b.order) as block} <!-- running through the block json -->
        {#if block.block_type === 1}
            <TextBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={create}/>
        {:else if block.block_type === 2}
            <ImageBlock block_id={block.block_id} order={block.order} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={create}/>
        {:else if block.block_type === 3}
            <TextImageBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={create}/>
        {:else if block.block_type === 4}
            <DownloadBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={create}/>
        {:else if block.block_type === 5}
            <QuizBlock order={block.order} block_id={block.block_id} blockData={block.data} deleteBlock={deleteBlock} moveBlock={moveBlock} name={block.name} editMode={create}/>
        {/if}
    {/each}
</div>
