import type { CollectionConfig } from "payload/types"

const Subjects: CollectionConfig = {
	slug: "subjects",
	fields: [
		{
			name: "subject",
			type: "text",
		},
		{
			name: "teacher",
			type: "text",
		},
	],
}

export default Subjects
