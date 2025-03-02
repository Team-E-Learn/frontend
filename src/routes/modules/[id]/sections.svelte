<script lang="ts">
    import '../../../styles/module-lnding/sections.css'; // Import styles
    export let info: {
        section_name: string;
    }; // pass through lesson details from json
</script>

<div class="section_content">
    <button class="section_button">{info.section_name}</button>
</div>