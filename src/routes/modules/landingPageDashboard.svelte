<script lang="ts">
  import Header from "../../componenets/header.svelte"
  let gradeCentreInfo = [
    {
      grade: [
        {
          total: 80,
        },
      ],
    },
  ];
  export let totalGrade: number = gradeCentreInfo[0].grade[0].total;
  let announcemntsInfo = [
    {
      announcements: [
        {
          title: "new assessment released",
          course: "Algorithms and Complexity",
        },
        {
          title: "new assessment released",
          course: "Algorithms and Complexity",
        },
        {
          title: "new assessment released",
          course: "Algorithms and Complexity",
        },
      ],
    },
  ];

  let callenderInfo = [
    {
      callender: [
        {
          title: "Algorithms ass 1",
          course: "Algorithms and Complexity",
          date: "2025-2-20",
        },
        {
          title: "Algorithms ass 1",
          course: "Algorithms and Complexity",
          date: "2025-2-20",
        },
        {
          title: "Algorithms ass 1",
          course: "Algorithms and Complexity",
          date: "2025-2-20",
        },
        {
          title: "Algorithms ass 1",
          course: "Algorithms and Complexity",
          date: "2025-2-20",
        },
        {
          title: "Algorithms ass 1",
          course: "Algorithms and Complexity",
          date: "2025-2-20",
        },
      ],
    },
  ];
  let courseInfo = [
    {
      professors: [
        {
          title: "Professor J. Doe",
        },
        {
          title: "Professor S. Butcher",
        },
        {
          title: "Professor J. Kennedy",
        },
      ],
      links: [
        {
          linkTitle: "important video",
          link: "https://www.youtube.com/watch?v=LQ4w9xiHkrY",
        },
        {
          linkTitle: "important video",
          link: "https://www.youtube.com/watch?v=LQ4w9xiHkrY",
        },
        {
          linkTitle: "important video",
          link: "https://www.youtube.com/watch?v=LQ4w9xiHkrY",
        },
      ],
    },
  ];
</script>

<Header title="Dashboard"/>

<div id="dashboard" class="dashboard">
  <div class="announcements">
    {#each announcemntsInfo[0]["announcements"] as an}
      <h4>{an.title}</h4>
      <p>{an.course}</p>
    {/each}
  </div>
  <div class="grades">
    <h1>{totalGrade}%</h1>
  </div>
  <div class="dashboard-side">
    <div class="info">
      <h4>professors:</h4>
      {#each courseInfo[0]["professors"] as ca}
        <p>{ca.title}</p>
      {/each}
      <h4>useful links:</h4>
      {#each courseInfo[0]["links"] as ca}
        <p><a href={ca.link}>{ca.linkTitle}</a></p>
      {/each}
    </div>
  </div>

  <div class="calendar">
    {#each callenderInfo[0]["callender"] as ca}
      <h4>{ca.title}</h4>
      <p>{ca.course} {ca.date}</p>
    {/each}
  </div>
</div>

<style>

  .dashboard {
    display: grid;
    margin-block: 5rem;
    grid-template-columns: auto 300px auto;
    grid-template-rows: 300px auto;
    grid-template-areas:
      "announcements grades side"
      "calendar calendar side";
    width: 70vw;
    min-height: 70vh;
    margin-inline: auto;
    gap: 2rem;
  }

  .dashboard > * {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: pink;
    padding: 0.5rem;
  }

  .announcements {
    font-size: 1.2rem;
    grid-area: announcements;
  }

  .grades {
    display: grid;
    place-items: center;
    font-size: 3rem;
    grid-area: grades;
  }

  .calendar {
    font-size: 1.2rem;
    grid-column: 1 / 3;
    grid-area: calendar;
  }

  .dashboard-side {
    grid-row: 1 / 3;
    grid-area: side;
  }
</style>
