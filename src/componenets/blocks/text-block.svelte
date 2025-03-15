<script lang="ts">

    import "../../styles/blocks/text-block.css"

    interface textBlock {
        title: string
        text: string
    }

    export let blockData: textBlock[];

</script>

<di class="text-block">
    <h3>{blockData[0]["title"]}</h3>
    <p>{blockData[0]["text"]}</p>
</di>