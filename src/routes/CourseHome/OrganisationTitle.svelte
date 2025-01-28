<script lang="ts">
    import "../../styles/homePage.css"; //import styles
    import Modules from "./moduleSelector.svelte" //imports modules element
    import Bundles from "./bundleTitle.svelte" //imports bundle element
    export let org: {
        org_name: string;
        org_id: number;
        bundles: { name: string; modules: { name: string; module_id: number }[] }[];
        modules: { name: string; module_id: number }[];
    }; // pass through organisation details from json
</script>

<div class="organisation">
    <h2>{org.org_name}</h2>
    <p></p>

    <!-- Render standalone modules -->
    {#if org.modules}
        <div class="modules">
            <Modules mod={{ modules: org.modules }} />
        </div>
    {/if}

    <!-- Use an {#each} loop to render bundles components -->
    {#if org.bundles !== undefined}
        <div class="bundles">
            {#each org.bundles as bundle}
                <Bundles bundle={bundle} />
            {/each}
        </div>
    {/if}
</div>