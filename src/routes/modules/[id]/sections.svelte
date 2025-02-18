<script lang="ts">
    import '../../../styles/moduleLandingPage.css'; // Import styles
    export let info: {
        section_name: string;
    }; // pass through lesson details from json
</script>

<div class="section_content">
    <button>{info.section_name}</button>
</div>