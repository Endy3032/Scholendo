import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { cn } from "lib/utils"
import { BarChartBig, Book, BookCheck, CalendarClock } from "lucide-react"
import getPayloadClient from "payload/client"
import { Suspense } from "react"
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
				greater_than_equal: new Date().toISOString(),
			},
		},
	})

	return (
		<div className="flex flex-col gap-4">
			<h2 className="font-semibold text-4xl">Homework</h2>
			<div className="flex flex-col gap-1">
				<span className="flex items-center gap-1 text-2xl">
					<BarChartBig />
					Statistics
				</span>
				<div className="flex flex-wrap gap-3 text-muted-foreground mb-1">
					<span className="flex items-center gap-1">
						<Book />
						{homework.docs.length} remaining assignment{homework.docs.length > 0 ? "s" : undefined}
					</span>
					<span className="flex items-center gap-1">
						<CalendarClock />
						{homework.docs.filter(hw => hw.deadline === new Date().toISOString()).length} due today
					</span>
					<span className="flex items-center gap-1">
						<CalendarClock />
						{homework.docs.filter(hw => (new Date(hw.deadline).getTime() - new Date().getTime()) / (86400 * 1000) < 7).length}{" "}
						due this week
					</span>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<Suspense fallback={<Loading text="Homework" />}>
					{homework.docs.map(hw => {
						const hwDate = new Date(hw.deadline), date = new Date()
						const diff = Math.ceil((hwDate.getTime() - date.getTime()) / (3600 * 24 * 1000))

						return (
							<Accordion key={hw.id} type="single" collapsible>
								<AccordionItem className="border-none" value={hw.id}>
									<AccordionTrigger
										className={cn(
											"p-3 rounded-lg hover:no-underline",
											diff < 3
												? "bg-red-900/75 hover:bg-red-800/75 data-[state=open]:bg-red-800/75"
												: diff < 5
												? "bg-yellow-900/75 hover:bg-yellow-800/75 data-[state=open]:bg-yellow-800/75"
												: diff < 7
												? "bg-blue-900/75 hover:bg-blue-800/75 data-[state=open]:bg-blue-800/75"
												: "bg-slate-900 hover:bg-slate-800 data-[state=open]:bg-slate-800",
										)}
									>
										<div className="flex flex-col gap-2 items-start">
											<h3 className={cn(
												"font-medium text-xl",
												diff < 3
													? "text-red-100"
													: diff < 5
													? "text-yellow-100"
													: diff < 7
													? "text-blue-100"
													: "text-white",
											)}>
												{hw.name}
											</h3>
											<div
												className={cn(
													"flex flex-wrap gap-3 mb-1 text-sm decoration-transparent",
													diff < 3
														? "text-red-300"
														: diff < 5
														? "text-yellow-300"
														: diff < 7
														? "text-blue-300"
														: "text-muted-foreground",
												)}
											>
												<span className="flex gap-1">
													<Book size={20} />
													{typeof hw.subject === "string" ? hw.subject : hw.subject?.name}
												</span>
												<span className="flex gap-1">
													<BookCheck size={20} />
													{hw.type}
												</span>
												<span className="flex gap-1">
													<CalendarClock size={20} />
													{hwDate.toLocaleDateString("vi-VN")}
												</span>
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent className="m-2 p-3 text-base flex flex-col gap-3 rounded-md bg-slate-900">
										{!hw.description && !hw.notes ? <span className="text-muted-foreground">No content!</span> : undefined}
										{hw.description
											? (
												<div>
													<h4 className="mb-1 text-xl font-medium">Nội dung</h4>
													<p className="ml-2 whitespace-pre-wrap">{hw.description}</p>
												</div>
											)
											: undefined}
										{hw.notes
											? (
												<div>
													<h4 className="mb-1 text-xl font-medium">Ghi chú</h4>
													<p className="ml-2 whitespace-pre-wrap">{hw.notes}</p>
												</div>
											)
											: undefined}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						)
					})}
				</Suspense>
			</div>
		</div>
	)
}

export default Homework
