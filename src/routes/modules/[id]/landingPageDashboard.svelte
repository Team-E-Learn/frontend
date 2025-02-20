<script lang="ts">
    import '../../../styles/moduleLandingPage.css'

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
                "course": "Algorithms and Complexity"
            },
            {
                "title": "new assessment released",
                "course": "Algorithms and Complexity"
            },
            {
                "title": "new assessment released",
                "course": "Algorithms and Complexity"
            }
        ]
    }]

    let callenderInfo = [{
        "callender": [
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
            }
        ]
    }]
    let courseInfo = [{
        "professors": [
            {
                "title": "Professor J. Doe"
            },
            {
                "title": "Professor S. Butcher"
            },
            {
                "title": "Professor J. Kennedy"
            }
        ],
        "links": [
            {
                "linkTitle" : "important video",
                "link": "https://www.youtube.com/watch?v=LQ4w9xiHkrY"
            },
            {
                "linkTitle" : "important video",
                "link": "https://www.youtube.com/watch?v=LQ4w9xiHkrY"
            },
            {
                "linkTitle" : "important video",
                "link": "https://www.youtube.com/watch?v=LQ4w9xiHkrY"
            }
        ]
    }]
</script>

<div class = "dashboardHeader">
    <h1>Dashboard</h1>
    <p class="divider"></p>
</div>

<div class = "dashboardContainer">
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

    <div class = "dashboardSide">
        <div class = "info">
            <h4>professors:</h4>
            {#each courseInfo[0]["professors"] as ca}
                <p>{ca.title}</p>
            {/each}
            <h4>useful links:</h4>
            {#each courseInfo[0]["links"] as ca}
                <p><a href = {ca.link}>{ca.linkTitle}</a></p>
            {/each}
        </div>
    </div>
</div>
