<script lang="ts">

    import "../../styles/blocks/image-block.css"
    import {onMount} from "svelte";

    interface imageBlock {
        image: string,
        "altText": string
    }

    export let blockData: imageBlock[];
    export let block_id: number;
    export let order: number;
    export let moveBlock;
    export let deleteBlock: any;

    function saveChanges() {
        let image = (document.getElementById("image-block")?.querySelector("[name='image']") as HTMLInputElement)?.value ?? "";
        let altText = (document.getElementById("image-block")?.querySelector("[name='altText']") as HTMLInputElement)?.value ?? "";

        let data: imageBlock = {
            image: image,
            altText: altText
        }
    }

</script>

<div class="image-block" style="--blockOrder: {order}">
    <input type="text" name="image" placeholder="input image link" value={blockData[0]["image"]}>
    <input type="text" class="altText" name="altText" placeholder="input alt text" value={blockData[0]["altText"]}>
    <input type="submit" class="button" value="Save Changes">
    <div class="buttons">
        <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
        <button class="down"  on:click={moveBlock({block_id}, false)}>Move Down</button>
        <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
    </div>
</div>

