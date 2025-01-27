<script lang="ts">
    import "../styles/navBar.css"
    import ContentsBar from "./contentsBar.svelte";
    import { onMount } from "svelte";

    onMount(() => {
        let navContentsButton: HTMLElement | null = document.getElementById("nav-contents-button");
        if (navContentsButton) {
            navContentsButton.addEventListener("click", () => {
                document.querySelector(".contents")?.classList.toggle("hidden");
            })
        }
    });
</script>

<div class="nav-container">
    <div class="topnav">
        <button id="nav-contents-button"></button>
        <p>Home Page</p>
        <img src="" alt="pfp"/>
    </div>

    <ContentsBar />
</div>