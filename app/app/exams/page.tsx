import { BookCheck, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
import Loading from "./loading"

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
		<>
			<h1 className="font-semibold text-4xl mb-4">Exams</h1>
			<div className="flex flex-col gap-4">
				<Suspense fallback={<Loading />}>
					{exams.docs.map(e => {
						return (
							<div key={e.id} className="flex flex-col gap-2 bg-slate-900 p-4 rounded-md">
								<h1 className="font-medium">{typeof e.subject === "string" ? e.subject : e.subject?.name}</h1>
								<div className="flex flex-wrap gap-3 text-muted-foreground mb-1 text-sm">
									<span className="flex gap-1">
										<BookCheck className="w-5 h-5" />
										{e.type}
									</span>
									<span className="flex gap-1">
										<CalendarClock className="w-5 h-5" />
										{new Date(e.date).toLocaleDateString("vi-VN")}
									</span>
								</div>
								{e.description
									? (
										<div>
											<h2>Nội dung</h2>
											<p className="whitespace-pre-wrap">{e.description}</p>
										</div>
									)
									: undefined}
								{e.notes
									? (
										<div>
											<h2>
												<i>Ghi chú</i>
											</h2>
											<p className="whitespace-pre-wrap">{e.notes}</p>
										</div>
									)
									: undefined}
							</div>
						)
					})}
				</Suspense>
			</div>
		</>
	)
}

export default Exams
