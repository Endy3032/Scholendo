import path from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { HTMLConverterFeature, lexicalEditor } from "@payloadcms/richtext-lexical"
import { buildConfig } from "payload"

import { Assignments } from "./collections/Assignments"
import { Exams } from "./collections/Exams"
import { Media } from "./collections/Media"
import { Subjects } from "./collections/Subjects"
import { Tags } from "./collections/Tags"
import { Teachers } from "./collections/Teachers"
import { Timetable } from "./collections/Timetable"
import { Users } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	collections: [Users, Teachers, Subjects, Timetable, Assignments, Exams, Tags, Media],
	editor: lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})] }),
	secret: process.env.PAYLOAD_SECRET || "",
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	admin: {
		user: Users.slug,
		avatar: "default",
		dateFormat: "dd/MM/yyyy",
	},
	db: mongooseAdapter({
		url: process.env.DATABASE_URI ?? "",
		connectOptions: {
			cert: process.env.DATABASE_CERT,
			key: process.env.DATABASE_KEY,
		},
	}),
	// email: nodemailerAdapter({
	// 	defaultFromAddress: process.env.SMTP_FROM_ADDRESS ?? "",
	// 	defaultFromName: process.env.SMTP_FROM_NAME ?? "",
	// 	transportOptions: {
	// 		host: process.env.SMTP_HOST ?? "",
	// 		port: parseInt(process.env.SMTP_PORT ?? "587"),
	// 		auth: {
	// 			user: process.env.SMTP_USER ?? "",
	// 			pass: process.env.SMTP_PASS ?? "",
	// 		},
	// 	},
	// }),
})
