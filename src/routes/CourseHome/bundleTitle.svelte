<script lang="ts">
    import "../../styles/homePage.css";
    import Modules from "./moduleSelector.svelte"
    export let bundle: {
        name: string;
        modules: { name: string; module_id: number }[];
    };
    console.log(bundle)
</script>

<div class="organisation">
    <h3>{bundle.name}</h3>
    <p></p>

    <!-- Render standalone modules -->
    {#if bundle.modules !== undefined}
        <div class="modules">
            <Modules mod={{ modules: bundle.modules }} />
        </div>
    {/if}
</div>