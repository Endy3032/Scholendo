import type { User } from "payload/generated-types"
import type { FieldHook } from "payload/types"

export const ensureFirstUserIsAdmin: FieldHook<User, any[]> = async ({ req, operation, value }) => {
	if (operation !== "create") return value || []

	const users = await req.payload.find({ collection: "users", limit: 0, depth: 0 })
	if (users.totalDocs !== 0) return value || []

	if (!(value || []).includes("admin")) return [...(value || []), "admin"]

	return []
}
