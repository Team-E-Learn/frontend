<script lang="ts">
    import "../../../styles/module-lnding/block-system.css" // import styles
    import { onMount } from "svelte";

    export let lesson_id: number; // pass in lesson id

    let blockData = [
        {
            "block_type": "1",
            "block_id": "2038473",
            "order": "1",
            "data":[
                {
                    "question_content":"what is the colour of the sky?",
                    "question_answer":"blue"
                },
                {
                    "question_content":"why is the sea blue",
                    "question_answer":"reflections from the sky"
                }
            ]
        },
        {
            "block_type": "2",
            "block_id": "03848293",
            "order": "2",
            "data":"iahehfgwi"
        },
        {
            "block_type": "3",
            "block_id": "185454",
            "order": "3",
            "data": "(link to download)"
        }
    ] // temporary json : replace with api call
    onMount(() => {
      const colours = ["red", "green", "blue", "pink", "yellow", "orange", "purpe"]
      const elems = document.querySelectorAll(".block-container p");
      elems.forEach(elem => {
        elem.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
      })
    });
</script>

<div id="blocks-{lesson_id}" class="block-container"> <!-- flex box that stores the blocks -->
    {#each blockData as block} <!-- running through the block json -->
        <p>{block.block_id}</p> <!-- temporary data -->
    {/each}
    <p>{lesson_id}</p> <!-- temporary data -->
</div>
