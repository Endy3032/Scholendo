import { cn } from "@/lib/utils"
import "./globals.css"
import { Sidebar } from "@/components/common/sidebar"
import { Manrope } from "next/font/google"

const font = Manrope({ subsets: ["latin"] })

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn(
				font.className,
				"flex max-h-dvh min-h-dvh flex-col sm:flex-row sm:gap-2 sm:px-2 sm:py-0",
				"bg-bgDark text-white transition",
			)}>
				<Sidebar />
				<main className={cn(
					"flex-1 transition sm:flex sm:max-h-dvh sm:flex-col sm:overflow-y-auto sm:rounded-md",
					"p-3 sm:m-0 sm:my-2 sm:p-2",
					"bg-bgDark sm:bg-fgDark",
					"shadow-fgDark/75 outline-none ring-neutral sm:shadow-md sm:focus:ring-1",
				)}>
					{children}
				</main>
			</body>
		</html>
	)
}
