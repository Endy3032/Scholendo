import type { CollectionConfig } from "payload"

export const Teachers: CollectionConfig = {
	slug: "teachers",
	admin: { useAsTitle: "name" },
	fields: [
		{
			type: "row",
			fields: [
				{
					name: "title",
					type: "select",
					options: ["Mr.", "Ms."],
					required: true,
					admin: {
						width: "50%",
					},
				},
				{
					name: "name",
					type: "text",
					required: true,
					admin: {
						width: "50%",
					},
				},
			],
		},
		{
			type: "row",
			fields: [
				{
					name: "phone",
					type: "text",
				},
				{
					name: "email",
					type: "email",
				},
			],
		},
	],
}
