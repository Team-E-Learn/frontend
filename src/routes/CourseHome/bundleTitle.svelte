<script lang="ts">
    import "../../styles/home-page/Organisation.css"//import styles
    import Modules from "./moduleSelector.svelte"//imports modules element
    import Header from "../../componenets/header.svelte"
    export let bundle: {
        name: string;
        modules: { name: string; module_id: number }[];
    }; // pass though bundle info from json
</script>

<div class="organisation bundle">
    <Header title={bundle.name}/>

    <!-- Render bundle modules -->
    {#if bundle.modules !== undefined}
        <Modules mod={{ modules: bundle.modules }} />
    {/if}
</div>