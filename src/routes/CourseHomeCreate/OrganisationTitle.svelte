<script lang="ts">
    import "../../styles/home-page/Organisation.css"; //import styles
    import Modules from "./moduleSelector.svelte" //imports modules element
    import Bundles from "./bundleTitle.svelte" //imports bundle element
    import Header from "../../componenets/header.svelte"
    export let org: {
        org_name: string;
        org_id: number;
        bundles: { name: string; id: number; modules: { name: string; module_id: number }[] }[];
        modules: { name: string; module_id: number }[];
    }; // pass through organisation details from json
    export let removeOrg;


    let countMod: number = 0
    function newModule() {
        let newMod = {
            name: "mod1",
            module_id: countMod + 1,
        }

        org.modules = [...org.modules, newMod];
    }
    function removeModule(id){
        org.modules = org.modules.filter(module => module.module_id !== id);
    }

    let countBundle: number = 0;
    function newBundle() {
        let newBundle = {
            name: "bundle",
            id: countBundle + 1,
            modules: []
        }

        org.bundles = [...org.bundles, newBundle];
    }
    function removeBundle(id){
        org.bundles = org.bundles.filter(bundle => bundle.id !== id);
    }

</script>

<div class="organisation">
    <Header title={org.org_name}/>
    <button class="remove-org" onclick={removeOrg(org.org_id)}>Remove organisation</button>
    <!-- Render standalone modules -->
    <button class="add-org" onclick={newModule}>New org module</button>
    {#if org.modules}
        <Modules mod={{ modules: org.modules }} removeModule={removeModule} />
    {/if}

    <!-- Use an {#each} loop to render bundles components -->
    <button class="add-org" onclick={newBundle}>New bundle</button>
    {#if org.bundles !== undefined}
        {#each org.bundles as bundle}
            <Bundles bundle={bundle} removeBundle={removeBundle} />
        {/each}
    {/if}
</div>