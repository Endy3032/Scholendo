import path from "path"
import { buildConfig } from "payload/config"
import Categories from "./collections/Categories"
import Users from "./collections/Users"

export default buildConfig({
	collections: [
		Users,
		Categories,
	],
	globals: [
		// Your globals here
	],
	typescript: {
		outputFile: path.resolve(__dirname, "../payload-types.ts"),
	},
})
