<script lang="ts">
    import '../../../styles/module-landing/contents.css'; // Import styles
    import Lesson from "../lessons.svelte"; //Import lessons

    interface Lessons {
        lesson_name: string;
        lesson_id: number;
        sections: { section_name: string; }[];
    }//create lessons json

    let lessons: Lessons = [
        {
            "lesson_name": "fundamentals",
            "lesson_id": 1,
            "sections":[
                {
                    "section_name": "intro"
                },
                {
                    "section_name": "description"
                },
                {
                    "section_name": "questions"
                },
                {
                    "section_name": "questions"
                },
                {
                    "section_name": "questions"
                },
                {
                    "section_name": "questions"
                },
                {
                    "section_name": "questions"
                },
                {
                    "section_name": "docs"
                }
            ]
        },
        {
            "lesson_name": "Osmosis",
            "lesson_id": 2,
            "sections":[
                {
                    "section_name": "intro"
                },
                {
                    "section_name": "description"
                },
                {
                    "section_name": "questions"
                },
                {
                    "section_name": "docs"
                }
            ]
        },
        {
            "lesson_name": "reproduction",
            "lesson_id": 3,
            "sections":[
                {
                    "section_name": "intro"
                },
                {
                    "section_name": "description"
                },
                {
                    "section_name": "questions"
                },
                {
                    "section_name": "docs"
                }
            ]
        }
    ] //temporary data : Replace with api call
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