import { spawnSync } from "node:child_process"
import { readFileSync } from "node:fs"

const [scope, ...convexArgs] = process.argv.slice(2)
const allowedScopes = new Set(["development", "production"])

if (!allowedScopes.has(scope) || convexArgs.length === 0) {
  console.error(
    "Usage: node scripts/convex-key.mjs <development|production> <convex command...>"
  )
  process.exit(1)
}

const envFile = `.env.convex.${scope}`
let source

try {
  source = readFileSync(envFile, "utf8")
} catch {
  console.error(
    `Missing ${envFile}. Create a deployment-scoped key before running this command.`
  )
  process.exit(1)
}

const keyLine = source
  .split(/\r?\n/)
  .find((line) => line.startsWith("CONVEX_DEPLOY_KEY="))
const deployKey = keyLine?.slice("CONVEX_DEPLOY_KEY=".length).trim()

if (!deployKey) {
  console.error(`CONVEX_DEPLOY_KEY is missing from ${envFile}.`)
  process.exit(1)
}

const result = spawnSync("bunx", ["convex", ...convexArgs], {
  cwd: process.cwd(),
  env: {
    ...process.env,
    CONVEX_DEPLOY_KEY: deployKey,
  },
  stdio: "inherit",
})

if (result.error) {
  console.error(result.error.message)
  process.exit(1)
}

process.exit(result.status ?? 1)
