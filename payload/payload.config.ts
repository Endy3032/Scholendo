import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload/config"
import Activites from "./collections/Activities"
import Categories from "./collections/Categories"
import Exams from "./collections/Exams"
import Homework from "./collections/Homework"
import Subjects from "./collections/Subjects"
import Timetable from "./collections/Timetable"
import Users from "./collections/Users"

export default buildConfig({
	collections: [
		Activites,
		Categories,
		Exams,
		Homework,
		Subjects,
		Timetable,
		Users,
	],
	db: mongooseAdapter({ url: process.env.MONGODB_URI || false }),
	editor: lexicalEditor({}),
	email: {
		fromAddress: "ctin2225@icloud.com",
		fromName: "CTin2225",
		transportOptions: {
			host: "smtp.mail.me.com",
			secure: false,
			requireTLS: false,
			port: 587,
			auth: {
				user: "endy3032@icloud.com",
				pass: process.env.ICLOUD_SMTP_AUTH,
			},
		},
	},
	typescript: {
		outputFile: path.resolve(__dirname, "./payload-types.ts"),
	},
})
