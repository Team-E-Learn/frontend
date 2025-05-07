import { apiBaseUrl } from "../shared/constants";
import type { CreateOrganisationResponse, Organisation } from "./types";

// makes a POST request to the endpoint at /v1/org
// if successful, returns the organisation and its modules
// throws an error containing the relevant message otherwise
const createOrganisation = async (org: Organisation, owner_id: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }
    const url = `${apiBaseUrl}/v1/org`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
        },
        body: new URLSearchParams({
            name: org.name,
            description: "Blank",
            modules: JSON.stringify(org.modules),
            owner_id: owner_id.toString()
        })
    });

    const data: CreateOrganisationResponse = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return {
        organisation: data.Organisation,
        modules: data.modules,
    }
};

export default { createOrganisation };
