import { Skeleton } from "components/ui/skeleton"
import { BarChartBig, Book, BookCheck, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
import InfoBadge from "../_components/infoBadge"
import ListItem from "../_components/listItem"
import Loading from "../_components/listLoading"

export const dynamic = "force-dynamic"

const Exams = async () => {
	const payload = await getPayloadClient()

	const exams = await payload.find({
		collection: "exams",
		limit: 10,
		pagination: true,
		sort: "date",
	})

	return (
		<div className="flex flex-col gap-4">
			<h1 className="font-semibold text-4xl">Exams</h1>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-1 text-2xl">
					<BarChartBig />
					Statistics
				</span>
				<div className="flex flex-wrap gap-3 text-muted-foreground mb-1">
					<InfoBadge Icon={Book} content={`${exams.docs.length} remaining exam${exams.docs.length > 1 && "s"}`} />
					<InfoBadge
						Icon={CalendarClock}
						content={`${exams.docs.filter(a => (new Date(a.date).getTime() - new Date().getTime()) / 86400000 < 7).length} this week`}
					/>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<Suspense fallback={
					<Loading>
						<InfoBadge Icon={BookCheck} content={<Skeleton className="w-14 h-4" />} />
						<InfoBadge Icon={CalendarClock} content={<Skeleton className="w-20 h-4" />} />
					</Loading>
				}>
					{exams.docs.map(e => {
						const examDate = new Date(e.date), date = new Date()
						const diff = Math.ceil((examDate.getTime() - date.getTime()) / (3600 * 24 * 1000))

						return (
							<ListItem
								value={e.id}
								title={typeof e.subject === "string" ? e.subject : e.subject?.name}
								key={e.id}
								diff={diff}
								content={e.description}
								notes={e.notes}
							>
								<InfoBadge Icon={BookCheck} content={e.type} />
								<InfoBadge Icon={CalendarClock} content={new Date(e.date).toLocaleDateString("vi-VN")} />
							</ListItem>
						)
					})}
				</Suspense>
			</div>
		</div>
	)
}

export default Exams
