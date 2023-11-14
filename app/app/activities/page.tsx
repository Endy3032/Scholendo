import { Book, BookCheck, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
import Loading from "./loading"

const Activities = async () => {
	const payload = await getPayloadClient()

	const activities = await payload.find({
		collection: "activities",
		limit: 10,
		pagination: true,
		sort: "date",
	})

	return (
		<>
			<h1 className="font-semibold text-4xl">Activities</h1>
			<div className="flex flex-col gap-4 my-4">
				<Suspense fallback={<Loading />}>
					{activities.docs.map(a => {
						return (
							<div key={a.id} className="flex flex-col gap-2 bg-slate-900 p-4 rounded-md">
								<h1 className="font-medium">{a.name}</h1>
								<div className="flex flex-wrap gap-3 text-muted-foreground mb-1 text-sm">
									<span className="flex gap-1">
										<CalendarClock className="w-5 h-5" />
										{new Date(a.date).toLocaleDateString("vi-VN")}
									</span>
								</div>
								{a.info
									? (
										<div>
											<h2>Nội dung</h2>
											<p className="whitespace-pre-wrap">{a.info}</p>
										</div>
									)
									: undefined}
								{a.participants
									? (
										<ul>
											{a.participants.map(p => <li key={typeof p === "string" ? p : p.id}>{typeof p === "string" ? p : p.name}</li>)}
										</ul>
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

export default Activities
