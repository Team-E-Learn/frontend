<script lang="ts">
    import "../../styles/home-page/Organisation.css"//import styles
    import Modules from "./moduleSelector.svelte"//imports modules element
    import Header from "../../componenets/header.svelte"
    import {onMount} from "svelte";
    export let bundle: {
        bundle_name: string;
        id: number;
        modules: { name: string; module_id: number }[];
    }; // pass though bundle info from json
    export let org;
    export let postOrg;
    export let removeBundle;
    export let create: boolean;

    let activeOrg: boolean = false;

    function newModule() {
        const mod_textbox = document.getElementById("add_mod_text");
        mod_textbox.classList.remove("hidden");
        const child_mod = mod_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;
        child_mod?.focus();
        activeOrg = true;
    }

    onMount(() => {
        const orgWithoutIds = {
            name: org.name,
            bundles: org.bundles
                .filter(bund => bund !== bundle)
                .map(bundle => ({
                    bundle_name: bundle.bundle_name,
                    modules: bundle.modules.map(module => ({
                        name: module.name
                    }))
                })),
            modules: org.modules.map(module => ({
                name: module.name
            }))
        };

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
                    let input_bundle = {
                        bundle_name: bundle.bundle_name,
                        modules: bundle.modules.map(module => ({
                            name: module.name
                        }))
                    }
                    input_bundle.modules = [...input_bundle.modules, {"name": input_name}]
                    let newData = await postOrg(org.name, [...orgWithoutIds.bundles, input_bundle], orgWithoutIds.modules)
                    bundle = newData.bundles.find(b => b.bundle_name === bundle.bundle_name);
                    child_mod.value = "";
                    // Add the new lesson to the array
                    mod_textbox.classList.add("hidden");
                }
            }
        })
    });
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