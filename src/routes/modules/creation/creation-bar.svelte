<script lang="ts">
    import '../../../styles/module-creation/creation.css'; // Import styles
    import Lesson from "../lessons.svelte"
    import {onMount} from "svelte";
    import lessons from "../lessons.svelte";
    interface Lessons {
            lesson_name: string;
            lesson_id: number;
            url: string;
            sections: { section_name: string; }[];
        }[]//create lessons json
    // Initialize as an empty array
    let lessonsData: Lessons = [];

    onMount(() => {
        let count = 0;
        // Create a new lesson entry
        document.querySelector(".add-lesson").addEventListener("click", (event: Event) => {
            const newLesson: Lessons = {
                lesson_name: "testing",
                lesson_id: count += 1,
                url: "temp",
                sections: [
                    { section_name: "intro" },
                    { section_name: "work" }
                ]
            };
            // Add the new lesson to the array
            lessonsData = [...lessonsData, newLesson];
            console.log(lessonsData)
        })
    });
</script>

<div class="content-stick">
    <div class="contents ">
        <div class="selection hidden">
            <button class="selection-button" id="lesson">Lessons</button>
            <button class="selection-button" id="block">Blocks</button>
            <button class="selection-button" id="editor">Block Editor</button>
        </div>
        <div class="blocks hidden" id="block">
        </div>
        <div class="block-editor hidden" id="editor">
        </div>
        <div class="lessons" id="lesson">
            <div class="creation-tools">
                <button class="add-lesson">+</button>
                <button class="remove-lesson">-</button>
            </div>
            {#each lessonsData as lesson}
                <Lesson info={lesson}/>
            {/each}
        </div>
    </div>
</div>