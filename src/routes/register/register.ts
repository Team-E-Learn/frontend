import authService from "../../services/authService";
import allowedDomains from "../../shared/allowedDomains.json" with { type: "json" };

// Extract domain from email
const extractDomain = (email: string): string => {
    return email.substring(email.lastIndexOf("@") + 1);
};

// Validates the email format using a regular expression and checks if the domain is allowed.
export const validateEmail = (
    email: string,
): { isValid: boolean; message: string } => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return { isValid: false, message: "Invalid email format." };
    }

    const domain = extractDomain(email);
    if (!allowedDomains.allowedDomains.includes(domain)) {
        return { isValid: false, message: "Invalid email domain." };
    }

    return { isValid: true, message: "" };
};

// Validates the username format and checks if it is already taken.
export const validateUsername = async (
    username: string,
): Promise<{ isValid: boolean; message: string }> => {
    const usernamePattern = /^[a-zA-Z0-9_]{5,15}$/;
    if (username.length < 5) {
        return {
            isValid: false,
            message:
                "Username length too short. Must be at least 5 characters.",
        };
    }
    if (username.length > 15) {
        return {
            isValid: false,
            message:
                "Username length too long. Must be no more than 15 characters.",
        };
    }
    if (!usernamePattern.test(username)) {
        return {
            isValid: false,
            message:
                "Invalid username. Only alphanumeric characters and underscores are allowed.",
        };
    }

    try {
        const isTaken = await authService.checkUsernameExists(username);
        if (isTaken) {
            return {
                isValid: false,
                message: "Username already taken. Please choose another one.",
            };
        }
    } catch (error) {
        return {
            isValid: false,
            message: (error as Error).message,
        };
    }

    return {
        isValid: true,
        message: "",
    };
};

// Validates the password format and checks if the password and confirm password match.
export const validatePassword = (
    password: string,
    confirmPassword: string,
): { isValid: boolean; message: string } => {
    const passwordPattern = /^(?=.*[@$!%*?&])[^\s]{8,}$/;
    if (!passwordPattern.test(password)) {
        return {
            isValid: false,
            message:
                "Password must be at least 8 characters, contain one special character, and have no spaces.",
        };
    }
    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: "Passwords do not match.",
        };
    }

    return {
        isValid: true,
        message: "",
    };
};

// Handles the continue action for email validation
export const handleContinue = (
    email: string,
): { isValid: boolean; message: string } => {
    const isValid = validateEmail(email).isValid;
    return {
        isValid,
        message: isValid ? "" : "Invalid email...",
    };
};
