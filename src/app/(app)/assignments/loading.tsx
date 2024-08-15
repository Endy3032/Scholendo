import styles from "@/components/common/scrollFader.module.css"
import { cn, rand } from "@/lib/utils"
import { Fragment } from "react"

export default function Loading() {
	const random = [...Array(rand(1, 3))].map(() => rand(1, 3))
	let sidebarDelayIndex = 0, contentDelayIndex = 0

	return (
		<>
			<aside className="relative flex">
				<div className={cn("flex flex-col gap-4 sm:overflow-y-auto", styles.scrollFader)}>
					{random.map((v, i) => (
						<div key={i} className="flex flex-col gap-1">
							<div className="mb-1 ms-2 h-5 w-24 animate-pulse rounded bg-neutral" style={{
								animationDelay: (sidebarDelayIndex++) * 100 + "ms",
							}} />
							{[...Array(v)].map((_, i) => (
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
					{random.map((v, i) => (
						<Fragment key={i}>
							<span>Day</span>
							{[...Array(v)].map((_, i) => (
								<article key={i} className="flex flex-col gap-1 rounded-md bg-gray-700/25 p-2">
									<div className="mb-1 h-6 animate-pulse rounded bg-neutral" style={{
										width: `clamp(0%, ${rand(8, 30)}rem, 100%)`,
										animationDelay: (contentDelayIndex++) * 50 + "ms",
									}} />
									{[...Array(v)].map((_, i) => (
										<div key={i} className="h-4 animate-pulse rounded bg-neutral" style={{
											width: `clamp(0%, ${rand(4, 60)}rem, 100%)`,
											animationDelay: (contentDelayIndex++) * 50 + "ms",
										}} />
									))}
								</article>
							))}
						</Fragment>
					))}
				</div>
			</section>
		</>
	)
}
