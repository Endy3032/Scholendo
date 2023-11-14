import { Book, BookCheck, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
import Loading from "./loading"

const Homework = async () => {
	const payload = await getPayloadClient()

	const homework = await payload.find({
		collection: "homework",
		limit: 10,
		pagination: true,
		sort: "deadline",
	})

	return (
		<>
			<h1 className="font-semibold text-4xl">Homework</h1>
			<div className="flex flex-col gap-4 my-4">
				<Suspense fallback={<Loading />}>
					{homework.docs.map(hw => {
						return (
							<div key={hw.id} className="flex flex-col gap-2 bg-slate-900 p-4 rounded-md">
								<h1 className="font-medium">{hw.name}</h1>
								<div className="flex flex-wrap gap-3 text-muted-foreground mb-1 text-sm">
									<span className="flex gap-1">
										<Book className="w-5 h-5" />
										{typeof hw.subject == "string" ? hw.subject : hw.subject?.name}
									</span>
									<span className="flex gap-1">
										<BookCheck className="w-5 h-5" />
										{hw.type}
									</span>
									<span className="flex gap-1">
										<CalendarClock className="w-5 h-5" />
										{new Date(hw.deadline).toLocaleDateString("vi-VN")}
									</span>
								</div>
								{hw.description
									? (
										<div>
											<h2>Nội dung</h2>
											<p className="whitespace-pre-wrap">{hw.description}</p>
										</div>
									)
									: undefined}
								{hw.notes
									? (
										<div>
											<h2>
												<i>Ghi chú</i>
											</h2>
											<p className="whitespace-pre-wrap">{hw.notes}</p>
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

export default Homework
