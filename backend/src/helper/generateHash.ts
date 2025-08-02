import { createHash, randomBytes } from "crypto";

export function encode(url: string): string {
  // Create a buffer of random bytes instance
  const buffer: Buffer = randomBytes(10);

  // Convert random bytes buffer to base64 string
  const randomString = buffer.toString("base64url");

  // Generate hash appending random bytes to url
  const hash: string = createHash("sha256")
    .update(url.concat(randomString))
    .digest("base64url");

  // Return hash
  return hash.slice(0, 8);
}
