<script lang="ts">
    import '../../../styles/global.css'; // Import global styles
    import Contents from './contentsBar.svelte' // Import contents component
    import Blocks from '../block-system.svelte' // Import contents component
    import Dashboard from '../landingPageDashboard.svelte' // Import dashboard
    import {onMount, tick} from "svelte"; // Import contents bar
    import { handleLessonButtonClick } from '../contents-bar-functions'
    import {goto} from "$app/navigation";

    let { data } = $props(); // Get the module_id passed in from the home page

    let loadedLessons: number[] = $state([]);

    let blocks: Record<number, Blocks> = {};

    function updateLessons(newLessons: number[]) {
        loadedLessons = newLessons;
    }

    let contentsRef: typeof Contents;

    onMount(() => {
        if(localStorage.accountType === "teacher"){
            goto(`/modules/creation${data.module_id}`)
        }

        // TODO: clean this code up for a later date
        let parent = document.querySelector(".lessons"); // Get the parent object of the buttons
        if (!parent) return;

        // Run through each button and check for a press
        parent.addEventListener("click", async (event) => {
            handleLessonButtonClick(event, loadedLessons, false, updateLessons)
            let target = event.target;
            await tick();
            contentsRef.callGenerateSections(Number(target.dataset.lesson_id));
        });
    });
</script>

<Dashboard/>
<div style="position: relative;">
    <Contents module_id={data.module_id} blocks={blocks} bind:this={contentsRef}/>
    <div id="loaded-lesson">
        {#each loadedLessons as lesson}
            <Blocks lesson_id={lesson} create={false} bind:this={blocks[lesson]}/>
        {/each}
    </div>
</div>
<div id="cached-lesson" style="display: none">
</div>
