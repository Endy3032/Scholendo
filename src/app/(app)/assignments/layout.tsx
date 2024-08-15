import { Separator } from "@/components/ui/separator"
import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-full flex-1 flex-col gap-4">
			<div className="top-0">
				<h1 className="mx-2 mb-1 text-center sm:text-left">Assignments</h1>
				<Separator />
			</div>
			<div className="flex flex-1 flex-col gap-2 overflow-hidden sm:flex-row">
				{children}
			</div>
		</div>
	)
}
