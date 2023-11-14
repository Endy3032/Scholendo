import type { CollectionConfig } from "payload/types"

const Subjects: CollectionConfig = {
	slug: "subjects",
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "teacher",
			type: "text",
		},
	],
	admin: { useAsTitle: "name" },
}

export default Subjects
