<script lang="ts">
    import "../../styles/homePage.css" //import styles
    import Organisation from "./OrganisationTitle.svelte" // organisations element

    // temporary json for testing
    let courseInfo = [
        {
            "org_name": "University of Lincoln",
            "org_id": 1,
            "bundles": [
                {
                    "name": "Computer Science BSc",
                    "modules": [
                        {
                            "name": "Team Software Engineering",
                            "module_id": 1
                        },
                        {
                            "name": "Networking Fundamentals",
                            "module_id": 2
                        },
                        {
                            "name": "Applied Programming Paradigms",
                            "module_id": 3
                        }
                    ]
                }
            ],
            "modules": [
                {
                    "name": "Personal Development",
                    "module_id": 4
                }
            ]
        },
        {
            "org_name": "Microsoft",
            "org_id": 2,
            "bundles": [],
            "modules": [
                {
                    "name": "Excel Certification",
                    "module_id": 5
                }
            ]
        }
    ]
</script>

<div id="courses" class="courses">
    <!-- Use an {#each} loop to render Organisation components -->
    {#each courseInfo as organisation}
        <Organisation org={organisation} />
    {/each}
</div>