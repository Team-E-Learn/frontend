<script lang="ts">

    import "../../styles/blocks/download-block.css"

    interface downloadBlock {
        data: {
            downloadLink: string,
            fileName: string
        }
    }

    //export let blockData: downloadBlock;

    let data : downloadBlock = {
        "data": {
            "downloadLink": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsillycattvseries.fandom.com%2Fwiki%2FBig_Poo&psig=AOvVaw2p48Vdi8o33dYzsITLi7Xa&ust=1740067636205000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOD-uq-P0IsDFQAAAAAdAAAAABAE",
            "fileName": "document.docx"
        }
    }

</script>

<div class="download-block">
    <a href={blockData["data"]["downloadLink"]}>{blockData["data"]["fileName"]}</a>
</div>