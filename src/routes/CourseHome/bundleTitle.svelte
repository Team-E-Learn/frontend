<script lang="ts">
    import "../../styles/home-page/Organisation.css"//import styles
    import Modules from "./moduleSelector.svelte"//imports modules element
    import Header from "../../componenets/header.svelte"
    export let bundle: {
        bundle_name: string;
        id: number;
        modules: { name: string; module_id: number }[];
    }; // pass though bundle info from json

    export let removeBundle;
    export let create: boolean;

    let count: number = 0;
    function newModule() {
        while (bundle.modules.some(item => item.module_id === count)){
            count += 1;
        }
        let newMod = {
            name: "mod1",
            module_id: count,
        }

        bundle.modules = [...bundle.modules, newMod];
    }


</script>

<div class="organisation bundle">
    {#if create}
        <button class="remove-bundle" onclick={removeBundle(bundle.id)}>Remove bundle</button>
    {/if}
    <Header title={bundle.bundle_name}/>
    <!-- Render bundle modules -->
    {#if bundle.modules !== undefined}
        <Modules mod={{ modules: bundle.modules }} create={create}/>
    {/if}
    {#if create}
        <button class="add-mod" onclick={newModule}>New module</button>
    {/if}
</div>