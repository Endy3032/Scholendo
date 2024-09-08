import { CollectionConfig, Field } from "payload"

const periods: Field[] = [1, 2, 3, 4, 5].map(period => ({
	name: `period_${period}`,
	label: `Period ${period}`,
	type: "relationship",
	relationTo: "subjects",
}))

const timetableFields: Field[] = [
	{
		name: "morning",
		type: "group",
		fields: [
			{
				type: "row",
				fields: periods,
			},
		],
	},
	{
		name: "afternoon",
		type: "group",
		fields: [
			{
				type: "row",
				fields: periods.slice(0, 4),
			},
		],
	},
]

export const Timetable: CollectionConfig = {
	slug: "timetable",
	labels: {
		singular: "Timetable",
		plural: "Timetable",
	},
	admin: {
		useAsTitle: "applicationDate",
	},
	fields: [
		{
			name: "applicationDate",
			type: "date",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					name: "monday",
					fields: timetableFields,
				},
				{
					name: "tuesday",
					fields: timetableFields,
				},
				{
					name: "wednesday",
					fields: [timetableFields[0]],
				},
				{
					name: "thursday",
					fields: timetableFields,
				},
				{
					name: "friday",
					fields: timetableFields,
				},
			],
		},
	],
}
