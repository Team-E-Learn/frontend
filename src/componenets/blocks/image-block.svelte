<script lang="ts">

    import "../../styles/block-styles/image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"

    let data = [{
        "data": {
            "image": image,
            "alt-text": "Bliss location, Sonoma Valley in 2006"
        }
    }]
</script>

<div class="image-block">
    <img src={data[0]["data"]["image"]} alt={data[0]["data"]["alt-text"]}>
</div>

