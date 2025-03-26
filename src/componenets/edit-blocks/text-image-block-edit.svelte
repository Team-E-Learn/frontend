<script lang="ts">

    import "../../styles/blocks/text-image-block.css"

    interface textImageBlock {
        title: string,
        text: string,
        image: string,
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


    function saveChanges() {
        // gets the data from the inputs and puts them into the format of the interface
        let title = (document.getElementById("text-image-block")?.querySelector(".title") as HTMLInputElement)?.value ?? "";
        let body = (document.getElementById("text-image-block")?.querySelector(".body") as HTMLTextAreaElement)?.value ?? "";
        let image = (document.getElementById("text-image-block")?.querySelector("[name='image']") as HTMLInputElement)?.value ?? "";
        let altText = (document.getElementById("text-image-block")?.querySelector(".altText") as HTMLInputElement)?.value ?? "";

        let data: textImageBlock = {
            title: title,
            text: body,
            image: image,
            altText: altText
        }
    }

</script>

<div class = "text-image-block" style="--blockOrder: {order}">
    <input type="text" name="title" class="title" placeholder="Enter Title here" value={blockData[0]["title"]}>
    <textarea class="body" name="body" placeholder="Enter Body text here">{blockData[0]["text"]}</textarea>
    <input type="text" name="image" placeholder="input image link" value={blockData[0]["image"]}>
    <input type="text" class="altText" name="altText" placeholder="input alt text" value={blockData[0]["altText"]}>
    <input type="submit" class="button" value="Save Changes" on:click={saveChanges}>

    <div class="buttons">
        <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
        <button class="down"  on:click={moveBlock({block_id}, false)} >Move Down</button>
        <button class="delete" on:click={deleteBlock({block_id})}>Delete</button>
    </div>
</div>