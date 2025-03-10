<script lang="ts">

    import "../../styles/block-styles/image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"

    interface imageBlock {
        data: {
            image: string,
            "altText": string
        }
    }

    export let blockData: imageBlock;

    let data : imageBlock = {
        "data": {
            "image": image,
            "altText": "Bliss location, Sonoma Valley in 2006"
        }
    }
</script>

<div class="image-block">
    <img src={blockData["data"]["image"]} alt={blockData["data"]["altText"]}>
</div>

