import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"

import { Media } from "./collections/Media"
import { Users } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	collections: [Users, Media],
	editor: lexicalEditor(),
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
		url: process.env.DATABASE_URI || "",
		connectOptions: {
			cert: process.env.DATABASE_CERT,
			key: process.env.DATABASE_KEY,
		},
	}),
})
