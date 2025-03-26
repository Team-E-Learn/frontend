<script lang="ts">

    import "../../styles/blocks/download-block.css"


    interface downloadBlock {
        downloadLink: string,
        fileName: string

    }

    // takes the block data as a parameter using the above interface as the data type
    export let blockData: downloadBlock[];

</script>

<div class="download-block">
    <a href={blockData[0]["downloadLink"]}>{blockData[0]["fileName"]}</a>
</div>
