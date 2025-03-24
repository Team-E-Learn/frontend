import allowedDomains from "../../shared/allowedDomains.json" with { type: "json" };

// Utility function to hash a string using SHA-256.
export const hashData = async (data: string): Promise<string> => {
    try {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");
    } catch (error) {
        throw new Error(
            `Error while hashing data: ${error instanceof Error ? error.message : String(error)}`,
        );
    }
};

// Validates the email format using a regular expression and checks if the domain is allowed.
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        throw new Error(
            "Invalid email format. Please enter a valid email address.",
        );
    }

    const domain = email.split("@")[1];
    if (!allowedDomains.allowedDomains.includes(domain)) {
        throw new Error("The domain of the email is not allowed.");
    }

    return true;
};

export const validateLogin = (
    email: string,
    password: string,
): {
    ok: boolean;
    message?: string;
} => {
    if (!email || !password) {
        return {
            ok: false,
            message: "Please provide both email and password.",
        };
    }

    try {
        isValidEmail(email);
    } catch (error) {
        return { ok: false, message: (error as Error).message };
    }

    if (password.length > 64) {
        return {
            ok: false,
            message: "Password must not exceed 64 characters.",
        };
    }

    return { ok: true };
};
