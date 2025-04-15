<script lang="ts">
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
          course: "Maths for Computing",
        },
        {
          title: "new assessment released",
          course: "Algorithms and Complexity",
        },
        {
          title: "new assessment released",
          course: "Networks",
        },
      ],
    },
  ];

  let callenderInfo = [
    {
      callender: [
        {
          title: "Maths ass 1",
          course: "Maths for Computing",
          date: "2025-2-29",
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
        {
          title: "Algorithms ass 1",
          course: "Algorithms and Complexity",
          date: "2025-2-20",
        },
        {
          title: "Networks ass 1",
          course: "Networks",
          date: "2025-2-17",
        },
      ],
    },
  ];
</script>



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
    grid-template-columns: auto 300px;
    grid-template-rows: 300px auto;
    width: 70vw;
    min-height: 70vh;
    margin-inline: auto;
    gap: 2rem;
  }

  .dashboard > * {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: var(--secondary);
    padding: 0.5rem;
  }

  .announcements {
    font-size: 1.2rem;
  }

  .grades {
    display: grid;
    place-items: center;
    font-size: 3rem;
  }

  .calendar {
    font-size: 1.2rem;
    grid-column: 1 / 3;
  }
</style>
