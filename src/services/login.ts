
import { allowedDomains } from '../../src/shared/allowedDomains.json';

export const handleLogin = (email: string, password: string) => {
    // Validate email using regex format (https://emailregex.com/)
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    // Check if email and password are provided
    if (!email || !password) {
      return { success: false, message: "Please fill in all fields!" };
    }
  
    // Validate the email format
    if (!isValidEmail(email)) {
      return { success: false, message: "Please enter a valid email address!" };
    }

    // Search list of valid domains from allowedDomains JSON
    const emailDomain = email.split("@")[1];
    if (!allowedDomains.includes(emailDomain)) {
        return {
        success: false,
        message: "Only emails from trusted domains are allowed!"
        };
    }
    
    //Validate password character length 
    if (password.length > 64) {
        return {
          success: false,
          message: "Password cannot exceed 64 characters!",
        };
    }
  
    // Placeholder for actual login logic (e.g., API call or database query)
    if (email === "test@example.com" && password === "password123") {
      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Invalid credentials." };
    }
  };
  