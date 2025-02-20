<script lang="ts">
    import "../styles/block-system.css"
    let blockData = [
        {
            "block_type": "1",
            "block_id": "2038473",
            "order": "1",
            "data":[
                {
                    "question_content":"what is the colour of the sky?",
                    "question_answer":"blue"
                },
                {
                    "question_content":"why is the sea blue",
                    "question_answer":"reflections from the sky"
                }
            ]
        },
        {
            "block_type": "2",
            "block_id": "03848293",
            "order": "2",
            "data":"iahehfgwi"
        },
        {
            "block_type": "3",
            "block_id": "185454",
            "order": "3",
            "data": "(link to download)"
        }
    ]
    export let lesson_id: number;
</script>

<div id="blocks-{lesson_id}" class="block-container">
    {#each blockData as block}
        <p>{lesson_id}</p>
    {/each}
</div>