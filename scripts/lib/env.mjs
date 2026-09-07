import { config } from "dotenv";

// Load .env.local first (highest priority), then .env as a fallback.
// Existing process env vars always win.
config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

/**
 * Returns an object containing the given env vars.
 * Throws with a clear, up-front message listing any that are missing.
 */
export function requireEnv(names) {
  const missing = names.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s):\n` +
        missing.map((name) => `  - ${name}`).join("\n") +
        `\nSet them in .env.local (see .env.example).`
    );
  }

  return Object.fromEntries(names.map((name) => [name, process.env[name]]));
}
