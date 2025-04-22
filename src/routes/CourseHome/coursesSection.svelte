<script lang="ts">
    import "../../styles/home-page/course.css" //import styles
    import Organisation from "./OrganisationTitle.svelte"
    import {onMount} from "svelte"; // organisations element

    interface Org {
        org_name: string,
        org_id: number,
        bundles: {
            name: string,
            id: number,
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

    export let create: boolean;

    let courseInfo: Org[] = [];

    let count: number = 0

    function newOrg(){
        let newOrg: Org = {
            org_name: "test",
            org_id: count += 1,
            bundles: [],
            modules: [],
        }

        courseInfo = [...courseInfo, newOrg];
    }

    function deleteOrg(id: number){
        courseInfo = courseInfo.filter(org => org.org_id !== id);
    }

    async function getOrg(){
        
    }

</script>

<div id="courses" class="courses">
    {#if create}
        <button class="add-org" onclick={newOrg}>New organisation</button>
    {/if}
    <!-- Use an {#each} loop to render Organisation components -->
    {#each courseInfo as organisation}
        <Organisation org={organisation} removeOrg={deleteOrg} create={create}/>
    {/each}
</div>