<script lang="ts">
    import '../../../styles/module-landing/contents.css'; // Import styles
    import Lesson from "../lessons.svelte"; //Import lessons
    import lessonService from "../../../services/lessonService"
    import {onMount} from "svelte";

    interface Lessons {
        title: string;
        id: number;
    }//create lessons json

    export let module_id;

    let lessons: Lessons = []

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
                <Lesson info={lesson} creation={false}/>
            {/each}
        </div>
    </div>
</div>