<script lang="ts">
    import '../../../styles/global.css'; // Import global styles
    import Contents from './contentsBar.svelte' // Import contents component
    import Blocks from '../block-system.svelte' // Import contents component
    import Dashboard from '../landingPageDashboard.svelte' // Import dashboard
    import {mount, onMount, tick} from "svelte"; // Import contents bar
    import { handleLessonButtonClick } from '../contents-bar-functions'

    let { data } = $props(); // Get the module_id passed in from the home page

    let loadedLessons: number[] = $state([]);

    function updateLessons(newLessons: number[]) {
        loadedLessons = newLessons;
    }

    let contentsRef: typeof Contents;

    onMount(() => {
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
    <Contents module_id={data.module_id} bind:this={contentsRef}/>
    <div id="loaded-lesson">
        {#each loadedLessons as lesson}
            <Blocks lesson_id={lesson} create={false}/>
        {/each}
    </div>
</div>
<div id="cached-lesson" style="display: none">
</div>
