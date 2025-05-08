<script lang="ts">
    import "../styles/header/header.css"
    import {onMount} from "svelte"; // Import contents bar

    export let title: string;
    export let button: boolean = false;

    let accountType: string;

    onMount(() => {
        accountType = localStorage.accountType;
    });
</script>

{#if button}
    {#if accountType === "user"}
    <a class="back" href="/courses/view">Back</a>
    {:else }
        <a class="back" href="/courses/creation">Back</a>
    {/if}
{/if}
<h2 class="Title">{title}</h2>
<p class="divider"></p>
