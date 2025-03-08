<script lang="ts">
    import "../../styles/module-landing/block-system.css" // import styles
    import { onMount } from "svelte";

    export let lesson_id: number; // pass in lesson id

    interface Blocks {
        block_type: number;
        block_id: number;
        order: number;
        data: any[];
    }//create block json

    // Initialize as an empty array
    let blockData: Blocks[] = [];
    let count: number = 0;

    onMount(() => {
        const colours = ["red", "green", "blue", "pink", "yellow", "orange", "purpe"]
        const elems = document.querySelectorAll(".block-container p");
        elems.forEach(elem => {
            elem.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
        })

        let text1 = document.querySelector(".text1")
        if (!text1) return;

        text1.addEventListener("click", (event: Event) => {
            //TODO: change data from temporary data
            const newBlock: Blocks = {
                block_type: 1,
                block_id: count += 1,
                order: count,
                data: [{text: "temporary text"}],
            }

            blockData = [...blockData, newBlock];
        });
    });

</script>

<div id="blocks-{lesson_id}" class="block-container"> <!-- flex box that stores the blocks -->
    {#each blockData as block} <!-- running through the block json -->
        <p>{block.block_id}</p> <!-- temporary data -->
    {/each}
</div>
