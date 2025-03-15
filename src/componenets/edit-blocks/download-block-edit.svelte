<script lang="ts">

    import "../../styles/blocks/download-block.css"

    interface downloadBlock {
        data: {
            downloadLink: string,
            fileName: string
        }
    }

    export let blockData: downloadBlock[];

</script>

<div class="download-block">
    <!--
    <a href={blockData["data"]["downloadLink"]}>{blockData["data"]["fileName"]}</a>
    -->
    <input type="file" name="file" alt="input file">
    <input type="submit" class="button" value="Save Changes">
    <div class="buttons">
        <button class="up">Move Up</button>
        <button class="down">Move Down</button>
    </div>
</div>