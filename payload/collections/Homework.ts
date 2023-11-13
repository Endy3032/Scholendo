import type { CollectionConfig } from "payload/types"

const Homework: CollectionConfig = {
	slug: "homework",
	fields: [
		{
			name: "subject",
			type: "relationship",
			relationTo: "subjects",
		},
		{
			name: "deadline",
			type: "date",
		},
		{
			name: "type",
			type: "select",
			options: ["BTVN", "TX - HS1", "GK - HS2"],
		},
		{
			name: "description",
			type: "textarea",
		},
		{
			name: "notes",
			type: "textarea",
		},
		{
			name: "details",
			type: "richText",
		},
	],
}

export default Homework
