import { apiBaseUrl } from "../shared/constants";
import type { AddModuleResponse } from "./types";

// makes a PUT request to the endpoint at /v1/org/{orgId}/module/user/{userId}
// returns nothing if successful
// throws an error if a failure occurs
const addModule = async (orgId: number, moduleId: number, userId: number) => {
    const url = `${apiBaseUrl}/v1/org/${orgId}/module/${moduleId}/user/${userId}`;
    const response = await fetch(url, { method: "PUT" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: AddModuleResponse = await response.json();
    if (!data.success) {
        throw new Error(data.error);
    }
};

export default { addModule };
