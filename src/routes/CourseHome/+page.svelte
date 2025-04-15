<script lang="ts">
    import{onMount} from "svelte";
    import '../../styles/global.css'; // Import global styles
    import Courses from "./coursesSection.svelte"//import courses element
    import Dashboard from "./homeDashboard.svelte";//import Dashboard element
    import Header from "../../componenets/header.svelte"//import Header element
    import TextEntry from '../../componenets/text-entry.svelte'


</script>

<!-- calls header element -->
<Header title="Home Page"/>
<!-- calls dashboard element -->
<Dashboard/>
<!-- calls corses element -->
<Courses />
