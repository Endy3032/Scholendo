"use client"

import Logo from "@/assets/logo.svg"
import { cn } from "@/lib/utils"
import { BookMarked, CalendarDays, LucideIcon, NotebookPen } from "lucide-react"
import { RouteType } from "next/dist/lib/load-custom-routes"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import styles from "./scrollFader.module.css"

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
						"group flex h-full flex-col items-center gap-1 rounded-md p-2 shadow-sidebar-dark/20 transition-all",
						"outline-none focus-visible:ring-1 focus-visible:ring-neutral",
						"hover:bg-sidebar-dark/80 hover:text-light",
						"focus:bg-sidebar-dark/80 focus:text-light",
						"active:bg-sidebar-dark active:text-light",
						"hover:rounded-md focus:rounded-md active:rounded-md",
						active
							? "bg-sidebar-dark"
							: "text-neutral sm:rounded-2xl sm:bg-sidebar-dark/50",
					)}>
						<Icon
							className="aspect-square h-6 w-auto py-0.5 shadow-black/20 drop-shadow-sidebarIcon sm:h-10"
							strokeWidth={1.5}
						/>
						<span className="block select-none text-center text-xs sm:hidden">
							{text}
						</span>
					</Link>
				</div>
			</HoverCardTrigger>
			<HoverCardContent side="right" sideOffset={16} className="pointer-events-none hidden border border-sidebar-light/20 sm:block">
				{text}
			</HoverCardContent>
		</HoverCard>
	)
}

export const Sidebar = () => (
	<nav className={cn(
		"sticky bottom-0 left-0 z-30 order-last max-h-dvh w-full rounded-t-lg p-1 sm:order-first sm:w-auto sm:p-0",
		"backdrop-blur-md backdrop-saturate-200 sm:backdrop-filter-none",
		"bg-fgDark/75 transition-colors sm:bg-transparent",
	)}>
		<div className={cn("h-full sm:-mx-px sm:overflow-y-auto sm:p-px sm:py-2", styles.scrollFader, styles.sidebar)}>
			<div className="flex flex-row gap-1 sm:flex-col sm:gap-2">
				<Tab text="Dashboard" Icon={Logo} href="/" />
				<hr className="mx-2 hidden border-neutral sm:block" />
				<Tab text="Assignments" Icon={BookMarked} href="/assignments" />
				<Tab text="Examinations" Icon={NotebookPen} href="/examinations" />
				<Tab text="Timetable" Icon={CalendarDays} href="/timetable" />
			</div>
		</div>
	</nav>
)
