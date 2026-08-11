export type OrganizationRole = "organizing" | "managing" | "supporting"

export type OrganizationIdentity = {
  name: string
  slug?: string
  organizationRole?: OrganizationRole
}

export type LeadershipStarter = {
  _id: string
  _starter: true
  slug: string
  name: string
  organizationRole: "organizing" | "managing"
  kind: "partner"
  tier: "strategic"
  description: string
  websiteUrl: string
  logoStorageId: undefined
  order: number
  status: "published"
}

const leadershipStarters: LeadershipStarter[] = [
  {
    _id:"starter:organizing",
    _starter:true,
    slug:"bureau-human-rights-justice",
    name:"Bureau of Human Rights and Justice",
    organizationRole:"organizing",
    kind:"partner",
    tier:"strategic",
    description:"The France-based Bureau of Human Rights and Justice leads the Paris Hindu Summit 2026. Its work advances human rights, humanitarian relief, sustainable agriculture, and long-term resilience in vulnerable communities.",
    websiteUrl:"https://www.bhrj.org/",
    logoStorageId:undefined,
    order:1,
    status:"published",
  },
  {
    _id:"starter:managing",
    _starter:true,
    slug:"interfaith-forcefield",
    name:"Interfaith Forcefield",
    organizationRole:"managing",
    kind:"partner",
    tier:"strategic",
    description:"The US-registered Interfaith Forcefield manages conference coordination and delivery, bringing an interfaith human-rights perspective to the summit's programme and operations.",
    websiteUrl:"",
    logoStorageId:undefined,
    order:2,
    status:"published",
  },
]

export function resolveOrganizationRole(
  organization: OrganizationIdentity
): OrganizationRole {
  if (organization.organizationRole) return organization.organizationRole
  const normalized = organization.name.toLowerCase()
  const slug = organization.slug?.toLowerCase() ?? ""
  if (
    normalized.includes("bureau of human rights and justice") ||
    slug.includes("bureau-human-rights-justice")
  ) return "organizing"
  if (
    normalized.includes("forcefield") ||
    slug.includes("interfaith-forcefield")
  ) return "managing"
  return "supporting"
}

export function ensureLeadershipRecords<T extends OrganizationIdentity>(
  rows: T[]
): Array<T | LeadershipStarter> {
  const normalizedRows = rows.map((row) => ({
    ...row,
    organizationRole:resolveOrganizationRole(row),
  }))
  const roles = new Set(normalizedRows.map((row) => row.organizationRole))
  return [
    ...normalizedRows,
    ...leadershipStarters.filter((starter) => !roles.has(starter.organizationRole)),
  ]
}

export function isLegacyOrganizationRoleError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  return (
    message.includes("organizationRole") &&
    (message.includes("extra field") || message.includes("not in the validator"))
  )
}

export function omitOrganizationRole<T extends { organizationRole?: unknown }>(
  args: T
): Omit<T, "organizationRole"> {
  const { organizationRole: _organizationRole, ...legacyArgs } = args
  void _organizationRole
  return legacyArgs
}
