<script lang="ts">
    import{onMount} from "svelte";
    import '../../../styles/global.css'; // Import global styles
    import Courses from "../coursesSection.svelte"//import courses element
    import Dashboard from "../homeDashboard.svelte";//import Dashboard element
    import Header from "../../../componenets/header.svelte"//import Header element
    import TextEntry from '../../../componenets/text-entry.svelte'
    import moduleService from '../../../services/moduleService';
    import { goto } from "$app/navigation";

    function enableSubscribe(){
        document.querySelector(".entry")?.classList.remove("hidden");
        document.querySelector(".text")?.focus();
    }


    async function subscribeUser(code: string) {
        try {
            await moduleService.activateModuleCode(localStorage.userID, code);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    onMount(() => {
        if(localStorage.accountType === "teacher"){
            goto("/courses/creation")
        }
        //TODO: remove this line when login works
        localStorage.setItem("userID", 1);
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbGVhcm4tYmFja2VuZCIsImF1ZCI6ImVsZWFybi1mdWxsIiwic3ViIjoxLCJleHAiOjE3NzgwNzMwNDB9.mS3XKPHnrzE8UfGj-sVs2307evgdSoRtj7wQlLDKiGQ=");
        localStorage.setItem("accountType", "user");

        console.log(localStorage.userID)

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
                    subscribeUser(input)
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
