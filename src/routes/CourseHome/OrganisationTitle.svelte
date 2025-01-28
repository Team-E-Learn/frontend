<script lang="ts">
    import "../../styles/homePage.css";
    import Modules from "./moduleSelector.svelte"
    import Bundles from "./bundleTitle.svelte"
    export let org: {
        org_name: string;
        org_id: number;
        bundles: { name: string; modules: { name: string; module_id: number }[] }[];
        modules: { name: string; module_id: number }[];
    };
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

    <!-- Render bundles -->
    {#if org.bundles !== undefined}
        <div class="bundles">
            {#each org.bundles as bundle}
                <Bundles bundle={bundle} />
            {/each}
        </div>
    {/if}
</div>