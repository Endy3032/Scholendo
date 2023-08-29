import type { User } from "@/payload-types"
import { CollectionConfig } from "payload/types"
import { admins, adminsOrSameUser, anyone } from "./access"
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin"

export const checkRoles = (roles: User["roles"] = [], user?: User) => roles.some(role => user?.roles?.includes(role))

const Users: CollectionConfig = {
	auth: true,
	slug: "users",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "email"],
	},
	access: {
		read: anyone,
		create: admins,
		update: adminsOrSameUser,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "roles",
			type: "select",
			hasMany: true,
			saveToJWT: true,
			hooks: {
				beforeChange: [ensureFirstUserIsAdmin],
			},
			defaultValue: ["user"],
			options: [
				{
					label: "admin",
					value: "admin",
				},
				{
					label: "user",
					value: "user",
				},
			],
			access: {
				read: admins,
				create: admins,
				update: admins,
			},
		},
	],
	timestamps: true,
}

export default Users
