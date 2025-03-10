<script lang="ts">

    import "../../styles/block-styles/text-image-block.css"
    import image from "../../assets/Bliss_location,_Sonoma_Valley_in_2006.jpg"

    interface textImageBlock {
        data: {
            title: string
            text: string
            image: string
            altText: string
        }
    }

    export let blockData: textImageBlock;

    let data: textImageBlock = {
        "data": {
            "title": "Lorem Ipsum",
            "text": " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "image": image,
            "altText": "Bliss location, Sonoma Valley in 2006"
        }
    }
</script>

<div class = "text-image-block">
    <h3>{blockData["data"]["title"]}</h3>
    <p>{blockData["data"]["text"]}</p>
    <img src={blockData["data"]["image"]} alt={blockData["data"]["altText"]}>
</div>