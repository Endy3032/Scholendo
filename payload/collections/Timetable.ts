import type { Timetable } from "payload/generated-types"
import type { ArrayField, CollectionConfig, Validate } from "payload/types"
import Subjects from "./Subjects"

interface PeriodsField extends ArrayField {
	validate: Validate<NonNullable<Timetable["periods"]>, Timetable, Timetable, typeof Timetable["fields"][1]>
}

const Timetable: CollectionConfig = {
	slug: "timetable",
	fields: [
		{
			name: "subject",
			type: "relationship",
			relationTo: Subjects.slug,
			required: true,
			unique: true,
		},
		{
			name: "periods",
			type: "array",
			index: true,
			required: true,
			fields: [
				{
					name: "periodGroup",
					type: "group",
					fields: [
						{
							type: "row",
							required: true,
							fields: [
								{
									name: "day",
									type: "select",
									required: true,
									options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
								},
								{
									name: "session",
									type: "select",
									required: true,
									options: ["Morning", "Afternoon"],
								},
								{
									name: "period",
									type: "select",
									hasMany: true,
									required: true,
									options: ["1", "2", "3", "4", "5"],
								},
							],
						},
					],
				},
			],
			validate: async (val, options) => {
				const { payload } = options
				if (!payload) {
					console.log("Payload not found, skipping client-side validation")
					return true
				}
				for (const { periodGroup } of val) {
					const search = await payload.find({
						collection: "timetable",
						depth: 2,
						where: {
							and: [
								{ "subject.id": { not_equals: options.data.subject } },
								{ "periods.periodGroup.day": { equals: periodGroup.day } },
								{ "periods.periodGroup.session": { equals: periodGroup.session } },
								{ or: periodGroup.period.map(e => ({ "periods.periodGroup.period": { contains: e } })) },
							],
						},
					})

					if (search.docs.filter(({ periods }) => {
						return periods.filter(({ periodGroup: foundGroup }) =>
							foundGroup.day === periodGroup.day && foundGroup.session === periodGroup.session
							&& periodGroup.period.some(e => foundGroup.period.includes(e))
						).length > 0
					}).length > 0) {
						return "Some periods are already occupied by other subjects"
					}
				}
				return true as const
			},
		} as PeriodsField,
	],
}

export default Timetable
