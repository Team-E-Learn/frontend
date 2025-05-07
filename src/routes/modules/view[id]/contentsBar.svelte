<script lang="ts">
    import '../../../styles/module-landing/contents.css'; // Import styles
    import Lesson from "../lessons.svelte"; //Import lessons
    import lessonService from "../../../services/lessonService"
    import {onMount} from "svelte";
    import Blocks from "../block-system.svelte";

    interface Lessons {
        title: string;
        id: number;
    }//create lessons json

    export let module_id;

    let lessons: Lessons[] = []

    let components: Record<number, Lesson> = {};

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

    async function fetchLessons(moduleId: number) {
        try {
            const data = await lessonService.getLessons(moduleId);
            lessons = data.lessons;
        } catch (err) {
            error = 'Failed to fetch lessons';
            console.error(err);
        }
    }

    export function callGenerateSections(lesson_id: number){
        components[lesson_id]?.generateSections?.();
    }

    onMount(() => {
        fetchLessons(module_id)
    });

</script>
<div class="content-stick">
    <div class="contents ">
        <div class="lessons" id="lesson">
            {#each lessons as lesson}
                <Lesson info={lesson} postBlocks={postBlocks} bind:this={components[lesson.id]} creation={false}/>
            {/each}
        </div>
    </div>
</div>