import { Skeleton } from "components/ui/skeleton"
import { BarChartBig, Book, BookCheck, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
import InfoBadge from "../_components/infoBadge"
import ListItem from "../_components/listItem"
import Loading from "../_components/listLoading"

export const dynamic = "force-dynamic"

const ExamsList = async () => {
	const payload = await getPayloadClient()

	const exams = await payload.find({
		collection: "exams",
		limit: 10,
		pagination: true,
		sort: "date",
		where: {
			date: {
				greater_than_equal: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
			},
		},
	})

	const diffs = exams.docs
		.map(e => Math.ceil((new Date(e.date).getTime() - new Date().getTime()) / 86_400_000))
		.filter(d => d >= 0)

	const today = diffs.filter(d => d === 0).length
	const tmr = diffs.filter(d => d === 1).length
	const week = diffs.filter(d => d < 7).length

	return (
		<>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-1 text-2xl">
					<BarChartBig />
					Statistics
				</span>
				<div className="flex flex-wrap gap-4 text-muted-foreground mb-1">
					<InfoBadge Icon={Book} content={`${exams.docs.length} remaining exam${exams.docs.length > 1 && "s"}`} />
					<InfoBadge Icon={CalendarClock} content={`${today} today`} />
					<InfoBadge Icon={CalendarClock} content={`${tmr} tomorrow`} />
					<InfoBadge Icon={CalendarClock} content={`${week} this week`} />
				</div>
			</div>
			<div className="flex flex-col gap-3">
				{exams.docs.length
						&& exams.docs.map(e => {
							const examDate = new Date(e.date)
							const diff = Math.ceil((examDate.getTime() - new Date().getTime()) / 86_400_000)

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
						}) || "No exams left!"}
			</div>
		</>
	)
}

const Exams = async () => (
	<div className="flex flex-col gap-4">
		<h1 className="font-semibold text-4xl">Exams</h1>
		<Suspense fallback={
			<>
				<div className="flex flex-col gap-1">
					<span className="flex items-center gap-1 text-2xl">
						<BarChartBig />
						Statistics
					</span>
					<div className="flex flex-wrap gap-4 text-muted-foreground mb-1">
						<InfoBadge Icon={Book} content={<Skeleton className="w-36 h-4 my-1" />} />
						<InfoBadge Icon={CalendarClock} content={<Skeleton className="w-14 h-4 my-1" />} />
						<InfoBadge Icon={CalendarClock} content={<Skeleton className="w-20 h-4 my-1" />} />
						<InfoBadge Icon={CalendarClock} content={<Skeleton className="w-20 h-4 my-1" />} />
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<Loading>
						<InfoBadge Icon={BookCheck} content={<Skeleton className="w-14 h-4" />} />
						<InfoBadge Icon={CalendarClock} content={<Skeleton className="w-20 h-4" />} />
					</Loading>
				</div>
			</>
		}>
			<ExamsList />
		</Suspense>
	</div>
)

export default Exams
