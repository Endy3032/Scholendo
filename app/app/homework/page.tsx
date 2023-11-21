import { Skeleton } from "components/ui/skeleton"
import { BarChartBig, Book, BookCheck, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
import InfoBadge from "../_components/infoBadge"
import ListItem from "../_components/listItem"
import Loading from "../_components/listLoading"

export const dynamic = "force-dynamic"

const Homework = async () => {
	const payload = await getPayloadClient()

	const homework = await payload.find({
		collection: "homework",
		limit: 10,
		pagination: true,
		sort: "deadline",
		where: {
			deadline: {
				greater_than_equal: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
			},
		},
	})

	const diffs = homework.docs
		.map(e => Math.ceil((new Date(e.deadline).getTime() - new Date().getTime()) / 86_400_000))
		.filter(d => d >= 0)

	const tdy = diffs.filter(d => d === 0).length
	const tmr = diffs.filter(d => d === 1).length
	const wk = diffs.filter(d => d < 7).length

	return (
		<div className="flex flex-col gap-4">
			<h2 className="font-semibold text-4xl">Homework</h2>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-1 text-2xl">
					<BarChartBig />
					Statistics
				</span>
				<div className="flex flex-wrap gap-3 text-muted-foreground mb-1">
					<InfoBadge Icon={Book} content={`${homework.docs.length} remaining assignment${homework.docs.length > 1 && "s"}`} />
					<InfoBadge Icon={CalendarClock} content={`${tdy} due today`} />
					<InfoBadge Icon={CalendarClock} content={`${tmr} due tomorrow`} />
					<InfoBadge Icon={CalendarClock} content={`${wk} due this week`} />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Suspense fallback={
					<Loading>
						<InfoBadge Icon={Book} content={<Skeleton className="w-20 h-4" />} />
						<InfoBadge Icon={BookCheck} content={<Skeleton className="w-16 h-4" />} />
						<InfoBadge Icon={CalendarClock} content={<Skeleton className="w-24 h-4" />} />
					</Loading>
				}>
					{homework.docs.length
							&& homework.docs.map(hw => {
								const hwDate = new Date(hw.deadline)
								const diff = Math.ceil((hwDate.getTime() - new Date().getTime()) / 86_400_000)

								return (
									<ListItem key={hw.id} value={hw.id} diff={diff} title={hw.name} content={hw.description} notes={hw.notes}>
										<InfoBadge Icon={Book} content={typeof hw.subject === "string" ? hw.subject : hw.subject?.name} />
										<InfoBadge Icon={BookCheck} content={hw.type} />
										<InfoBadge Icon={CalendarClock} content={hwDate.toLocaleDateString("vi-VN")} />
									</ListItem>
								)
							}) || "No homework left!"}
				</Suspense>
			</div>
		</div>
	)
}

export default Homework
