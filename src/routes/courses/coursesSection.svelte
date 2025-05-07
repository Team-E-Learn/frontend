<script lang="ts">
    import "../../styles/home-page/course.css" //import styles
    import Organisation from "./OrganisationTitle.svelte"
    import userService from "../../services/userService"
    import orgService from "../../services/organisationService"
    import {onMount} from "svelte";

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
    export let enableSubscribe;

    let courseInfo: Org[] = [];

    let count: number = 0

    function newOrg(){
        while (courseInfo.some(item => item.org_id === count)){
            count += 1;
        }
        let newOrg: Org = {
            org_name: "test",
            org_id: count,
            bundles: [],
            modules: [],
        }

        courseInfo = [...courseInfo, newOrg];
    }


    function deleteOrg(id: number){
        courseInfo = courseInfo.filter(org => org.org_id !== id);
    }

    async function fetchOrgs(userId: number) {
        try {
            const data = await userService.getUserSubscriptions(userId);
            courseInfo = data
        } catch (err) {
            error = 'Failed to fetch lessons';
            console.error(err);
        }
    }

    async function postOrg() {

    }

    onMount(() => {
        fetchOrgs(localStorage.userID);
        let userId: number | null = localStorage.getItem("userID");
        if (userId === null)
            return;
        fetchOrgs(userId);
    });

</script>

<div id="courses" class="courses">
    {#if !create}
        <button class="subscribe" onclick={enableSubscribe}>Subscribe to course</button>
    {/if}
    <!-- Use an {#each} loop to render Organisation components -->
    {#each courseInfo as organisation}
        <Organisation org={organisation} removeOrg={deleteOrg} create={create}/>
    {/each}
    {#if create}
        <button class="add-org" onclick={newOrg}>New organisation</button>
    {/if}
</div>