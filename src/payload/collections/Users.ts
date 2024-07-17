import { User } from "@payload-types"
import type { CollectionConfig, FieldAccess, FieldHook } from "payload"

const ensureFirstUserIsAdmin: FieldHook<User, any[]> = async ({ req, value, originalDoc }) => {
	value = value || []
	const admins = await req.payload.find({ collection: "users", where: { roles: { contains: "Admin" } } })
	if (!value.includes("Admin") && (admins.totalDocs === 0 || admins.totalDocs === 1 && admins.docs[0].id === originalDoc?.id)) {
		value.push("Admin")
	}

	return value.sort((a, b) => a.localeCompare(b))
}

const checkRoles = (user?: User | null, roles: NonNullable<User["roles"]> = [], mode: "and" | "or" = "or") =>
	mode === "or"
		? roles.some(role => user?.roles?.includes(role))
		: roles.every(role => user?.roles?.includes(role))

type Access = FieldAccess<User>
export const anyone: Access = () => true
export const admins: Access = ({ req: { user } }) => checkRoles(user, ["Admin"])
export const staffs: Access = ({ req: { user } }) => checkRoles(user, ["Staff", "Admin"])
export const adminsOrSameUser: Access = ({ req: { user }, id }) => checkRoles(user, ["Admin"]) || id === user?.id

export const Users: CollectionConfig = {
	slug: "users",
	admin: { useAsTitle: "name" },
	access: {
		read: anyone,
		create: anyone,
		update: adminsOrSameUser,
		delete: adminsOrSameUser,
		unlock: admins,
	},
	auth: true,
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "username",
			type: "text",
			unique: true,
			required: false,
		},
		{
			name: "roles",
			type: "select",
			index: true,
			hasMany: true,
			saveToJWT: true,
			defaultValue: ["Member"],
			options: ["Admin", "Staff", "Member"],
			hooks: {
				beforeChange: [ensureFirstUserIsAdmin],
			},
			access: {
				read: anyone,
				create: admins,
				update: admins,
			},
		},
		{
			name: "dateOfBirth",
			type: "date",
			admin: {
				date: {
					minDate: new Date(2007, 0, 1),
					maxDate: new Date(2007, 11, 31),
				},
			},
		},
		{
			name: "subject",
			type: "select",
			options: ["🌏 Địa", "🧪 Hoá", "⚖️ GDKT-PL", "🎨 Mỹ Thuật", "🎤 Nhạc"],
		},
	],
}
