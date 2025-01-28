<script lang="ts">
    import "../../styles/homePage.css";//import styles
    import Modules from "./moduleSelector.svelte"//imports modules element
    export let bundle: {
        name: string;
        modules: { name: string; module_id: number }[];
    }; // pass though bundle info from json
</script>

<div class="organisation">
    <h3>{bundle.name}</h3>
    <p></p>

    <!-- Render bundle modules -->
    {#if bundle.modules !== undefined}
        <div class="modules">
            <Modules mod={{ modules: bundle.modules }} />
        </div>
    {/if}
</div>