import type { User } from "payload/generated-types"
import type { FieldHook } from "payload/types"

export const ensureFirstUserIsAdmin: FieldHook<User, any[]> = async ({ req, value }) => {
	const users = await req.payload.find({ collection: "users", where: { roles: { contains: "admin" } } })
	if (users.totalDocs === 0 && !(value || []).includes("admin")) return [...(value || []), "admin"]

	return value || []
}
