import { apiBaseUrl } from "../shared/constants";
import type {
    LoginResponse,
    RegisterResponse,
    Verify2faResponse,
} from "./types";

const verify2fa = async (limitedJWT: string, code: string) => {
    const url = `${apiBaseUrl}/v1/auth/2fa`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            "Limited JWT": limitedJWT,
            code: code,
        }),
    });
    if (!response.ok) {
        throw new Error(`an error occurred`);
    }

    const body: Verify2faResponse = await response.json();
    if (body.message == "Unauthorized") {
        throw new Error("unauthorized code");
    }
    return body;
};

const requestEmailVerificationCode = async (email: string) => {
    const url = `${apiBaseUrl}/v1/auth/email`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            email,
        }),
    });
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
};

const login = async (email: string, password: string) => {
    const url = `${apiBaseUrl}/v1/auth/login`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            email,
            password,
        }),
    });
    if (!response.ok) {
        throw new Error("invalid credentials");
    }
    const data: LoginResponse = await response.json();
    return data;
};

const register = async (email: string, username: string, password: string) => {
    const url = `${apiBaseUrl}/v1/auth/register`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            email,
            username,
            password,
        }),
    });
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }

    const data: RegisterResponse = await response.json();
    return data;
};

const checkUsernameExists = async (username: string) => {
    const url = new URL(`${apiBaseUrl}/v1/auth/username`);
    url.searchParams.append("username", username);

    const response = await fetch(url, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("an error occurred");
    }

    const data: { message: string } = await response.json();
    return data.message === "Username exists";
};

const verifyEmail = async (email: string, token: string) => {
    const url = `${apiBaseUrl}/v1/auth/verify-email`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            email,
            token,
        }),
    });
    if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
    }
};

export default {
    verify2fa,
    requestEmailVerificationCode,
    login,
    register,
    checkUsernameExists,
    verifyEmail,
};
