import type { CollectionConfig } from "payload/types"

const Homework: CollectionConfig = {
	slug: "homework",
	admin: { useAsTitle: "name" },
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "subject",
			type: "relationship",
			relationTo: "subjects",
			required: true,
		},
		{
			name: "deadline",
			type: "date",
			index: true,
			required: true,
		},
		{
			name: "type",
			type: "select",
			options: ["BTVN", "TX - HS1", "GK - HS2"],
			required: true,
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
