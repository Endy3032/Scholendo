import type { User } from "payload/generated-types"
import { CollectionConfig } from "payload/types"
import { admins, adminsOrSameUser, anyone } from "./access"
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin"

export const checkRoles = (roles: NonNullable<User["roles"]> = [], user?: User | null) =>
	roles.some(role => user?.roles?.includes(role))

const Users: CollectionConfig = {
	auth: {
		// verify: {
		// 	generateEmailSubject: () => `Verify your email - CTin2225`,
		// 	generateEmailHTML: ({ token, user }: { token: string; user: User }) => {
		// 		const url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`
		// 		return `Hey ${user.name}, click <a href="${url}">here</a> to verify your email!`
		// 	},
		// },
	},
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
		readVersions: adminsOrSameUser,
		unlock: admins,
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
			defaultValue: ["student"],
			options: [
				{
					label: "Admin",
					value: "admin",
				},
				{
					label: "Staff",
					value: "staff",
				},
				{
					label: "LPKL",
					value: "lpkl",
				},
				{
					label: "LPHT",
					value: "lpht",
				},
				{
					label: "LPĐS",
					value: "lpds",
				},
				{
					label: "LPPT",
					value: "lppt",
				},
				{
					label: "Tổ Trưởng",
					value: "groupLeader",
				},
				{
					label: "Student",
					value: "student",
				},
			],
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
			options: [
				{
					label: "Hoá Học",
					value: "chemistry",
				},
				{
					label: "GDKT-PL",
					value: "legals",
				},
				{
					label: "Địa Lý",
					value: "geography",
				},
				{
					label: "Âm Nhạc",
					value: "music",
				},
				{
					label: "Mỹ Thuật",
					value: "art",
				},
			],
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
