import { Skeleton } from "components/ui/skeleton"
import { Book, BookCheck, CalendarClock } from "lucide-react"

export default function Loading({ text }: { text: string }) {
	return (
		<>
			<h1 className="font-semibold text-4xl">{text}</h1>
			{[...Array(4)].map((_, i) => (
				<div key={i} className="flex flex-col gap-4 mt-4">
					<div className="flex flex-col gap-2 bg-slate-900 p-4 rounded-md">
						<h1 className="font-medium">
							<Skeleton className="w-48 h-8"></Skeleton>
						</h1>
						<div className="flex flex-wrap gap-3 text-muted-foreground mb-1 text-sm">
							<span className="flex items-center gap-1">
								<Book size={20} />
								<Skeleton className="w-20 h-4"></Skeleton>
							</span>
							<span className="flex items-center gap-1">
								<BookCheck size={20} />
								<Skeleton className="w-16 h-4"></Skeleton>
							</span>
							<span className="flex items-center gap-1">
								<CalendarClock size={20} />
								<Skeleton className="w-24 h-4"></Skeleton>
							</span>
						</div>
						<Skeleton className="w-28 h-7"></Skeleton>
						<Skeleton className="w-80 h-5"></Skeleton>
						<Skeleton className="w-60 h-5"></Skeleton>
					</div>
				</div>
			))}
		</>
	)
}
