<script lang="ts">
    import "../../styles/home-page/Organisation.css"; //import styles
    import Modules from "./moduleSelector.svelte" //imports modules element
    import Bundles from "./bundleTitle.svelte" //imports bundle element
    import Header from "../../componenets/header.svelte"
    export let org: {
        org_name: string;
        org_id: number;
        bundles: { bundle_name: string; id: number; modules: { name: string; module_id: number }[] }[];
        modules: { name: string; module_id: number }[];
    }; // pass through organisation details from json
    export let removeOrg;

    export let create: boolean;

    function newModule() {

    }

    function newBundle() {

    }

    function removeBundle(id){
        org.bundles = org.bundles.filter(bundle => bundle.id !== id);
    }

</script>

<div class="organisation">
    {#if create}
        <button class="remove-org" onclick={removeOrg(org.org_id)}>Remove organisation</button>
    {/if}
    <Header title={org.org_name}/>
    <!-- Render standalone modules -->
    {#if org.modules}
        <Modules mod={{ modules: org.modules }} create={create}/>
    {/if}
    {#if create}
        <button class="add-mod" onclick={newModule}>New org module</button>
    {/if}
    <!-- Use an {#each} loop to render bundles components -->
    {#if org.bundles !== undefined}
        {#each org.bundles as bundle}
            <Bundles bundle={bundle} removeBundle={removeBundle} org_name={org.org_name} create={create}/>
        {/each}
    {/if}
    {#if create}
        <button class="add-bundle" onclick={newBundle}>New bundle</button>
    {/if}
</div>