import { hashSync } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// Use the hashSync function to hash the password
export const hashPassword = (password: string): string => {
  return hashSync(password);
};