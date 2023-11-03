import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload/config"
import Activites from "./collections/Activities"
import Categories from "./collections/Categories"
import Users from "./collections/Users"

export default buildConfig({
	collections: [
		Activites,
		Categories,
		Users,
	],
	db: mongooseAdapter({ url: process.env.MONGODB_URI || false }),
	editor: lexicalEditor({}),
	email: {
		fromAddress: "ctin2225@resend.dev",
		fromName: "CTin2225",
		transportOptions: {
			host: "smtp.resend.com",
			secure: true,
			port: 465,
			auth: {
				user: "resend",
				pass: process.env.RESEND_API_KEY,
			},
		},
	},
	typescript: {
		outputFile: path.resolve(__dirname, "./payload-types.ts"),
	},
})
