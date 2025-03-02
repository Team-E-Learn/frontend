import allowedDomains from "../../shared/allowedDomains.json" with { type: "json" };
import { apiBaseUrl } from "../../shared/constants";

// Utility function to hash a string using SHA-256.
export const hashData = async (data: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  } catch (error) {
    throw new Error(
      `Error while hashing data: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

// Validates the email format using a regular expression and checks if the domain is allowed.
export const isValidEmail = (email: string): boolean => {
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

// Function to handle user login (simulated without a backend).
export const handleLogin = async (
  email: string,
  password: string,
): Promise<{
  ok: boolean;
  message?: string;
  token?: string;
  requires2FA?: boolean;
}> => {
  if (!email || !password) {
    return { ok: false, message: "Please provide both email and password." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "Invalid email format or domain." };
  }

  if (password.length > 64) {
    return { ok: false, message: "Password must not exceed 64 characters." };
  }

  const url = new URL(`${apiBaseUrl}/v1/auth/login`);
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`invalid credentials!`);
    }

    const data = await response.json();

    return {
      ok: true,
      token: data.limited_jwt,
      requires2FA: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
};

