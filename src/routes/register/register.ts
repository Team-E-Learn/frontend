<<<<<<< HEAD
import allowedDomains from "../../shared/allowedDomains.json" with { type: "json" };
import { apiBaseUrl } from "../../shared/constants";

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
      message: "Username length too short. Must be at least 5 characters.",
    };
  }
  if (username.length > 15) {
    return {
      isValid: false,
      message: "Username length too long. Must be no more than 15 characters.",
    };
  }
  if (!usernamePattern.test(username)) {
    return {
      isValid: false,
      message:
        "Invalid username. Only alphanumeric characters and underscores are allowed.",
    };
  }

  const isTaken = await checkUsernameInDatabase(username);
  if (isTaken) {
    return {
      isValid: false,
      message: "Username already taken. Please choose another one.",
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

// Simulate a database check for the username
const checkUsernameInDatabase = async (username: string): Promise<boolean> => {
  const url = new URL(`${apiBaseUrl}/v1/auth/username`);
  url.searchParams.append("username", username);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`http error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.message !== "Valid username";
};

export const register = async (
  email: string,
  username: string,
  password: string,
): Promise<{
  ok: boolean;
  message?: string;
  token?: string;
}> => {
  const url = new URL(`${apiBaseUrl}/v1/auth/register`);
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`http error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      ok: true,
      token: data.token,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "An error occurered",
    };
  }
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
=======
import allowedDomains from '../../shared/allowedDomains.json' with { type: "json" };

const extractDomain = (email: string): string => {
  return email.split('@')[1]; 
};

// Validates the email format using a regular expression and checks if the domain is allowed.
export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  if (!emailPattern.test(email)) {
    return false; 
  }

  const domain = extractDomain(email); 
  return allowedDomains.allowedDomains.includes(domain); 
};

export const handleContinue = (email: string): { isValid: boolean; message: string } => {
  const isValid = validateEmail(email);
  return {
    isValid,
    message: isValid ? "" : "Invalid email...", 
  };
};
>>>>>>> development
