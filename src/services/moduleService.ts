import { apiBaseUrl } from "../shared/constants";
import type { AddModuleResponse, Module1 } from "./types";

// makes a PUT request to the endpoint at /v1/modulecode/{userId}
// returns nothing if successful
// throws an error with the relevant messsage if a failure occurs
const activateModuleCode = async (userId: number, code: string) => {
    const url = `${apiBaseUrl}/v1/module/code/${userId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code
        }),
    })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
}

// makes a GET request to the endpoint at /v1/module/{module_id}
// returns the requested module if successful
// throws an error with the relevant error message if unsuccessful
const getModule = async (moduleId: number) => {
    const url = `${apiBaseUrl}/v1/module/${moduleId}`;
    const response = await fetch(url, { method: "GET" })
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error);
    }
    return data as Module1;
}

// makes a PUT request to the endpoint at /v1/org/{orgId}/module/user/{userId}
// returns nothing if successful
// throws an error if a failure occurs
const addModule = async (orgId: number, moduleId: number, userId: number) => {
    const url = `${apiBaseUrl}/v1/org/${orgId}/module/${moduleId}/user/${userId}`;
    const response = await fetch(url, { method: "PUT" });
    const data: AddModuleResponse = await response.json();
    if (!data.success) {
        throw new Error(data.error);
    }
};

export default { addModule, activateModuleCode, getModule };
