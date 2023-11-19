import { LucideIcon } from "lucide-react"
import { RouteType } from "next/dist/lib/load-custom-routes"
import Link, { LinkProps } from "next/link"

type TabProps = {
	Icon: LucideIcon
	href: LinkProps<RouteType>["href"]
	text: string
	active?: boolean
}

const SidebarTab = ({ Icon, href, text, active }: TabProps) => (
	<li className="flex-1">
		<Link
			className={`text-sm flex flex-col p-1.5 sm:p-2.5 gap-1 rounded-md items-center justify-center ${
				active ? "bg-slate-700" : "bg-transparent"
			} hover:bg-slate-800 active:bg-slate-800 transition-colors group`}
			href={href}
		>
			<Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
			<span className="text-sm sm:absolute sm:text-left sm:left-20 sm:bg-slate-900 sm:backdrop-blur-sm sm:bg-opacity-75 sm:rounded-md sm:px-3 sm:py-2 sm:transition-all sm:origin-left sm:scale-50 sm:opacity-0 sm:invisible sm:group-hover:visible sm:group-hover:scale-100 sm:group-hover:opacity-100">
				{text}
			</span>
		</Link>
	</li>
)

export default SidebarTab
