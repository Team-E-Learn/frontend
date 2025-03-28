<script lang="ts">
    import "../../styles/home-page/course.css" //import styles
    import Organisation from "./OrganisationTitle.svelte"
    import {onMount} from "svelte"; // organisations element

    interface Org {
        org_name: string,
        org_id: number,
        bundles: {
            name: string,
            modules: {
                name: string,
                module_id: number
            }[]
        }[]
        modules: {
            name: string,
            module_id: number
        }[]
    }

    let courseInfo: Org[] = [];

    function newOrg(){
        let newOrg: Org = {
            org_name: "test",
            org_id: 1,
            bundles: [],
            modules: [],
        }

        courseInfo = [...courseInfo, newOrg];
    }

</script>

<div id="courses" class="courses">
    <button class="add-org" onclick={newOrg}>New organisation</button>
    <button class="remove-org" onclick={newOrg}>Remove organisation</button>
    <!-- Use an {#each} loop to render Organisation components -->
    {#each courseInfo as organisation}
        <Organisation org={organisation} />
    {/each}
</div>