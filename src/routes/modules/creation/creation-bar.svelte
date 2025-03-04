<script lang="ts">
    import '../../../styles/module-lnding/contents.css'; // Import styles

</script>

<div class="content-stick">
    <div class="contents ">
        {#each lessons as lesson}
            <Lesson info={lesson}/>
        {/each}
    </div>
</div>