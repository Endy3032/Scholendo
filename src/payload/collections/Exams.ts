import { lexicalHTML } from "@payloadcms/richtext-lexical"
import type { CollectionConfig } from "payload"

export const Exams: CollectionConfig = {
	slug: "exams",
	admin: { useAsTitle: "name", defaultColumns: ["subject", "name", "tags", "deadline"] },
	fields: [
		{
			name: "subject",
			type: "relationship",
			relationTo: "subjects",
			required: true,
		},
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "summary",
			type: "text",
		},
		{
			name: "details",
			type: "richText",
		},
		lexicalHTML("details", { name: "formattedDetails" }),
		{
			name: "tags",
			type: "relationship",
			relationTo: "tags",
			hasMany: true,
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "date",
			type: "date",
			index: true,
			required: true,
			admin: {
				position: "sidebar",
				date: {
					pickerAppearance: "dayAndTime",
					displayFormat: "dd/MM/yyyy HH:mm",
					timeFormat: "HH:mm",
					minDate: new Date(),
					maxDate: new Date(2025, 6, 1),
				},
			},
		},
	],
}
