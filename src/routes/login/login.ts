/**
 * Utility function to hash a string using SHA-256.
 * This is used for securely hashing sensitive data such as passwords.
 *
 * @param data - The input data to hash.
 * @returns A promise that resolves to a hexadecimal string of the hashed data.
 */
export const hashData = async (data: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data); // New TextEncoder instance to encode the string data into a byte array
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer); // Hash byte array of bytes 
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert hashed buffer into regular array of bytes
      
      // Map each byte of the array to a hexadecimal string and join them to form the final hash
      return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    } catch (error) {
      throw new Error(`Error while hashing data: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  
  /**
   * Validates the email format using a regular expression.
   * This regex checks for a valid email format (e.g., user@example.com).
   *
   * @param email - The email to validate.
   * @returns A boolean indicating whether the email format is valid.
   */
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  /**
   * Function to handle user login by hashing credentials and sending them to the backend API.
   *
   * @param email - The user's email address.
   * @param password - The user's password.
   * @returns A promise that resolves to the response from the backend API.
   */
  export const handleLogin = async (email: string, password: string): Promise<Response> => {
    // Validate email format
    if (!isValidEmail(email)) {
      throw new Error('Please provide a valid email address.');
    }
  
    // Validate password length (max 64 characters)
    if (password.length > 64) {
      throw new Error('Password must not exceed 64 characters.');
    }
  
    // Input validation: Ensure that email and password are provided
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }
  
    try {
      // Hash both email and password using the utility function
      const [hashedEmail, hashedPassword] = await Promise.all([
        hashData(email),
        hashData(password),
      ]);
  
      console.debug('Hashed Email:', hashedEmail);
      console.debug('Hashed Password:', hashedPassword);
  
      // Sending hashed credentials to the backend API for authentication (Swagger Implementation Here)
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sent as JSON dummy data
        },
        body: JSON.stringify({ email: hashedEmail, password: hashedPassword }),
      });
  
      // Handle non-OK HTTP responses
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.error || 'Login failed. Please check your credentials.';
        throw new Error(errorMessage);
      }
  
      return response;
    } catch (error) {
      // Handle any errors during the process and rethrow with a custom message
      throw new Error(`Login failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  };
  