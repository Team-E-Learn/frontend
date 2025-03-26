<script lang="ts">

    import "../../styles/blocks/text-block.css"

    interface textBlock {
        title: string
        text: string
    }

    // takes the block data as a parameter using the above interface as the data type
    export let blockData: textBlock[];

</script>

<div class="text-block">
    <h3>{blockData[0]["title"]}</h3>
    <p>{blockData[0]["text"]}</p>
</div>