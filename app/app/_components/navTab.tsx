import { RouteType } from "next/dist/lib/load-custom-routes"
import Link, { LinkProps } from "next/link"
import { ElementType } from "react"

type TabProps = {
	Icon: ElementType
	href: LinkProps<RouteType>["href"]
	text: string
	active?: boolean
}

export const NavTab = ({ Icon, href, text, active }: TabProps) => (
	<li>
		<Link
			className={`text-sm flex flex-col p-3 gap-2 rounded-xl items-center justify-center ${
				active ? "bg-slate-700" : "bg-transparent"
			} hover:bg-slate-800 active:bg-slate-800 transition-colors group`}
			href={href}
		>
			<Icon className="w-8 h-8" />
			<span className="absolute text-left left-20 bg-slate-900 backdrop-blur-sm bg-opacity-75 rounded-md px-3 py-2 transition-all origin-left scale-50 opacity-0 invisible group-hover:visible group-hover:scale-100 group-hover:opacity-100">
				{text}
			</span>
		</Link>
	</li>
)
