<script lang="ts">
    import "../../styles/homePage.css"//import styles
    export let mod: {
        modules: { name: string; module_id: number }[];
    };//pass through module data from json
</script>

<!-- Render modules -->
{#if mod.modules !== undefined}
    <div class="modules">
        {#each mod.modules as mods}
            <a>{mods.name}</a>
        {/each}
    </div>
{/if}