import type { Access } from "payload/config"
import type { User } from "payload/generated-types"
import type { FieldAccess } from "payload/types"

export const checkRoles = (user?: User | null, roles: NonNullable<User["roles"]> = [], mode: "and" | "or" = "or") =>
	mode === "or"
		? roles.some(role => user?.roles?.includes(role))
		: roles.every(role => user?.roles?.includes(role))

type UserCollectionAccess = Access<unknown, User>
type UserFieldAccess = FieldAccess<any, unknown, User>

export const anyone: UserFieldAccess = () => true

export const admins: UserFieldAccess = ({ req: { user } }) => checkRoles(user, ["Admin"])

// admin access control is not typed properly yet
export const staffs = ({ req: { user } }) => checkRoles(user, ["Site Staff", "Admin"])

export const adminsOrSameUser: UserCollectionAccess = ({ req: { user } }) =>
	checkRoles(user, ["Admin"]) || { id: { equals: user?.id } }
