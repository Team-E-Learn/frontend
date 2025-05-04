<script lang="ts">

    import "../../styles/blocks/image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"

    interface imageBlock {
        image: string,
        altText: string
    }

    // parameters this block takes
    export let blockData: imageBlock[];
    export let block_id: number;
    // the current order of the block, this is as a variable in the styles for the block
    export let order: number;
    // functions for moving and deleting the block
    export let moveBlock;
    export let deleteBlock: any;
    export let editMode: boolean;
    export let submitChanges: any;
    export let name: string;

    let id: string = block_id.toString()

    let imageLink: string = blockData[0]?.image ?? "";
    let altText: string = blockData[0]?.altText ?? "";

    function saveChanges() {

        let data: imageBlock = {
            image: imageLink,
            altText: altText
        }
        submitChanges(block_id, data);
    }

</script>


    {#if editMode}
        <div class="image-block-edit" style="--blockOrder: {order}">
            <input type="text" class="image" name="image" bind:value={imageLink} placeholder="input image link">
            <input type="text" class="altText" name="altText" bind:value={altText} placeholder="input alt text">
            <input type="submit" class="submit" id="{id}" value="Save Changes" on:click={saveChanges}>
            <div class="buttons">
                <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
                <button class="down"  on:click={moveBlock({block_id}, false)}>Move Down</button>
                <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
            </div>
        </div>
    {:else}
    <div class="image-block" style="--blockOrder: {order}">
        <img src={blockData[0]["image"]} alt={blockData[0]["altText"]}>
    </div>
    {/if}


