<script lang="ts">
    import '../../../styles/module-creation/creation.css'; // Import styles
    import Lesson from "../lessons.svelte"
    import Header from "../../../componenets/header.svelte"
    import lessonService from "../../../services/lessonService"
    import {onMount} from "svelte";
    import Blocks from "../block-system.svelte";
    interface Lessons {
        title: string;
        id: number;
    }//create lessons json

    export let module_id;
    let count = 0;

    // Initialize as an empty array
    let lessonsData: Lessons = [];

    let components: Record<number, Lesson> = {};

    export function callGenerateSections(lesson_id: number){
        components[lesson_id]?.generateSections?.();
    }

    export let blocks: Record<number, Blocks> = {};

    function postBlocks(lesson_id: number){
        for (block in blocks[lesson_id].blockData){
            updateBlock(lesson_id, block)
        }
    }

    async function updateBlock(lesson_id: number, block: Blocks){
        try {
            await lessonService.addLessonBlock(lesson_id, block);
            console.log('Lesson block added successfully');
        } catch (error) {
            console.error('Error adding lesson block:', error);
        }
    }

    function postLessons(lessonId: number, moduleId: number, title: string) {
        console.log
        lessonService.addLesson(lessonId, moduleId, title)
            .then(() => {
                console.log('Lesson added!');
            })
            .catch(err => {
                console.error('Error adding lesson:', err);
            });
    }

    async function fetchLessons(moduleId: number) {
        console.log(moduleId)
        try {
            const data = await lessonService.getLessons(moduleId);
            lessonsData = data.lessons;
        } catch (err) {
            error = 'Failed to fetch lessons';
            console.error(err);
        }
    }

    async function deleteLessons(lessonId: number) {
        lessonService.deleteLesson(lessonId)
            .then(() => {
                console.log('Lesson deleted!');
            })
            .catch(err => {
                console.error('Error deleting lesson:', err);
            });
    }

    onMount(() => {
        fetchLessons(module_id)

        let addLesson = document.querySelector(".add-lesson")
        let removeLesson = document.querySelector(".remove-lesson")
        let textEntry = document.querySelector(".entry")
        let textBox = document.querySelector(".text")
        if(!addLesson || !textEntry || !textBox || !removeLesson) return;

        // creation a new lesson entry
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
                    lessonsData = lessonsData.filter((lesson: Lessons) => lesson.id !== lessonId);

                    deleteLessons(lessonId)

                    //TODO: (maybe) make the lesson bellow removed lesson active (stops there being a chance of a lesson not being active)
                    document.querySelectorAll(".lesson-button").forEach(btn => btn.classList.remove("active"));

                    // removes corresponding blocks
                    const blockDiv = document.getElementById(`blocks-${lessonId}`);
                    if (blockDiv) blockDiv.remove()

                    // Makes contents bar big if there are no lessons
                    if (lessonsData.length === 0) {
                        document.querySelector(".contents")?.classList.remove("small")
                        document.querySelector(".selection")?.classList.add("hidden");
                        document.querySelector(".blocks")?.classList.add("hidden");
                        document.querySelector(".block-editor")?.classList.add("hidden");
                    }
                }
                section.classList.add("hidden")
            });
        })


        // check if enter is pressed
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                textEntry.classList.add("hidden")
            }

            // If the enter text element is on screen
            if (event.key === "Enter") {
                if (!textEntry.classList.contains("hidden")) {
                    let input_name = textBox.value
                    while (lessonsData.some(item => item.id === count || count === 0)){
                        count += 1;
                    }
                    const newLesson: Lessons = {
                        title: input_name,
                        id: count,
                    };
                    console.log(newLesson.id, module_id, newLesson.title)
                    postLessons(newLesson.id, module_id, newLesson.title)
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
            <Header title="Add blocks"/>
            <button class="block-preview text-block-button"> Text block </button>
            <button class="block-preview image-block-button"> Image block </button>
            <button class="block-preview text-image-block-button"> Text and Image block </button>
            <button class="block-preview download-block-button"> Download block </button>
            <button class="block-preview quiz-block-button"> Quiz block </button>
        </div>
        <div class="block-editor hidden" id="editor">
        </div>
        <div class="lessons" id="lesson">
            <div class="creation-tools">
                <button class="add-lesson">+</button>
                <button class="remove-lesson">-</button>
            </div>
            {#each lessonsData as lesson}
                <Lesson info={lesson} bind:this={components[lesson.id]} creation={true}, module_id={module_id}/>
            {/each}
        </div>
    </div>
</div>