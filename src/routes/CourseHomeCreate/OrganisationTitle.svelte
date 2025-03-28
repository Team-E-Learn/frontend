<script lang="ts">
    import "../../styles/home-page/Organisation.css"; //import styles
    import Modules from "./moduleSelector.svelte" //imports modules element
    import Bundles from "./bundleTitle.svelte" //imports bundle element
    import Header from "../../componenets/header.svelte"
    export let org: {
        org_name: string;
        org_id: number;
        bundles: { name: string; modules: { name: string; module_id: number }[] }[];
        modules: { name: string; module_id: number }[];
    }; // pass through organisation details from json

    export let

    function newModule() {
        let newMod = {
            name: "mod1",
            module_id: 1,
        }

        org.modules = [...org.modules, newMod];
    }

    function newBundle() {
        let newBundle = {
            name: "bundle",
            modules: []
        }

        org.bundles = [...org.bundles, newBundle];
    }
</script>

<div class="organisation">
    <Header title={org.org_name}/>
    <!-- Render standalone modules -->
    <button class="add-org" onclick={newModule}>New org module</button>
    <button class="remove-org" onclick={newModule}>Remove org module</button>
    {#if org.modules}
        <Modules mod={{ modules: org.modules }} />
    {/if}

    <!-- Use an {#each} loop to render bundles components -->
    <button class="add-org" onclick={newBundle}>New bundle</button>
    <button class="remove-org" onclick={newBundle}>Remove bundle</button>
    {#if org.bundles !== undefined}
        {#each org.bundles as bundle}
            <Bundles bundle={bundle} />
        {/each}
    {/if}
</div>