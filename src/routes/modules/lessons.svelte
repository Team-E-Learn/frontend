<script lang="ts">
    import '../../styles/module-landing/lessons.css'; // Import styles
    import Section from "./sections.svelte";
    import {onMount} from "svelte";

    export let info: {
        lesson_name: string;
        lesson_id: number;
    }; // pass through lesson details from json

    let blockData = {};
    let sections = [];

    onMount(() => {
        let lessonButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".lesson-button");
        for (const btn: HTMLElement of lessonButtons) {
            btn.addEventListener("click", (event: Event) => {
                //TODO: fix this code for adding sections
                const blockContainer = document.getElementById(`blocks-${info.lesson_id}`);
                if (blockContainer) {
                    const data = blockContainer.getAttribute("data-block-data");
                    blockData = JSON.parse(data);
                }
                let temp = [];
                for (let i in length(blockData)) {
                    temp = [...sections, "Introduction"];
                }
                sections = temp;

                document.querySelectorAll(".lesson-section").forEach((section) => {
                    section.classList.add("hidden");
                })
                event.target.parentElement.parentElement.querySelector(".lesson-section")?.classList.remove("hidden");
                // top scroll
                document.querySelectorAll(".block-container > *")[0].scrollIntoView({ behavior: "smooth" });
            })
        }
    });
</script>

<div class="lesson">
    <div class="lesson-header">
        <button class="lesson-button" data-lesson_id="{info.lesson_id}">{info.lesson_name}</button>
    </div>

    <div class="lesson-section hidden" data-lesson-id={info.lesson_id}>
        {#each sections as section}
            <Section info={section}/>
        {/each}
    </div>
</div>
