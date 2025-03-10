<script lang="ts">

    import "../../styles/block-styles/image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"

    interface imageBlock {
        image: string,
        "alt-text": string
    }

    export let blockData: imageBlock[];

    let data : imageBlock = {
            "image": image,
            "alt-text": "Bliss location, Sonoma Valley in 2006"
    }
</script>

<div class="image-block">
    <img src={blockData[0]["image"]} alt={blockData[0]["alt-text"]}>
</div>

