import { apiBaseUrl } from "../shared/constants";
import type { CreateOrganisationResponse, Organisation } from "./types";

// makes a POST request to the endpoint at /v1/org
// if successful, returns the organisation and its modules
// throws an error containing the relevant message otherwise
const createOrganisation = async (org_name: string, bundles: { bundle_name: string; modules: { name: string;}[]}[], modules: { name: string;}[], owner_id: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }
    const url = `${apiBaseUrl}/v1/org/`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
        },
        body: new URLSearchParams({
            name: org_name,
            bundles: JSON.stringify(bundles),
            modules: JSON.stringify(modules),
            owner_id: owner_id.toString()
        })
    });

    const data: CreateOrganisationResponse = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;

};

export default { createOrganisation };
