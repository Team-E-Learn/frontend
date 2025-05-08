<script lang="ts">

    import "../../styles/blocks/text-image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"


    interface textImageBlock {
        title: string
        text: string
        image: string
        altText: string
    }

    // parameters this block takes
    export let block_id: number;
    export let blockData: textImageBlock[];
    // the current order of the block, this is as a variable in the styles for the block
    export let order: number;
    // functions for moving and deleting the block
    export let moveBlock: any;
    export let deleteBlock: any;
    export let submitChanges: any;
    export let editMode: boolean;
    export let name: string;

    let id: string = block_id.toString()

    // Initialize local variables with block data
    let title: string = blockData[0]?.title ?? "";
    let body: string = blockData[0]?.text ?? "";
    let imageLink: string = blockData[0]?.image ?? "";
    let altText: string = blockData[0]?.altText ?? "";

</script>

<div class = "text-image-block" style="--blockOrder: {order}">
    {#if editMode}
        <input type="text" name="title" bind:value={title} class="title" placeholder="Enter Title here">
        <textarea class="body" name="body" bind:value={body} placeholder="Enter Body text here">{blockData[0]["text"]}</textarea>
        <input type="text" name="image" bind:value={imageLink} class="image" placeholder="input image link">
        <input type="text" class="altText" bind:value={altText} name="altText" placeholder="input alt text">
        <div class="buttons">
            <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
            <button class="down"  on:click={moveBlock({block_id}, false)} >Move Down</button>
            <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
        </div>
    {:else}
    <h3>{blockData[0]["title"]}</h3>
    <p>{blockData[0]["text"]}</p>
    <img src={blockData[0]["image"]} alt={blockData[0]["altText"]}>
    {/if}
</div>