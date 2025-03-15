<script lang="ts">
    import '../../../styles/global.css'; // Import global styles
    import Contents from './contentsBar.svelte' // Import contents component
    import Blocks from './block-system.svelte' // Import contents component
    import Dashboard from '../landingPageDashboard.svelte' // Import dashboard
    import {mount, onMount} from "svelte"; // Import contents bar

    let { data } = $props(); // Get the module_id passed in from the home page

    let loadedLessons: number[] = $state([]);

    onMount(() => {
        // TODO: clean this code up for a later date
        let parent = document.querySelector(".lessons"); // Get the parent object of the buttons
        if (!parent) return;

        // Run through each button and check for a press
        parent.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLButtonElement;

            // Return if the pressed button isn't the lesson button
            if (!target.classList.contains("lesson-button")) return;

            let contents = document.querySelector(".contents");
            if (!contents) return;
            // If the button is active, make the contents element small or large if it's already small
            if (target.classList.contains("active")) {
                contents.classList.toggle("small");
                return;
            }

            // Remove the active tag from every button and add active to the pressed button
            document.querySelectorAll(".lesson-button").forEach(btn => btn.classList.remove("active"));
            target.classList.add("active");

            // Add the lesson that corresponds to the button press to the loaded lessons array
            const lessonId = Number(target.dataset.lesson_id);
            if (!loadedLessons.includes(lessonId)) {
                loadedLessons = [...loadedLessons, lessonId];
            }

            const cachedContainer = document.getElementById("cached-lesson");
            const loadedContainer = document.getElementById("loaded-lesson");

            if (!cachedContainer || !loadedContainer) return;

            // Run through loaded lessons and put them in the cached container
            loadedLessons.forEach(id => {
                const div = document.getElementById(`blocks-${id}`);
                if (div) cachedContainer.appendChild(div);
            });

            // Add selected lesson to the loaded container
            const blockDiv = document.getElementById(`blocks-${lessonId}`);
            if (blockDiv) loadedContainer.appendChild(blockDiv);
        })
    });
</script>

<Dashboard/>
<div style="position: relative;">
    <Contents />
    <div id="loaded-lesson">
        {#each loadedLessons as lesson}
            <Blocks lesson_id={lesson}/>
        {/each}
    </div>
</div>
<div id="cached-lesson" style="display: none">
</div>
