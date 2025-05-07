<script lang="ts">
    import "../../styles/home-page/Organisation.css"; //import styles
    import Modules from "./moduleSelector.svelte" //imports modules element
    import Bundles from "./bundleTitle.svelte" //imports bundle element
    import Header from "../../componenets/header.svelte"
    import {onMount} from "svelte";
    export let org: {
        name: string,
        id: number,
        bundles: {
            bundle_id: number,
            bundle_name: string,
            modules: {
                name: string,
                module_id: number
            }[]
        }[]
        modules: {
            name: string,
            module_id: number
        }[]
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

    onMount(() => {
        console.log(org.name);
    });

</script>

<div class="organisation">
    {#if create}
        <button class="remove-org" onclick={removeOrg(org.id)}>Remove organisation</button>
    {/if}
    <Header title={org.name}/>
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
            <Bundles bundle={bundle} removeBundle={removeBundle} org_name={org.name} create={create}/>
        {/each}
    {/if}
    {#if create}
        <button class="add-bundle" onclick={newBundle}>New bundle</button>
    {/if}
</div>