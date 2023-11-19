"use client"

import { BookA, BookCheck, CalendarDays, School } from "lucide-react"
import { usePathname } from "next/navigation"
import SidebarTab from "./sidebarTab"

const Sidebar = () => {
	const pathname = usePathname()

	return (
		<nav className="w-full sm:w-auto sm:h-full bg-slate-900 order-last sm:order-first">
			<ul className="flex flex-row sm:flex-col gap-1 sm:gap-2 p-1 sm:p-2">
				<SidebarTab text="Homework" Icon={BookA} href="/app/homework" active={pathname === "/app/homework"} />
				<SidebarTab text="Exams" Icon={BookCheck} href="/app/exams" active={pathname === "/app/exams"} />
				<SidebarTab text="Activities" Icon={School} href="/app/activities" active={pathname === "/app/activities"} />
				<SidebarTab text="Timetable" Icon={CalendarDays} href="/app/timetable" active={pathname === "/app/timetable"} />
			</ul>
		</nav>
	)
}

export default Sidebar
