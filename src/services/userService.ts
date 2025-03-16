import { apiBaseUrl } from "../shared/constants";
import type { DashboardElement, Subscription, UserProfile } from "./types";

const getHomeDashboard = async (userId: number) => {
    const url = `${apiBaseUrl}/v1/user/${userId}/dashboard`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { elements: DashboardElement[] } = await response.json();
    return data;
};

const getModuleDashboard = async (userId: number, moduleId: number) => {
    const url = `${apiBaseUrl}/v1/user/${userId}/dashboard/module/${moduleId}`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { elements: DashboardElement[] } = await response.json();
    return data;
};

const getUserProfile = async (userId: number) => {
    const url = `${apiBaseUrl}/v1/user/${userId}/profile`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data as UserProfile;
};

const getUserSubscriptions = async (userId: number) => {
    const url = `${apiBaseUrl}/v1/user/${userId}/subscriptions`;
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: Subscription[] = await response.json();
    return data;
}

export default { getHomeDashboard, getModuleDashboard, getUserProfile, getUserSubscriptions };
