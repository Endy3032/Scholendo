import styles from "@/components/common/scrollFader.module.css"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import config from "@payload-config"
import { getPayload } from "payload"

export default async function Page() {
	const payload = await getPayload({ config })
	const assignments = await payload.find({ collection: "assignments" })

	return (
		<div className="flex h-full flex-1 flex-col gap-4">
			<div className="top-0">
				<h1 className="mb-1 text-center sm:text-left">Assignments</h1>
				<Separator />
			</div>
			<div className="flex flex-1 flex-col gap-4 overflow-hidden sm:flex-row">
				<aside className="relative flex">
					<div className={cn("flex flex-col gap-4 sm:overflow-y-auto", styles.scrollFader)}>
						<Calendar mode="single" className="rounded-md border border-neutral p-2" />
						<div className="flex flex-col gap-2">
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
						</div>
					</div>
				</aside>
				<section className="relative flex flex-1">
					<div className={cn("flex flex-1 flex-col gap-1 sm:gap-2 sm:overflow-y-auto", styles.scrollFader)}>
						{assignments.docs.map(assignment => (
							<article key={assignment.id} className="rounded-md bg-gray-700/25 px-2 py-1">
								<h2>{assignment.name}</h2>
								<div dangerouslySetInnerHTML={{ __html: assignment.formattedDetails ?? "" }} />
							</article>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
