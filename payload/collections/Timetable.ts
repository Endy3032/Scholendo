import type { CollectionConfig } from "payload/types"

const Timetable: CollectionConfig = {
	slug: "timetable",
	fields: [
		{
			name: "subject",
			type: "relationship",
			relationTo: "subjects",
		},
		{
			name: "day",
			type: "select",
			options: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		},
		{
			name: "session",
			type: "select",
			options: ["Morning", "Afternoon"],
		},
		{
			name: "period",
			type: "select",
			options: ["1", "2", "3", "4", "5"],
		},
	],
}

export default Timetable
