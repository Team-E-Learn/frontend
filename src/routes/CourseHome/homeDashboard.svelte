<script lang="ts">
    import '../../styles/homePage.css'
    let gradeCentreInfo = [{
        "grade": [
            {
                "total": 80
            }
        ]
    }]
    export let totalGrade: number = gradeCentreInfo[0].grade[0].total
    let announcemntsInfo = [{
        "announcements": [
            {
                "title": "new assessment released",
                "course": "Maths for Computing"
            },
            {
                "title": "new assessment released",
                "course": "Algorithms and Complexity"
            },
            {
                "title": "new assessment released",
                "course": "Networks"
            }
        ]
    }]

    let callenderInfo = [{
        "callender": [
            {
                "title": "Maths ass 1",
                "course": "Maths for Computing",
                "date": "2025-2-29"
            },
            {
                "title": "Algorithms ass 1",
                "course": "Algorithms and Complexity",
                "date": "2025-2-20"
            },
            {
                "title": "Algorithms ass 1",
                "course": "Algorithms and Complexity",
                "date": "2025-2-20"
            },
            {
                "title": "Algorithms ass 1",
                "course": "Algorithms and Complexity",
                "date": "2025-2-20"
            },
            {
                "title": "Algorithms ass 1",
                "course": "Algorithms and Complexity",
                "date": "2025-2-20"
            },
            {
                "title": "Algorithms ass 1",
                "course": "Algorithms and Complexity",
                "date": "2025-2-20"
            },
            {
                "title": "Networks ass 1",
                "course": "Networks",
                "date": "2025-2-17"

            }
        ]
    }]


</script>
<div class = "dashboardHeader">
    <h1>Dashboard</h1>
    <p class="divider"></p>
</div>

<div id="dashboard" class="dashboard">
    <div class="announcements">
        {#each announcemntsInfo[0]["announcements"] as an}
            <h4>{an.title}</h4>
            <p>{an.course}</p>
        {/each}
    </div>
    <div class = "grades">
        <h1>{totalGrade}%</h1>
    </div>
    <div class = "calendar">
        {#each callenderInfo[0]["callender"] as ca}
            <h4>{ca.title}</h4>
            <p>{ca.course} {ca.date}</p>
        {/each}
    </div>
</div>

