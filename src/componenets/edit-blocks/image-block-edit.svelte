<script lang="ts">

    import "../../styles/blocks/image-block.css"
    import {onMount} from "svelte";
    //import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"

    interface imageBlock {
        data: {
            image: string,
            "altText": string
        }
    }

    export let blockData: imageBlock;

    onMount(() => {
        let image = document.getElementById("image-block")?.querySelector("image");
    });
</script>

<div class="image-block">
    <!--
    <img src={blockData["data"]["image"]} alt={blockData["data"]["altText"]}>
    -->
    <input type="file" name="image" accept="image/*" placeholder="input image">
    <input type="submit" class="button" value="Save Changes">
    <div class="buttons">
        <button class="up">Move Up</button>
        <button class="down">Move Down></button>
    </div>
</div>

