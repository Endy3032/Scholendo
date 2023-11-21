import type { CollectionConfig } from "payload/types"

const Exams: CollectionConfig = {
	slug: "exams",
	admin: { useAsTitle: "name" },
	fields: [
		{
			name: "subject",
			type: "relationship",
			relationTo: "subjects",
			required: true,
		},
		{
			name: "date",
			type: "date",
			index: true,
			required: true,
		},
		{
			name: "type",
			type: "select",
			options: ["TX - HS1", "GK - HS2", "CK - HS3"],
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

export default Exams
