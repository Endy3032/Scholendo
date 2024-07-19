import { cn } from "@/lib/utils"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: {
		template: "%s | CTin2225",
		default: "CTin2225",
	},
}

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body className={cn(
				inter.className,
				"min-h-dvh p-2 gap-2 flex flex-col sm:flex-row bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100",
			)}>
				<main className="dark:bg-gray-800 flex flex-1 flex-col rounded-md bg-gray-200 px-3 py-2">
					{children}
				</main>
			</body>
		</html>
	)
}
