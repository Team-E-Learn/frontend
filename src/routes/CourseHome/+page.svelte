<script lang="ts">
    import{onMount} from "svelte";
    import '../../styles/global.css'; // Import global styles
    import '../../styles/homePage.css'; // Import styles
    import NavBar from "../../componenets/NavBar.svelte"; //import nav bar element
    import Corses from "./coursesSection.svelte"//import corses element
</script>


<!-- calls nav bar element -->
<NavBar />
<!-- calls corses element -->
<Corses />

