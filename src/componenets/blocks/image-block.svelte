<script lang="ts">

    import "../../styles/blocks/image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"

    interface imageBlock {
        image: string,
        "alt-text": string
    }

    // takes the block data as a parameter using the above interface as the data type
    export let blockData: imageBlock[];

</script>

<div class="image-block">
    <img src={blockData[0]["image"]} alt={blockData[0]["alt-text"]}>
</div>

