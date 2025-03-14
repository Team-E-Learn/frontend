<script lang="ts">

    import "../../styles/blocks/text-image-block.css"
    //import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"
    import {onMount} from "svelte";

    interface textImageBlock {
        data: {
            title: string
            text: string
            image: string
            altText: string
        }
    }

    export let blockData: textImageBlock;

    onMount(() => {

        let title = document.getElementById("text-image-block")?.querySelector("title");
        let body = document.getElementById("text-image-block")?.querySelectorAll("body");
        let image = document.getElementById("text-image-block")?.querySelector("image");

    });





</script>

<div class = "text-image-block">
    <!--
    <h3>{blockData["data"]["title"]}</h3>
    <p>{blockData["data"]["text"]}</p>
    <img src={blockData["data"]["image"]} alt={blockData["data"]["altText"]}>
    -->

    <input type="text" class="title" placeholder="Enter Title here">
    <input type="text" class="text" placeholder="Enter Body text here">
    <input type="file" name="image" accept="image/*" alt="input image">
    <input type="submit" class="button" value="Save Changes">
    <div class="buttons">
        <button class="up">Move Up</button>
        <button class="down">Move Down</button>
    </div>
</div>