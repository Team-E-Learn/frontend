<script lang="ts">
    import '../../../styles/global.css'; // Import global styles
    import '../../../styles/module-lnding/moduleLandingPage.css'; // Import styles
    import Contents from './contentsBar.svelte' // Import contents component
    import Blocks from './block-system.svelte' // Import contents component
    import Dashboard from './landingPageDashboard.svelte' // Import dashboard
    import {mount, onMount} from "svelte"; // Import contents bar

    let { data } = $props(); // Get the module_id passed in from the home page

    let loadedLessons: number[] = $state([]);

    onMount(() => {
        let lessonButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".lesson-button");

        for (const btn: HTMLElement of lessonButtons) {
            btn.addEventListener("click", (event: Event) => {
                const target = event.target as HTMLButtonElement;
                if (target.classList.contains("active")) {
                    document.querySelector(".contents").classList.toggle("small");
                    return;
                }

                for (const btn: HTMLElement of lessonButtons) {
                    btn.classList.remove("active");
                }
                target.classList.add("active");
                if (!loadedLessons.includes(target.dataset.lesson_id as number)) {
                    loadedLessons = [...loadedLessons, target.dataset.lesson_id as number];
                }
                for (let id of loadedLessons) {
                    let div: HTMLElement | null = document.getElementById(`blocks-${id}`);
                    if (div) {
                        document.getElementById("cached-lesson").appendChild(div);
                    }
                    let block_div: HTMLElement | null = document.getElementById(`blocks-${target.dataset.lesson_id}`);
                    if (block_div) {
                        document.getElementById("loaded-lesson").appendChild(block_div);
                    }
                }
            })
        }
        let sectionButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".section_button");
        for (const btn: HTMLElement of sectionButtons) {
            btn.addEventListener("click", (event: Event) => {});
        }
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
<div id="cached-lesson">
</div>
