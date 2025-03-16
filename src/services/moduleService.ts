import { apiBaseUrl } from "../shared/constants";
import type { AddModuleResponse } from "./types";

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
