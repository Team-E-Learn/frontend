<script lang="ts">
    import '../../../styles/module-creation/creation.css'; // Import styles
    import Lesson from "../lessons.svelte"
    import Header from "../../../componenets/header.svelte"
    import {onMount} from "svelte";
    interface Lessons {
            lesson_name: string;
            lesson_id: number;
            sections: { section_name: string; }[];
        }//create lessons json

    // Initialize as an empty array
    let lessonsData: Lessons[] = [];

    onMount(() => {
        let count = 0;
        let addLesson = document.querySelector(".add-lesson")
        let removeLesson = document.querySelector(".remove-lesson")
        let textEntry = document.querySelector(".entry")
        let textBox = document.querySelector(".text")
        if(!addLesson || !textEntry || !textBox || !removeLesson) return;

        // Create a new lesson entry
        addLesson.addEventListener("click", (event: Event) => {
            textEntry.classList.remove("hidden")
            textBox.focus();
        })


        removeLesson.addEventListener("click", (event: Event) => {
            document.querySelectorAll(".lesson-section").forEach(section => {
                if (!section.classList.contains("hidden")) {
                    // Get lesson ID from the section's dataset
                    const lessonId: number = Number(section.dataset.lessonId);
                    // Remove the lesson from lessonsData
                    lessonsData = lessonsData.filter((lesson: Lessons) => lesson.lesson_id !== lessonId);
                    //TODO: (maybe) make the lesson bellow removed lesson active (stops there being a chance of a lesson not being active)
                    document.querySelectorAll(".lesson-button").forEach(btn => btn.classList.remove("active"));
                    document.querySelectorAll(".lesson-section").forEach(section => section.classList.add("hidden"));

                    // removes corresponding blocks
                    const blockDiv = document.getElementById(`blocks-${lessonId}`);
                    if (blockDiv) blockDiv.remove()

                    // Makes contents bar big if there are no lessons
                    let contents = document.querySelector(".contents");
                    if (contents && lessonsData.length === 0) {
                        contents.classList.remove("small")

                        // Define objects
                        let selection = document.querySelector(".selection");
                        let blocks = document.querySelector(".blocks");
                        let editor = document.querySelector(".block-editor");
                        if(!selection || !blocks || !editor) return;

                        selection.classList.add("hidden")
                        blocks.classList.add("hidden")
                        editor.classList.add("hidden")
                    }
                }
            });
        })

        document.addEventListener("keydown", (event) => {
            // If the enter text element is on screen
            if (event.key === "Escape") {
                textEntry.classList.add("hidden")
            }
        })
        // check if enter is pressed
        document.addEventListener("keydown", (event) => {
            // If the enter text element is on screen
            if (event.key === "Enter") {
                if (!textEntry.classList.contains("hidden")) {
                    let input_name = textBox.value
                    const newLesson: Lessons = {
                        lesson_name: input_name,
                        lesson_id: count += 1,
                        sections: [{section_name: "yes"}]
                    };
                    textBox.value = ""
                    // Add the new lesson to the array
                    lessonsData = [...lessonsData, newLesson];
                    textEntry.classList.add("hidden")
                }
            }
        });

        let lessons = document.querySelector(".lessons");
        let blocks = document.querySelector(".blocks");
        let editor = document.querySelector(".block-editor");
        if (!lessons || !blocks || !editor) return;

        // Switching between the different bar sections
        let selectionButtons: NodeListOf<HTMLElement> = document.querySelectorAll(".selection-button");
        for (const btn: HTMLElement of selectionButtons) {
            btn.addEventListener("click", (event: Event) => {
                const target = event.target as HTMLButtonElement;
                blocks.classList.toggle("hidden", blocks.id !== target.id);
                editor.classList.toggle("hidden", editor.id !== target.id);
                lessons.classList.toggle("hidden", lessons.id !== target.id);
            })
        }
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
            <Header title="Text Blocks"/>
            <button class="block-preview text1"> Text block type 1 </button>
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