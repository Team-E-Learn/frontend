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

    function saveChanges() {
        // gets the data from the inputs and puts them into the format of the interface
        let downloadLink = (document.getElementById("download-block")?.querySelector("[name='file']") as HTMLInputElement)?.value ?? "";
        let altText = (document.getElementById("download-block")?.querySelector("[name='altText']") as HTMLInputElement)?.value ?? "";

        let data: downloadBlock = {
            downloadLink: downloadLink,
            fileName: altText
        }
    }
</script>

<div class="download-block" style="--blockOrder: {order}">
    {#if editMode}
        <input type="text" name="file" alt="input file link" value={blockData[0]["downloadLink"]}>
        <input type="text" class="altText" name="altText" value={blockData[0]["fileName"]}>
        <input type="submit" class="button" value="Save Changes" on:click={saveChanges}>

        <div class="buttons">
            <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
            <button class="down"  on:click={moveBlock({block_id}, false)} >Move Down</button>
            <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
        </div>
    {:else}
        <a href={blockData[0]["downloadLink"]}>{blockData[0]["fileName"]}</a>
    {/if}
</div>
