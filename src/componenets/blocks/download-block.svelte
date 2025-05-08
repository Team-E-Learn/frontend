<script lang="ts">

    import "../../styles/blocks/download-block.css"


    interface downloadBlock {
        downloadLink: string,
        fileName: string

    }

    // parameters this block takes
    export let blockData: downloadBlock[];
    export let block_id: number;
    // the current order of the block, this is as a variable in the styles for the block
    export let order: number;
    // functions for moving and deleting the block
    export let moveBlock: any;
    export let deleteBlock: any;
    export let editMode: boolean;
    export let name: string;

    let id: string = block_id.toString()

    let downloadLink: string = blockData[0]?.downloadLink ?? "";
    let fileName: string = blockData[0]?.fileName ?? "";
</script>

<div class="download-block" style="--blockOrder: {order}">
    {#if editMode}
        <input type="text" class="file" name="file" bind:value={downloadLink} placeholder="input file link">
        <input type="text" class="altText" name="altText" bind:value={fileName} placeholder="input filename">

        <div class="buttons">
            <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
            <button class="down"  on:click={moveBlock({block_id}, false)} >Move Down</button>
            <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
        </div>
    {:else}
        <a href={blockData[0]["downloadLink"]}>{blockData[0]["fileName"]}</a>
    {/if}
</div>
