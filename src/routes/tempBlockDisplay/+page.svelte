<script lang="ts">
    import "../../styles/block-system.css";
    import DownloadBlock from "../../componenets/blocks/download-block.svelte";
    import QuizBlock from "../../componenets/blocks/quiz-block.svelte";
    import TextBlock from "../../componenets/blocks/text-block.svelte";
    import TextImageBlock from "../../componenets/blocks/text-image-block.svelte";
    import ImageBlock from "../../componenets/blocks/image-block.svelte";
</script>

<div class = "block-container">
    <TextBlock />
    <ImageBlock />
    <TextImageBlock />
    <DownloadBlock />
    <QuizBlock />
</div>

