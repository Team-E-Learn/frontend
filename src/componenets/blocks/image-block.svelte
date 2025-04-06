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

    function saveChanges() {
        // gets the data from the inputs and puts them into the format of the interface

        let image = (document.getElementById("image-block")?.querySelector("[name='image']") as HTMLInputElement)?.value ?? "";
        let altText = (document.getElementById("image-block")?.querySelector("[name='altText']") as HTMLInputElement)?.value ?? "";

        let data: imageBlock = {
            image: image,
            altText: altText
        }
    }

</script>


    {#if editMode}
        <div class="image-block-edit" style="--blockOrder: {order}">
            <input type="text" class="image" name="image" placeholder="input image link" value={blockData[0]["image"]}>
            <input type="text" class="altText" name="altText" placeholder="input alt text" value={blockData[0]["altText"]}>
            <input type="submit" class="submit" value="Save Changes" on:click={saveChanges}>
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


