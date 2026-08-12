const normalizedRecordFields = new Set([
  "status",
  "kind",
  "tier",
  "organizationRole",
])

export function prepareAdminRecordSave(
  draft: Record<string, unknown>,
  fields: string[],
  selected: string
) {
  const { _id, _starter: _starterRecord, ...value } = draft
  void _starterRecord

  if (!fields.includes("name")) delete value.name

  for (const field of normalizedRecordFields) {
    const fieldValue = value[field]
    if (typeof fieldValue === "string") {
      value[field] = fieldValue.trim().toLowerCase()
    }
  }

  return {
    ...(selected === "new" || draft._starter ? {} : { id: _id }),
    ...value,
  }
}
