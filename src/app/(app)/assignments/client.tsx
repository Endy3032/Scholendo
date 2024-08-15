"use client"

import styles from "@/components/common/scrollFader.module.css"
import { useScrollspy } from "@/hooks/scrollspy"
import { cn } from "@/lib/utils"
import { Assignment } from "@payload-types"
import { Fragment, useEffect, useMemo, useRef, useState } from "react"

const getDate = (date: Date | string | number) => new Date(date).setHours(0, 0, 0, 0)

type RelativeDate = "Today" | "Tomorrow" | "This Week" | "Future" | undefined
type RelativeLabels = Record<string, { label?: RelativeDate; count?: number; date?: string } | undefined>

const getRelativeLabels = (assignments: Assignment[]) => {
	const output: RelativeLabels = {}

	const today = getDate(new Date())
	let relativeId = assignments[0].id, relativeDate: RelativeDate, deadlineRelativeDate: RelativeDate
	let dateId = assignments[0].id, date: string | undefined, deadlineDate: string | undefined

	for (const assignment of assignments) {
		const deadline = getDate(assignment.deadline)
		const diffDays = Math.ceil((deadline - today) / 86400_000)

		const dlDay = new Date(deadline).getDay()
		const todayDay = new Date(today).getDay()

		if (diffDays < 1) deadlineRelativeDate = "Today"
		else if (diffDays < 2) deadlineRelativeDate = "Tomorrow"
		else if (diffDays < 7 && (dlDay > todayDay || dlDay === 0)) deadlineRelativeDate = "This Week"
		else deadlineRelativeDate = "Future"

		if (deadlineRelativeDate !== relativeDate) {
			relativeDate = deadlineRelativeDate
			relativeId = assignment.id
			output[relativeId] = { label: deadlineRelativeDate, count: 1 }
		} else output[relativeId]!.count!++

		if (!["This Week", "Future"].includes(deadlineRelativeDate)) continue

		deadlineDate = new Date(deadline).toLocaleString("en-US", { month: "short", day: "numeric" })

		if (deadlineDate !== date) {
			dateId = assignment.id
			date = new Date(deadline).toLocaleString(
				"en-US",
				relativeDate === "This Week" ? { weekday: "short" } : { month: "short", day: "numeric" },
			)

			output[dateId] = { ...output[dateId], date }
		}
	}

	console.log(output)
	return output
}

export const Assignments = ({ assignments }: { assignments: Assignment[] }) => {
	const [data, _setData] = useState<Assignment[]>(assignments)
	const relativeDateLabels = useMemo<RelativeLabels>(() => getRelativeLabels(data), [data])

	const container = useRef<HTMLDivElement>(null)
	const [elements, setElements] = useState<Element[]>([])
	const intersectingIds = useScrollspy(elements, { offset: 24, root: container.current || undefined })

	useEffect(() => setElements([...(container.current?.children || [])]), [])

	return (
		<>
			<aside className="relative flex min-w-52">
				<div className={cn("flex flex-1 flex-col gap-1 p-px sm:overflow-y-auto", styles.scrollFader)}>
					<div className="flex flex-col gap-1">
						{data.map(assignment => {
							const labels = relativeDateLabels[assignment.id]

							return (
								<Fragment key={assignment.id}>
									{labels?.label && (
										<div className="mx-2 mt-4 flex items-center justify-between first-of-type:mt-0">
											<span className="font-semibold">{labels.label}</span>
											<span className="select-none text-xs text-neutral">{labels.count}</span>
										</div>
									)}
									{labels?.date && <span className="ms-2 mt-1 select-none text-xs font-medium text-neutral">{labels.date}</span>}
									<a href={`#${assignment.id}`} className={cn(
										"rounded-md bg-gray-700/40 px-2 py-1 outline-none transition focus-visible:ring-1 focus-visible:ring-neutral",
										intersectingIds.includes(assignment.id) && "sm:bg-gray-700",
									)}>
										{assignment.name}
									</a>
								</Fragment>
							)
						})}
					</div>
				</div>
			</aside>
			<section className="relative flex flex-1 p-px">
				<div tabIndex={0} ref={container} className={cn(
					"flex flex-1 flex-col gap-1 rounded-md outline-none transition focus-visible:ring-1 focus-visible:ring-neutral sm:gap-2 sm:overflow-y-auto",
					styles.scrollFader,
				)}>
					{data.map(assignment => (
						<article key={assignment.id} id={assignment.id} className="scroll-mt-6 rounded-md bg-gray-700/25 px-2 py-1">
							<h2>{assignment.name}</h2>
							<div className="flex gap-2">
								{assignment.subject.toString()}
							</div>
							<div dangerouslySetInnerHTML={{ __html: assignment.formattedDetails ?? "" }} />
						</article>
					))}
				</div>
			</section>
		</>
	)
}
