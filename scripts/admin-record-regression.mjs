import assert from "node:assert/strict"

import { prepareAdminRecordSave } from "../lib/admin-record.ts"

const existing = prepareAdminRecordSave(
  {
    _id: "organization-id",
    slug: "interfaith-forcefield",
    name: "Interfaith Forcefield",
    organizationRole: "Managing",
    kind: "Partner",
    tier: "Strategic",
    description: "Updated description",
    websiteUrl: "https://interfaithstrength.com/",
    order: 2,
    status: "Published",
  },
  [
    "slug",
    "name",
    "organizationRole",
    "description",
    "websiteUrl",
    "order",
    "status",
  ],
  "organization-id"
)

assert.deepEqual(existing, {
  id: "organization-id",
  slug: "interfaith-forcefield",
  name: "Interfaith Forcefield",
  organizationRole: "managing",
  kind: "partner",
  tier: "strategic",
  description: "Updated description",
  websiteUrl: "https://interfaithstrength.com/",
  order: 2,
  status: "published",
})

const starter = prepareAdminRecordSave(
  {
    _id: "starter:organizing",
    _starter: true,
    name: "Bureau of Human Rights and Justice",
    organizationRole: "Organizing",
    kind: "Partner",
    tier: "Strategic",
    status: "Draft",
  },
  ["name", "organizationRole", "status"],
  "starter:organizing"
)

assert.equal("id" in starter, false)
assert.equal(starter.organizationRole, "organizing")
assert.equal(starter.status, "draft")

console.log("Admin record regression checks passed.")
