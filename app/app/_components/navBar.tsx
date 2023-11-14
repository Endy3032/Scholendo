"use client"

import { BookA, BookCheck, CalendarDays, School } from "lucide-react"
import { usePathname } from "next/navigation"
import { NavTab } from "./navTab"

const NavBar = () => {
	const pathname = usePathname()

	return (
		<nav className="max-w-[5rem] h-full bg-slate-900">
			<ul className="flex flex-col gap-2 p-2">
				<NavTab text="Homework" Icon={BookA} href="/app/homework" active={pathname === "/app/homework"} />
				<NavTab text="Exams" Icon={BookCheck} href="/app/exams" active={pathname === "/app/exams"} />
				<NavTab text="Activities" Icon={School} href="/app/activities" active={pathname === "/app/activities"} />
				<NavTab text="Timetable" Icon={CalendarDays} href="/app/timetable" active={pathname === "/app/timetable"} />
			</ul>
		</nav>
	)
}

export default NavBar
