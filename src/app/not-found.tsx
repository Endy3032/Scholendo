import { Frown } from "lucide-react"

export default function NotFound() {
	return (
		<div className="flex h-full w-full flex-1 select-none flex-col items-center justify-center gap-2">
			<Frown size={96} className="text-gray-500" />
			<div className="flex h-max items-center justify-center gap-3">
				<h1>404</h1>
				<span className="text-gray-500">│</span>
				<h2 className="text-balance text-center">Page not found</h2>
			</div>
		</div>
	)
}
