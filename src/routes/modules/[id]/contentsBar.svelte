<script lang="ts">
    import '../../../styles/module-landing/contents.css'; // Import styles
    import Lesson from "../lessons.svelte"; //Import lessons
    import lessonService from "../../../services/lessonService"
    import {mount, onMount} from "svelte";

    export let module_id;

    interface Lessons {
        lesson_name: string;
        lesson_id: number;
        sections: { section_name: string; }[];
    }//create lessons json

    let lessons = []

    async function fetchLessons(moduleId: number) {
        try {
            const data = await lessonService.getLessons(moduleId);
            lessons = data.lessons;
        } catch (err) {
            error = 'Failed to fetch lessons';
            console.error(err);
        }
    }

    onMount(() => {
        fetchLessons(module_id)
    });

</script>
<div class="content-stick">
    <div class="contents ">
        <div class="lessons" id="lesson">
            {#each lessons as lesson}
                <Lesson info={lesson}/>
            {/each}
        </div>
    </div>
</div>