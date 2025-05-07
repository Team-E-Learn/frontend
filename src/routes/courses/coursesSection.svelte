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
            const data = await userService.getUserSubscriptions(userId);
            courseInfo = data
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
        if (!org_textbox){
            console.log("undefined")
        }
        const child = org_textbox.getElementsByClassName("text")[0] as HTMLElement | undefined;
        if (child === undefined) {
            console.log("textEntry not found");
            return;
        }
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
                    courseInfo = [...courseInfo, newData];
                    console.log(newData)
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
        <OrganisationComp org={organisation} removeOrg={deleteOrg} create={create}/>
    {/each}
    {#if create}
        <button class="add-org" onclick={newOrg}>New organisation</button>
    {/if}
</div>