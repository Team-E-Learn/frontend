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
    import Lesson from "./lessons.svelte";
    import moduleService from "../../services/moduleService";

    export let module_id: number;
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
    let blockData: Blocks[] = [];

    async function getBlocks(){
        try {
            const data = await lessonService.getLessonsBlocks(module_id, lesson_id);
            blockData = data.lessons;
        } catch (err) {
            error = 'Failed to fetch lessons';
            console.error(err);
        }
    }

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

    export let deleteBlock = async (block_id: any) => {
        let indexToRemove: number = blockData.findIndex(block => block.block_id === block_id['block_id']);
        blockData = [...blockData.slice(0, indexToRemove), ...blockData.slice(indexToRemove + 1)];
        lessonService.deleteLessonBlock(module_id, lesson_id, block_id)
            .then(() => {
                console.log('Lesson deleted!');
            })
            .catch(err => {
                console.error('Error deleting lesson:', err);
            });

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

        getBlocks();

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
