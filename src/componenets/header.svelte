<script lang="ts">
    import "../styles/header/header.css"

    export let title: string;
    export let button: boolean = false;

    function back_button(){

    }
</script>

{#if button}
    <a class="back" href="/courses/view">Back</a>
{/if}
<h2 class="Title">{title}</h2>
<p class="divider"></p>
