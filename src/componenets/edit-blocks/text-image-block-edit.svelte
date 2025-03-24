<script lang="ts">

    import "../../styles/blocks/text-image-block.css"
    //import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"
    import {onMount} from "svelte";

    interface textImageBlock {
        title: string,
        text: string,
        image: string,
        altText: string

    }

    export let block_id: number;
    export let blockData: textImageBlock[];
    export let order: number;
    export let moveBlock;



    function saveChanges() {
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
    </div>
</div>