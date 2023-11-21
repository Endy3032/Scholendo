import { LucideIcon } from "lucide-react"

const InfoBadge = ({ Icon, content }: { Icon: LucideIcon; content: string | React.ReactNode }) => (
	<span className="flex items-center gap-1">
		<Icon size={20} />
		{content}
	</span>
)

export default InfoBadge
