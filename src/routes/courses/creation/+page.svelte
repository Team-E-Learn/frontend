<script lang="ts">
    import{onMount} from "svelte";
    import '../../../styles/global.css'; // Import global styles
    import Courses from "../coursesSection.svelte"//import courses element
    import Dashboard from "../homeDashboard.svelte";//import Dashboard element
    import Header from "../../../componenets/header.svelte"//import Header element
    import TextEntry from '../../../componenets/text-entry.svelte'
    import {goto} from "$app/navigation";

    onMount(() => {
        if(localStorage.ccountType === "user"){
            goto("/courses/view")
        }
        //TODO: remove this line when login works
        localStorage.setItem("userID", 2);


        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                textEntry.classList.add("hidden")
            }

            // If the enter text element is on screen
            if (event.key === "Enter") {
                if (!textEntry.classList.contains("hidden")) {
                    let input_name = textBox.value
                    // TODO: add value to list
                    textBox.value = ""
                }
            }
        });
    })
</script>


<!-- calls header element -->
<Header title="Home Page"/>
<!-- calls dashboard element -->
<Dashboard/>
<!-- calls corses element -->
<Courses create={true}/>
