<script lang="ts">
    import "../../styles/home-page/modules.css"//import styles
    export let mod: {
        modules: { name: string; module_id: number }[];
    };//pass through modules data from json
</script>

<!-- Render modules -->
{#if mod.modules !== undefined}
    <div class="modules">
        {#each mod.modules as mods}
            <a class="mod-buttons" href="/modules/{mods.module_id}">{mods.name}</a>
        {/each}
    </div>
{/if}