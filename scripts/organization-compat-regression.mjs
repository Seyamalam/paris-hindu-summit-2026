import assert from "node:assert/strict"

import {
  ensureLeadershipRecords,
  isLegacyOrganizationRoleError,
  omitOrganizationRole,
  resolveOrganizationRole,
} from "../lib/organization-compat.ts"

const productionSupportingRows = [
  { _id:"support-1", slug:"diaspora-organisations", name:"Hindu Kalyan Forum" },
]
const leadership = ensureLeadershipRecords(productionSupportingRows)

assert.deepEqual(
  leadership.map((row) => resolveOrganizationRole(row)),
  ["supporting", "organizing", "managing"]
)
assert.equal(leadership.filter((row) => "_starter" in row).length, 2)

const storedLeadership = ensureLeadershipRecords([
  ...productionSupportingRows,
  { _id:"bhrj", slug:"bureau-human-rights-justice", name:"Renamed BHRJ" },
  { _id:"forcefield", slug:"interfaith-forcefield", name:"Renamed Forcefield" },
])
assert.equal(storedLeadership.filter((row) => "_starter" in row).length, 0)

const validatorError = new Error(
  "Object contains extra field organizationRole that is not in the validator."
)
assert.equal(isLegacyOrganizationRoleError(validatorError), true)
assert.deepEqual(
  omitOrganizationRole({ name:"BHRJ", organizationRole:"organizing" }),
  { name:"BHRJ" }
)

console.log("organization compatibility regression: pass")
