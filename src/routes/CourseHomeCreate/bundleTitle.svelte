<script lang="ts">
    import "../../styles/home-page/Organisation.css"//import styles
    import Modules from "./moduleSelector.svelte"//imports modules element
    import Header from "../../componenets/header.svelte"
    export let bundle: {
        name: string;
        id: number;
        modules: { name: string; module_id: number }[];
    }; // pass though bundle info from json

    export let removeBundle;

    let count: number = 0;
    function newModule() {
        let newMod = {
            name: "mod1",
            module_id: count += 1,
        }

        bundle.modules = [...bundle.modules, newMod];
    }
    function removeModule(id){
        bundle.modules = bundle.modules.filter(module => module.module_id !== id);
    }

</script>

<div class="organisation bundle">
    <Header title={bundle.name}/>
    <button class="remove-org" onclick={removeBundle(bundle.id)}>Remove bundle</button>
    <button class="add-org" onclick={newModule}>New module</button>

    <!-- Render bundle modules -->
    {#if bundle.modules !== undefined}
        <Modules mod={{ modules: bundle.modules }} removeModule={removeModule} />
    {/if}
</div>