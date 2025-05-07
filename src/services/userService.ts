import { apiBaseUrl } from "../shared/constants";
import type { DashboardElement, Subscription, UserProfile } from "./types";

// makes a GET request to the endpoint at /v1/user/{userId}/dashboard
// returns the dashboard elements if successful
// throws an error otherwise
const getHomeDashboard = async (userId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }

    const url = `${apiBaseUrl}/v1/user/${userId}/dashboard`;
    const response = await fetch(url, { 
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { elements: DashboardElement[] } = await response.json();
    return data;
};

// makes a GET request to the endpoint at /v1/user/{userId}/dashboard/module/{moduleId}
// returns the dashboard elements if successful
// throws an error otherwise
const getModuleDashboard = async (userId: number, moduleId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }

    const url = `${apiBaseUrl}/v1/user/${userId}/dashboard/module/${moduleId}`;
    const response = await fetch(url, { 
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: { elements: DashboardElement[] } = await response.json();
    return data;
};

// makes a GET request to the endpoint at /v1/user/{userId}/profile
// returns the user profile if successful
// throws an error otherwise
const getUserProfile = async (userId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }

    const url = `${apiBaseUrl}/v1/user/${userId}/profile`;
    const response = await fetch(url, { 
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data as UserProfile;
};

// makes a GET request to the endpoint at /v1/user/{userId}/subscriptions
// returns the user's subscriptions if successful
// throws an error otherwise
const getUserSubscriptions = async (userId: number) => {
    const token: string | null = localStorage.getItem("token");
    if (token === null) {
        throw new Error(`an error occurred`);
    }

    const url = `${apiBaseUrl}/v1/user/${userId}/subscriptions`;
    const response = await fetch(url, { 
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }
    const data: Subscription[] = await response.json();
    return data;
}

export default { getHomeDashboard, getModuleDashboard, getUserProfile, getUserSubscriptions };
