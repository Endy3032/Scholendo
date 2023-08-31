import type { CollectionConfig } from "payload/types"

const Activites: CollectionConfig = {
	slug: "activities",
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
		},
		{
			name: "date",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayAndTime",
					timeIntervals: 15,
				},
			},
		},
		{
			name: "endDate",
			type: "date",
			required: false,
			admin: {
				date: {
					pickerAppearance: "dayAndTime",
					timeIntervals: 15,
				},
			},
		},
		{
			name: "info",
			type: "text",
			required: false,
		},
		{
			name: "details",
			type: "richText",
			required: false,
		},
	],
	admin: {
		useAsTitle: "name",
	},
}

export default Activites
