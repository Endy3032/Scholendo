import type { User } from "@/payload-types"
import type { Access, AccessArgs } from "payload/config"
import { checkRoles } from "."

type UserAccess = (args: AccessArgs<any, User>) => boolean

export const anyone: UserAccess = () => true
export const admins: UserAccess = ({ req: { user } }) => checkRoles(["admin"], user)
export const adminsOrSameUser: UserAccess = ({ req: { user }, id }) => checkRoles(["admin"], user) || user.id === id
