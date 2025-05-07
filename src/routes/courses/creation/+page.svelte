<script lang="ts">
    import{onMount} from "svelte";
    import '../../../styles/global.css'; // Import global styles
    import Courses from "../coursesSection.svelte"//import courses element
    import Dashboard from "../homeDashboard.svelte";//import Dashboard element
    import Header from "../../../componenets/header.svelte"//import Header element
    import TextEntry from '../../../componenets/text-entry.svelte'

    onMount(() => {
        //TODO: remove this line when login works
        localStorage.setItem("userID", 2);
        localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlbGVhcm4tYmFja2VuZCIsImF1ZCI6ImVsZWFybi1mdWxsIiwic3ViIjoyLCJleHAiOjE3NzgwNzMwNDB9.sld-lLNtYlitSSHzcMe6xz7X1cUfU0pv9kRg9-QTcos=");
        localStorage.setItem("accountType", "teacher");


        if (!localStorage.getItem("token")) {
            console.log("Redirecting...");
            goto("/login");
        }

        if(localStorage.accountType === "user"){
            goto("/courses/view")
        }

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
