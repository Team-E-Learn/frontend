<script land="ts">
    import '../../../styles/global.css'; // Import global styles
    import '../../../styles/moduleLandingPage.css'; // Import styles
    import Contents from './contentsBar.svelte' // Import contents bar
<<<<<<< HEAD:src/routes/module/landing/+page.svelte
    import LandingPageDashboard from './landingPageDashboard.svelte';
</script>

<LandingPageDashboard/>

<Contents/>
=======

    let { data } = $props();

</script>

<Contents id="{data.module_id}"/>
>>>>>>> development:src/routes/modules/[id]/+page.svelte
