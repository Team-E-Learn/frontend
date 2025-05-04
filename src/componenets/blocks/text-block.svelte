<script lang="ts">

    import "../../styles/blocks/text-block.css"

    interface textBlock {
        title: string
        text: string
    }

    // takes the block data as a parameter using the above interface as the data type
    // parameters this block takes
    export let block_id: number;
    // the current order of the block, this is as a variable in the styles for the block
    export let order: number;
    export let blockData: textBlock[];
    // functions for moving and deleting the block
    export let moveBlock: any;
    export let deleteBlock: any;
    export let editMode: boolean;
    export let submitChanges: any;
    export let name: string;

    let id: string = block_id.toString()

    // Initialize local variables with block data
    let title: string = blockData[0]?.title ?? "";
    let body: string = blockData[0]?.text ?? "";

    function saveChanges() {
        let data: textBlock = {
            title: title,
            text: body
        }
        submitChanges(block_id, data);
    }

</script>

<div class="text-block" style="--blockOrder: {order}">
    {#if editMode}
        <input type="text" class="title" name="title" bind:value={title} placeholder="Enter Title here">
        <textarea class="body" name="body" bind:value={title} placeholder="Enter Title here">{blockData[0]["text"]}</textarea>
        <input type="submit" class="submit" value="Save Changes" on:click={saveChanges}>
        <div class="buttons">
            <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
            <button class="down"  on:click={moveBlock({block_id}, false)} >Move Down</button>
            <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
        </div>
    {:else}
        <h3>{blockData[0]["title"]}</h3>
        <p>{blockData[0]["text"]}</p>
    {/if}
</div>