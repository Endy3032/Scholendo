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
				"bg-light text-black transition sm:bg-bgLight dark:bg-bgDark dark:text-white",
			)}>
				<Sidebar />
				<main tabIndex={1} className={cn(
					"flex-1 transition sm:flex sm:max-h-dvh sm:flex-col sm:overflow-y-auto sm:rounded-md",
					"px-3 py-2 sm:m-0 sm:my-2 sm:px-4 sm:py-3",
					"bg-light sm:bg-fgLight dark:bg-bgDark sm:dark:bg-fgDark",
					"shadow-neutral/50 outline-none ring-neutral sm:shadow-md sm:focus:ring-1 dark:shadow-fgDark/75",
				)}>
					{children}
				</main>
			</body>
		</html>
	)
}
