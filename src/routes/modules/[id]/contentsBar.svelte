<script lang="ts">
    import '../../../styles/moduleLandingPage.css'; // Import styles
    import Lesson from "./lessons.svelte"; //Import lessons

    let lessons = [
        {
            "lesson_name": "fundamentals",
            "lesson_id": 1,
            "url": "example",
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
            "url": "example",
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
            "url": "example",
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

<div class="contents">
    {#each lessons as lesson}
        <Lesson info={lesson}/>
    {/each}
</div>