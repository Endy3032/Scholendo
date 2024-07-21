import { cn } from "@/lib/utils"
import "./globals.css"
import { Sidebar } from "@/components/common/sidebar"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn(
				inter.className,
				"flex h-dvh max-h-dvh min-h-dvh flex-col gap-2 overflow-y-hidden transition-colors sm:flex-row sm:py-0",
				"bg-gray-100 px-2 py-2 text-gray-900 dark:bg-gray-900 dark:text-gray-100",
			)}>
				<Sidebar />
				<main className="flex max-h-dvh flex-1 flex-col overflow-y-auto rounded-md bg-gray-200 px-3 py-2 shadow-md shadow-gray-500/50 transition-colors sm:my-2 dark:bg-gray-800 dark:shadow-gray-950/75">
					{children}
				</main>
			</body>
		</html>
	)
}
