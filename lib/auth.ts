import { SignJWT, jwtVerify } from "jose";

// In production, you would ideally use process.env.JWT_SECRET
const SECRET_KEY = "dorbar_super_secret_jwt_key_2026";
const key = new TextEncoder().encode(SECRET_KEY);

export async function signToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Token is valid for 24 hours
    .sign(key);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    return null;
  }
}
