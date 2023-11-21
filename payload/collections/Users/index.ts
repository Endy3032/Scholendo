import { CollectionConfig } from "payload/types"
import { admins, adminsOrSameUser, anyone, staffs } from "./access"
import { ensureFirstUserIsAdmin } from "./hooks"

export const subjects = ["Arts", "Chemistry", "Economics and Law", "Geography", "Music"] as const
export const languages = ["Chinese", "French", "Japanese"] as const
export const sports = ["Aerobics", "Air Volleyball", "Basketball", "Martial Arts"] as const

const Users: CollectionConfig = {
	auth: true,
	slug: "users",
	admin: {
		useAsTitle: "name",
		defaultColumns: ["name", "email", "roles"],
	},
	access: {
		create: anyone,
		read: anyone,
		update: adminsOrSameUser,
		delete: adminsOrSameUser,
		unlock: admins,
		admin: staffs,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "email",
			type: "email",
			required: true,
			unique: true,
			index: true,
		},
		{
			name: "username",
			type: "text",
			required: false,
		},
		{
			name: "roles",
			type: "select",
			index: true,
			hasMany: true,
			saveToJWT: true,
			hooks: {
				beforeChange: [ensureFirstUserIsAdmin],
			},
			defaultValue: ["Student"],
			options: ["Admin", "Site Staff", "Class Moderator", "Student"],
			access: {
				read: anyone,
				create: admins,
				update: admins,
			},
		},
		{
			name: "dateOfBirth",
			type: "date",
		},
		{
			name: "subject",
			type: "select",
			options: [...subjects],
		},
		{
			name: "language",
			type: "select",
			options: [...languages],
		},
		{
			name: "sports",
			type: "select",
			options: [...sports],
		},
		{
			name: "verified",
			type: "checkbox",
			hidden: true,
		},
		{
			name: "verificationToken",
			type: "text",
			hidden: true,
		},
	],
	timestamps: true,
}

export default Users
