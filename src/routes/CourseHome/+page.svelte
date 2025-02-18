<script lang="ts">
    import{onMount} from "svelte";
    import '../../styles/global.css'; // Import global styles
    import '../../styles/homePage.css'; // Import styles
    import Corses from "./coursesSection.svelte"//import corses element
    import Dashboard from "./homeDashboard.svelte";
</script>

<!-- calls corses element -->
<Corses />
