<script lang="ts">
    import "../../styles/homePage.css"
    export let mod: {
        modules: { name: string; module_id: number }[];
    };
    console.log(typeof mod.modules)
</script>

{#if mod.modules !== undefined}
    <div class="modules">
        {#each mod.modules as mods}
            <a>{mods.name}</a>
        {/each}
    </div>
{/if}