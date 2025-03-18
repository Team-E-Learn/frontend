<script lang="ts">

    import "../../styles/blocks/download-block.css"

    interface downloadBlock {
        downloadLink: string,
        fileName: string
    }

    export let blockData: downloadBlock[];
    export let block_id: number;
    export let order: number;
    export let moveBlock;

    function saveChanges() {
        let downloadLink = (document.getElementById("download-block")?.querySelector("[name='file']") as HTMLInputElement)?.value ?? "";
        let altText = (document.getElementById("download-block")?.querySelector("[name='altText']") as HTMLInputElement)?.value ?? "";

        let data: downloadBlock = {
            downloadLink: downloadLink,
            fileName: altText
        }
    }

</script>

<div class="download-block" style="--blockOrder: {order}">
    <input type="text" name="file" alt="input file link" value={blockData[0]["downloadLink"]}>
    <input type="text" class="altText" name="altText" value={blockData[0]["fileName"]}>
    <input type="submit" class="button" value="Save Changes" on:click={saveChanges}>

    <div class="buttons">
        <button class="up" on:click={moveBlock({block_id}, true)}>Move Up</button>
        <button class="down"  on:click={moveBlock({block_id}, true)} >Move Down</button>
    </div>
</div>