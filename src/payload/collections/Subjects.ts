import type { CollectionConfig } from "payload"

export const Subjects: CollectionConfig = {
	slug: "subjects",
	admin: { useAsTitle: "name" },
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
				},
				{
					name: "code",
					type: "text",
				},
			],
		},
		{
			name: "teacher",
			type: "relationship",
			relationTo: "teachers",
		},
		{
			name: "isElective",
			type: "checkbox",
		},
	],
}
