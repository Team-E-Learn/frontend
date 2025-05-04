<script lang="ts">
    import{onMount} from "svelte";
    import '../../../styles/global.css'; // Import global styles
    import Courses from "../coursesSection.svelte"//import courses element
    import Dashboard from "../homeDashboard.svelte";//import Dashboard element
    import Header from "../../../componenets/header.svelte"//import Header element
    import TextEntry from '../../../componenets/text-entry.svelte'
    import moduleService from '../../../services/moduleService';
    import {goto} from "$app/navigation";

    function enableSubscribe(){
        document.querySelector(".entry")?.classList.remove("hidden");
        document.querySelector(".text")?.focus();
    }


    async function subscribeUser(userID: number, code: string) {
        try {
            await moduleService.activateModuleCode(userID, code);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    onMount(() => {
        if (!localStorage.getItem("token")) {
            console.log("Redirecting...");
            goto("/login");
        }

        let textEntry = document.querySelector(".entry");
        let textBox = document.querySelector(".text")
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                textEntry.classList.add("hidden")
            }

            // If the enter text element is on screen
            if (event.key === "Enter") {
                if (!textEntry.classList.contains("hidden")) {
                    let input = textBox.value
                    subscribeUser(1, input)
                    textEntry.classList.add("hidden")
                }
            }
        });
    });
</script>


<TextEntry text="Enter subscription code:"/>
<!-- calls header element -->
<Header title="Home Page"/>
<!-- calls dashboard element -->
<Dashboard/>
<!-- calls courses element -->
<Courses create={false} enableSubscribe={enableSubscribe}/>
