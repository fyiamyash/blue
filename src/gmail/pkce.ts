import crypto from "node:crypto";
function base64Url(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
export function generateSecretAndHash() {
  const code_verifier = base64Url(crypto.randomBytes(32));
  const code_challenge = base64Url(
    crypto.createHash("sha256").update(code_verifier).digest(),
  );
  return { code_challenge, code_verifier };
}
