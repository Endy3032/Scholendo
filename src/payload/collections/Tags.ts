import type { CollectionConfig } from "payload"
import { anyone, staffs } from "./Users"

export const Tags: CollectionConfig = {
	slug: "tags",
	admin: { useAsTitle: "name" },
	access: {
		read: anyone,
		create: staffs,
		delete: staffs,
		update: staffs,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "importance",
			type: "select",
			options: ["None", "Low", "Medium", "High"],
			defaultValue: "None",
			required: true,
		},
	],
}
