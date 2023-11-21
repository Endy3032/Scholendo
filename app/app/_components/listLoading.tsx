import { Skeleton } from "components/ui/skeleton"
import React from "react"
import ListItem from "./listItem"

export default function Loading({ count, children }: { count?: number; children: React.ReactNode }) {
	return (
		<>
			{[...Array(count || 3)].map((_, i) => (
				<ListItem value={i.toString()} key={i} title={<Skeleton className="w-48 h-7" />}>
					{children}
				</ListItem>
			))}
		</>
	)
}
