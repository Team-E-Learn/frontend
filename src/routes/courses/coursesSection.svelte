<script lang="ts">
    import "../../styles/home-page/course.css" //import styles
    import OrganisationComp from "./OrganisationTitle.svelte"
    import userService from "../../services/userService"
    import {onMount} from "svelte";
    import organisationService from "../../services/organisationService";

    interface Org {
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
    }

    export let create: boolean;
    export let enableSubscribe;

    let courseInfo: Org[] = [];

    function newOrg(){
        const org_textbox = document.getElementById("add_org_text");
        org_textbox.classList.remove("hidden");
        const child = org_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;
        child?.focus();
    }


    function deleteOrg(id: number){
        courseInfo = courseInfo.filter(org => org.org_id !== id);
    }

    async function fetchOrgs(userId: number) {
        try {
            courseInfo = await userService.getUserSubscriptions(userId);
            console.log(courseInfo)
        } catch (err) {
            console.error(err);
        }
    }

    async function postOrg(org_name: string, bundles: { bundle_name: string; modules: { name: string;}[]}[], modules: { name: string;}[]){
        try{
            let resp = await organisationService.createOrganisation(org_name, bundles, modules, localStorage.userID);
            return resp.Organisation;
        } catch (err) {
            console.error(err);
        }
    }

    onMount(() => {
        let userId: number | null = localStorage.getItem("userID");
        if (userId === null)
            return;
        fetchOrgs(userId);

        const org_textbox = document.getElementById("add_org_text");
        const child = org_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;
        // check if enter is pressed
        document.addEventListener("keydown", async (event) => {
            if (event.key === "Escape") {
                org_textbox.classList.add("hidden")
            }

            // If the enter text element is on screen
            if (event.key === "Enter") {
                if (!org_textbox.classList.contains("hidden")) {
                    let input_name = child.value;
                    let newData = await postOrg(input_name, [], [])
                    const index = courseInfo.findIndex(course => course.id === newData.id);
                    if (index !== -1) {
                        // Replace the existing entry
                        courseInfo = [
                            ...courseInfo.slice(0, index),
                            newData,
                            ...courseInfo.slice(index + 1)
                        ];
                    } else {
                        // Add the new entry
                        courseInfo = [...courseInfo, newData];
                    }
                    child.value = "";
                    // Add the new lesson to the array
                    org_textbox.classList.add("hidden");
                }
            }
        });
    });

</script>

<div id="courses" class="courses">
    {#if !create}
        <button class="subscribe" onclick={enableSubscribe}>Subscribe to course</button>
    {/if}
    <!-- Use an {#each} loop to render Organisation components -->
    {#each courseInfo as organisation}
        <OrganisationComp bind:org={organisation} postOrg={postOrg} removeOrg={deleteOrg} create={create}/>
    {/each}
    {#if create}
        <button class="add-org" onclick={newOrg}>New organisation</button>
    {/if}
</div>