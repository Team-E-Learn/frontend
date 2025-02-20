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