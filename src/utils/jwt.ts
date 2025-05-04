import { create, Header, Payload } from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const SECRET_KEY = "your_secret_key"; // The key must be handled correctly (convert to CryptoKey)

export const createJWT = async (userId: number): Promise<string> => {
  const payload: Payload = {
    sub: userId.toString(), // 'sub' must be a string
    exp: new Date().getTime() + 3600 * 1000, // Expiration time (1 hour)
  };

  const header: Header = {
    alg: "HS256",  // Algorithm for signing the token
    typ: "JWT",    // Type of the token
  };

  // Convert the SECRET_KEY to CryptoKey for HS256 algorithm
  const encoder = new TextEncoder();
  const secretKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(SECRET_KEY),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  // creation the JWT token using the secret key
  const token = await create(header, payload, secretKey);  // 'create' now returns a Promise<string>

  return token;
};
