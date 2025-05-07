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
    export let postOrg;
    export let create: boolean;

    let activeOrg: boolean = false;

    function newModule() {
        const mod_textbox = document.getElementById("add_mod_text");
        mod_textbox.classList.remove("hidden");
        const child_mod = mod_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;
        child_mod?.focus();
        activeOrg = true;
    }

    function newBundle() {
        const bundle_textbox = document.getElementById("add_bundle_text");
        bundle_textbox.classList.remove("hidden");
        const child_bundle = bundle_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;
        child_bundle?.focus();
        activeOrg = true;
    }

    function removeBundle(id){
        org.bundles = org.bundles.filter(bundle => bundle.id !== id);
    }

    onMount(() => {
        const orgWithoutIds = {
            name: org.name,
            bundles: org.bundles.map(bundle => ({
                bundle_name: bundle.bundle_name,
                modules: bundle.modules.map(module => ({
                    name: module.name
                }))
            })),
            modules: org.modules.map(module => ({
                name: module.name
            }))
        };

        const bundle_textbox = document.getElementById("add_bundle_text");
        const child_bundle = bundle_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;

        const mod_textbox = document.getElementById("add_mod_text");
        const child_mod = mod_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;

        // check if enter is pressed
        document.addEventListener("keydown", async (event) => {
            if (event.key === "Escape") {
                mod_textbox.classList.add("hidden");
                bundle_textbox.classList.add("hidden");
            }

            // If the enter text element is on screen
            if (event.key === "Enter") {
                if (!mod_textbox.classList.contains("hidden") && activeOrg) {
                    activeOrg = false;
                    let input_name = child_mod.value;
                    let newData = await postOrg(org.name, orgWithoutIds.bundles, [...orgWithoutIds.modules, {name: input_name}])
                    org.modules = newData.modules;
                    child_mod.value = "";
                    // Add the new lesson to the array
                    mod_textbox.classList.add("hidden");
                }
                if (!bundle_textbox.classList.contains("hidden") && activeOrg) {
                    activeOrg = false;
                    let input_name = child_bundle.value;
                    let newData = await postOrg(org.name, [...orgWithoutIds.bundles, {
                        bundle_name: input_name,
                        modules: []
                    }], orgWithoutIds.modules)
                    org.bundles = newData.bundles;
                    child_bundle.value = "";
                    // Add the new lesson to the array
                    bundle_textbox.classList.add("hidden");
                }
            }
        });
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