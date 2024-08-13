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
					validate: val => {
						if (!/^\p{RGI_Emoji}$/v.test(val) && !/[a-z]{2}/.test(val)) {
							return "Enter one valid emoji or two uppercase characters"
						}
						return true
					},
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
			defaultValue: false,
		},
	],
}
