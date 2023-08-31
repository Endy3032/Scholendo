import type { CollectionConfig } from "payload/types"

const Posts: CollectionConfig = {
	slug: "posts",
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "publishedDate",
			type: "date",
			admin: {
				position: "sidebar",
			},
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			index: true,
			admin: {
				position: "sidebar",
			},
		},
	],
}

export default Posts
