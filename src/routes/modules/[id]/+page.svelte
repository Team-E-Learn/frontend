<script land="ts">
    import '../../../styles/global.css'; // Import global styles
    import '../../../styles/moduleLandingPage.css'; // Import styles
    import Contents from './contentsBar.svelte' // Import contents bar

    let { data } = $props();

    // fetch("/v1/auth/login", {
    //     method: "POST",
    //     headers: {
    //         "Authorization": "Bearer CUM"
    //     },
    //     body: JSON.stringify({
    //         "email": "cum@balls.com",
    //         "password": "penis"
    //     })
    // })
</script>

<h1>{data.module_id}</h1>
<Contents/>
