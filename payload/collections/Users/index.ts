import { CollectionConfig } from "payload/types"
import { admins, adminsOrSameUser, anyone, staffs } from "./access"
import { ensureFirstUserIsAdmin } from "./hooks"

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
			name: "roles",
			type: "select",
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
			options: ["Chemistry", "Geography", "Music", "Arts", "Economics and Law"],
		},
		{
			name: "language",
			type: "select",
			options: ["Chinese", "Japanese", "French"],
		},
		{
			name: "sports",
			type: "select",
			options: ["Aerobics", "Air Volleyball", "Basketball", "Martial Arts"],
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
