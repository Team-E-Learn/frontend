<script lang="ts">
    import "../../styles/home-page/modules.css"//import styles
    export let mod: {
        modules: { name: string; module_id: number }[];
    };//pass through modules data from json
    export let create: boolean

    function removeModule(id){
        mod.modules = mod.modules.filter(module => module.module_id !== id);
    }
</script>

<!-- Render modules -->
{#if mod.modules !== undefined}
    <div class="modules">
        {#each mod.modules as mods}

            {#if create}
                <a class="mod-buttons" href="/modules/creation{mods.module_id}">{mods.name}</a>
                <button class="remove-mod" onclick={removeModule(mods.module_id)}>Remove module</button>
            {:else }
                <a class="mod-buttons" href="/modules/view{mods.module_id}">{mods.name}</a>
            {/if}
        {/each}
    </div>
{/if}