<script lang="ts">

    import "../../styles/blocks/text-image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"


    interface textImageBlock {
        title: string
        text: string
        image: string
        altText: string
    }

    // takes the block data as a parameter using the above interface as the data type
    export let blockData: textImageBlock[];
</script>

<div class = "text-image-block">
    <h3>{blockData[0]["title"]}</h3>
    <p>{blockData[0]["text"]}</p>
    <img src={blockData[0]["image"]} alt={blockData[0]["altText"]}>
</div>