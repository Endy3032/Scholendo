import { cn } from "@/lib/utils"
import "./globals.css"
import { Sidebar } from "@/components/common/sidebar"
import { Manrope } from "next/font/google"

const font = Manrope({ subsets: ["latin"] })

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn(font.className, "bg-bgDark text-white transition sm:px-2")}>
				<div className="flex max-h-dvh min-h-dvh flex-col sm:flex-row sm:gap-2">
					<Sidebar />
					<main className={cn(
						"flex flex-1 flex-col p-3 shadow-black/80 transition",
						"sm:my-2 sm:max-h-dvh sm:overflow-y-auto sm:rounded-md sm:bg-fgDark sm:p-2 sm:shadow-md",
					)}>
						{children}
					</main>
				</div>
			</body>
		</html>
	)
}
