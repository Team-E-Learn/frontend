<script lang="ts">
    import '../../styles/module-landing/lessons.css'; // Import styles
    import Section from "./sections.svelte";
    import {onMount} from "svelte";

    export let info: {
        title: string,
        id: number,
    }; // pass through lesson details from json

    export let creation: boolean;
    export let module_id: number;
    export let postBlocks;

    let blockData = {};
    let sections = [];

    export function generateSections(){
        const blockContainer = document.getElementById(`blocks-${info.id}`);
        if (blockContainer) {
            const data = blockContainer.getAttribute("data-block-data");
            blockData = JSON.parse(data);
        }
        sections = [];
        blockData.forEach((block) => {
            sections = [...sections, block.name];
        });
    }

    onMount(() => {
        let lessonButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".lesson-button");
        for (const btn: HTMLElement of lessonButtons) {
            btn.addEventListener("click", async (event: Event) => {
                document.querySelectorAll(".lesson-section").forEach((section) => {
                    section.classList.add("hidden");
                })
                event.target.parentElement.parentElement.querySelector(".lesson-section")?.classList.remove("hidden");
                // top scroll
                document.querySelectorAll(".block-container > *")[0]?.scrollIntoView({ behavior: "smooth" });

                //generateSections();
            })
        }
    });
</script>

<div class="lesson">
    <div class="lesson-header">
        <button class="lesson-button" data-lesson_id="{info.id}">{info.title}</button>
        {#if creation}
            <button class="save-button" on:click={postBlocks(info.id)}>Save</button>
        {/if}

    </div>

    <div class="lesson-section hidden" data-lesson-id={info.id}>
        {#each sections as section}
            <Section info={section}/>
        {/each}
    </div>
</div>
