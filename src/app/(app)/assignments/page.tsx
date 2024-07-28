import styles from "@/components/common/scrollFader.module.css"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"
import { cn, rand } from "@/lib/utils"
import config from "@payload-config"
import { getPayload } from "payload"
import { Suspense } from "react"
import { Assignments } from "./client"

export default async function Page() {
	const payload = await getPayload({ config })
	const assignments = await payload.find({ collection: "assignments", limit: 100 })

	return (
		<div className="flex h-full flex-1 flex-col gap-4">
			<div className="top-0">
				<h1 className="mb-1 text-center sm:text-left">Assignments</h1>
				<Separator />
			</div>
			<div className="flex flex-1 flex-col gap-4 overflow-hidden sm:flex-row">
				<Suspense fallback={<Loading />}>
					{new Promise(r => setTimeout(r, 2000)).then(() => <Assignments assignments={assignments.docs} />)}
				</Suspense>
			</div>
		</div>
	)
}

const Loading = () => {
	let sidebarDelayIndex = 0, contentDelayIndex = 0

	return (
		<>
			<aside className="relative flex">
				<div className={cn("flex flex-col gap-4 sm:overflow-y-auto", styles.scrollFader)}>
					<Calendar mode="single" className="rounded-md border border-neutral p-2" />
					{[...Array(rand(1, 3))].map((_, i) => (
						<div key={i} className="flex flex-col gap-1">
							<div className="mb-1 ms-2 h-5 w-24 animate-pulse rounded bg-neutral" style={{
								animationDelay: (sidebarDelayIndex++) * 100 + "ms",
							}} />
							{[...Array(rand(1, 3))].map((_, i) => (
								<div key={i} className="h-8 animate-pulse rounded-md bg-neutral" style={{
									animationDelay: (sidebarDelayIndex++) * 100 + "ms",
								}} />
							))}
						</div>
					))}
				</div>
			</aside>
			<section className="relative flex flex-1">
				<div className={cn("flex flex-1 flex-col gap-1 sm:gap-2 sm:overflow-y-auto", styles.scrollFader)}>
					{[...Array(5)].map((_, i) => (
						<article key={i} className="flex flex-col gap-1 rounded-md bg-gray-700/25 p-2">
							<div className="mb-1 h-6 animate-pulse rounded bg-neutral" style={{
								width: `clamp(0%, ${rand(8, 30)}rem, 100%)`,
								animationDelay: (contentDelayIndex++) * 50 + "ms",
							}} />
							{[...Array(rand(2, 8))].map((_, i) => (
								<div key={i} className="h-4 animate-pulse rounded bg-neutral" style={{
									width: `clamp(0%, ${rand(4, 60)}rem, 100%)`,
									animationDelay: (contentDelayIndex++) * 50 + "ms",
								}} />
							))}
						</article>
					))}
				</div>
			</section>
		</>
	)
}
