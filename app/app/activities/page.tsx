import { Skeleton } from "components/ui/skeleton"
import { BarChartBig, Book, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
import InfoBadge from "../_components/infoBadge"
import ListItem from "../_components/listItem"
import Loading from "../_components/listLoading"

export const dynamic = "force-dynamic"

const Activities = async () => {
	const payload = await getPayloadClient()

	const activities = await payload.find({
		collection: "activities",
		limit: 10,
		pagination: true,
		sort: "date",
	})

	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-semibold text-4xl">Activities</h1>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-1 text-2xl">
					<BarChartBig />
					Statistics
				</span>
				<div className="flex flex-wrap gap-3 text-muted-foreground mb-1">
					<InfoBadge Icon={Book}
						content={`${activities.docs.length} remaining activit${activities.docs.length > 1 && "ies" || "y"}`} />
					<InfoBadge
						Icon={CalendarClock}
						content={`${
							activities.docs.filter(a => (new Date(a.date).getTime() - new Date().getTime()) / 86400000 < 7).length
						} this week`}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<Suspense fallback={
					<Loading>
						<InfoBadge Icon={CalendarClock} content={<Skeleton className="w-20 h-4" />} />
					</Loading>
				}>
					{activities.docs.map(a => {
						return (
							<ListItem value={a.id} key={a.id} title={a.name} content={a.info} participants={a.participants}>
								<InfoBadge Icon={CalendarClock} content={new Date(a.date).toLocaleDateString("vi-VN")} />
							</ListItem>
						)
					})}
				</Suspense>
			</div>
		</div>
	)
}

export default Activities
