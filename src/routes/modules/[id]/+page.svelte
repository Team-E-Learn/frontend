<script land="ts">
    import '../../../styles/global.css'; // Import global styles
    import '../../../styles/moduleLandingPage.css'; // Import styles
    import Contents from './contentsBar.svelte' // Import contents bar
    import LandingPageDashboard from './landingPageDashboard.svelte';

    let { data } = $props();

</script>

 <LandingPageDashboard/>

<Contents id="{data.module_id}"/>
