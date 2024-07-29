"use client"

import styles from "@/components/common/scrollFader.module.css"
import { Calendar } from "@/components/ui/calendar"
import { useScrollspy } from "@/hooks/scrollspy"
import { cn } from "@/lib/utils"
import { Assignment } from "@payload-types"
import { useEffect, useRef, useState } from "react"

export const Assignments = ({ assignments }: { assignments: Assignment[] }) => {
	const [data] = useState<Assignment[]>(assignments)
	const container = useRef<HTMLDivElement>(null)
	const [elements, setElements] = useState<Element[]>([])
	const intersectingIds = useScrollspy(elements, { offset: 24, root: container.current || undefined })

	setTimeout(() => {}, 1000)

	useEffect(() => setElements([...(container.current?.children || [])]), [])

	return (
		<>
			<aside className="relative flex">
				<div className={cn("flex flex-col gap-4 sm:overflow-y-auto", styles.scrollFader)}>
					<Calendar mode="single" className="rounded-md border border-neutral p-2" />
					{
						/* <div className="flex flex-col gap-2">
						<h3 className="ms-2">Today</h3>
						<div className="flex flex-col gap-1">
							<span className="rounded-md bg-gray-700 px-2 py-1">[jumplink] Maths - BTVN - 09:00</span>
							<span className="rounded-md bg-gray-700/40 px-2 py-1">[jumplink] Lite - HS1 - 11:00</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="ms-2">Next 3 days</h3>
						<div className="flex flex-col gap-1">
							<span className="rounded-md bg-gray-700/40 px-2 py-1">[jumplink] Placeholder - 09:00</span>
							<span className="rounded-md bg-gray-700/40 px-2 py-1">[jumplink] Placeholder - 11:00</span>
							<span className="rounded-md bg-gray-700/40 px-2 py-1">[jumplink] Placeholder - 13:00</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="ms-2">Next 5 days</h3>
						<div className="flex flex-col gap-1">
							<span className="rounded-md bg-gray-700/40 px-2 py-1">[jumplink] Lorem ipsum - 09:00</span>
							<span className="rounded-md bg-gray-700/40 px-2 py-1">[jumplink] Dolor sit - 11:00</span>
							<span className="rounded-md bg-gray-700/40 px-2 py-1">[jumplink] Amet - 13:00</span>
						</div>
					</div> */
					}
					<div className="flex flex-col gap-1">
						{data.map(assignment => (
							<a key={assignment.id} href={`#${assignment.id}`} className={cn(
								"rounded-md bg-gray-700/40 px-2 py-1 transition",
								intersectingIds.includes(assignment.id) && "bg-gray-700",
							)}>
								{assignment.name}
							</a>
						))}
					</div>
				</div>
			</aside>
			<section className="relative flex flex-1">
				<div ref={container} className={cn("flex flex-1 flex-col gap-1 sm:gap-2 sm:overflow-y-auto", styles.scrollFader)}>
					{data.map(assignment => (
						<article key={assignment.id} id={assignment.id} className="scroll-mt-6 rounded-md bg-gray-700/25 px-2 py-1">
							<h2>{assignment.name}</h2>
							<div dangerouslySetInnerHTML={{ __html: assignment.formattedDetails ?? "" }} />
							<span>
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita nesciunt deserunt, excepturi blanditiis hic veniam,
								eius in pariatur adipisci et atque amet aliquid debitis odio corrupti modi! Culpa cupiditate, dolores facere magni
								minima natus asperiores, impedit, accusantium eligendi necessitatibus in perferendis hic. Ab fugit nemo dignissimos
								facere cupiditate aspernatur, excepturi eveniet modi eius necessitatibus sed, minima minus sapiente! Vitae dolorum eum
								qui perspiciatis deleniti reprehenderit obcaecati dicta alias nobis voluptas quo numquam quaerat quia soluta dolore,
								fugit distinctio ex? Adipisci, suscipit. Iste dicta veritatis voluptates architecto id impedit iure eligendi veniam
								tenetur. Dolor amet omnis nostrum, error consequatur quasi asperiores beatae ipsum, voluptatem accusantium, atque ex
								facilis dolorem dolores suscipit illum alias aut et dolore placeat repellendus totam. Ratione fugiat placeat adipisci.
								Doloremque inventore rem in unde soluta, dolor molestiae! Tenetur sed ducimus debitis maxime, perspiciatis voluptatum
								esse porro deserunt necessitatibus nam maiores odio iure ratione modi tempore. Cumque hic blanditiis ex doloremque
								asperiores ullam omnis esse reprehenderit, enim consequatur culpa architecto neque quibusdam non. Libero laboriosam qui
								eveniet consequuntur aspernatur consequatur perspiciatis architecto quis adipisci voluptatum sint pariatur praesentium,
								iusto atque autem. Dolor doloribus recusandae omnis optio exercitationem deserunt at amet autem facere perferendis
								porro, doloremque tempora maiores. Minima.
							</span>
						</article>
					))}
				</div>
			</section>
		</>
	)
}
