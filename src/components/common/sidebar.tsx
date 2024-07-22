"use client"

import Logo from "@/assets/logo.svg"
import { cn } from "@/lib/utils"
import { BookMarked, CalendarDays, LucideIcon, NotebookPen } from "lucide-react"
import { RouteType } from "next/dist/lib/load-custom-routes"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import styles from "./sidebar.module.css"

type TabProps = {
	Icon: LucideIcon
	href: LinkProps<RouteType>["href"]
	text: string
}

const Tab = ({ Icon, href, text }: TabProps) => {
	const pathname = usePathname()
	const active = pathname === href

	return (
		<HoverCard openDelay={0} closeDelay={0}>
			<HoverCardTrigger asChild>
				<div className="flex-1">
					<Link href={href} title={text} className={cn(
						"group flex h-full flex-col items-center gap-1 p-2 transition-all",
						"outline-none focus-visible:ring-1 focus-visible:ring-gray-500",
						"hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-100",
						"focus:bg-gray-300 focus:text-gray-900 dark:focus:bg-gray-700 dark:focus:text-gray-100",
						"active:bg-gray-400 active:text-gray-900 dark:active:bg-gray-600 dark:active:text-gray-100",
						"hover:rounded-md focus-visible:rounded-md active:rounded-md",
						active
							? "rounded-md bg-gray-400/75 dark:bg-gray-600/75"
							: "rounded-md text-gray-500 sm:rounded-2xl sm:bg-gray-300/50 sm:dark:bg-gray-700/50",
					)}>
						<Icon className="aspect-square h-6 w-auto py-0.5 sm:h-10" strokeWidth={1.5} />
						<span className="block select-none text-center text-xs sm:hidden">
							{text}
						</span>
					</Link>
				</div>
			</HoverCardTrigger>
			<HoverCardContent
				side="right"
				sideOffset={16}
				className="hidden border border-gray-600/20 bg-gray-100/75 text-sm shadow-lg backdrop-blur-3xl backdrop-saturate-200 sm:block dark:border-gray-400/20 dark:bg-gray-700/75"
			>
				{text}
			</HoverCardContent>
		</HoverCard>
	)
}

export const Sidebar = () => (
	<nav className="relative order-last max-h-dvh w-full sm:order-first sm:w-auto">
		<div className={cn("h-full sm:overflow-y-auto sm:p-[1px] sm:py-2", styles.sidebar)}>
			<div className="flex flex-row gap-1 sm:flex-col sm:gap-2">
				<Tab text="Dashboard" Icon={Logo} href="/" />
				<hr className="mx-2 hidden border-gray-500 sm:block" />
				<Tab text="Assignments" Icon={BookMarked} href="/assignments" />
				<Tab text="Examinations" Icon={NotebookPen} href="/exams" />
				<Tab text="Timetable" Icon={CalendarDays} href="/timetable" />
			</div>
		</div>
	</nav>
)
