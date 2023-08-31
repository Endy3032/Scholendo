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
	globals: [
		// Your globals here
	],
	typescript: {
		outputFile: path.resolve(__dirname, "./payload-types.ts"),
	},
})
