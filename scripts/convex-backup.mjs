import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { spawnSync } from "node:child_process"

const scope = process.argv[2] ?? "production"

if (scope !== "production" && scope !== "development") {
  console.error("Usage: node scripts/convex-backup.mjs <production|development>")
  process.exit(1)
}

const timestamp = new Date().toISOString().replaceAll(":", "-")
const backupRoot =
  process.env.CONVEX_BACKUP_DIR ??
  resolve(process.cwd(), "..", "..", "convex-backups", "automatic")
const backupDirectory = resolve(backupRoot, timestamp)
const snapshotPath = resolve(
  backupDirectory,
  `${scope}-${timestamp}.zip`
)

mkdirSync(backupDirectory, { recursive: true })

const exportResult = spawnSync(
  process.execPath,
  [
    "scripts/convex-key.mjs",
    scope,
    "export",
    "--include-file-storage",
    "--path",
    snapshotPath,
  ],
  {
    cwd: process.cwd(),
    env: process.env,
    stdio: "inherit",
  }
)

if (exportResult.status !== 0) {
  process.exit(exportResult.status ?? 1)
}

const checksum = createHash("sha256")
  .update(readFileSync(snapshotPath))
  .digest("hex")
const checksumPath = `${snapshotPath}.sha256`

writeFileSync(
  checksumPath,
  `${checksum}  ${snapshotPath.split("/").at(-1)}\n`,
  "utf8"
)

console.log(`Verified ${scope} snapshot: ${snapshotPath}`)
console.log(`SHA-256: ${checksum}`)
