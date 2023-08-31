import type { Access } from "payload/config"
import type { User } from "payload/generated-types"
import type { FieldAccess } from "payload/types"
import { checkRoles } from "."

type UserCollectionAccess = Access<any, User>
export const adminsOrSameUser: UserCollectionAccess = ({ req: { user } }) =>
	checkRoles(["admin"], user) || { id: { equals: user?.id } }

type UserFieldAccess = FieldAccess<any, any, User>
export const anyone: UserFieldAccess = () => true
export const admins: UserFieldAccess = ({ req: { user } }) => checkRoles(["admin"], user)
