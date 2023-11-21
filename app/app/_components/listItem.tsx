import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { cn } from "lib/utils"
import { User } from "payload/generated-types"

const colors = (diff: number) => {
	switch (true) {
		case diff < 3: {
			return {
				bg: "bg-red-900/75 hover:bg-red-800/75 data-[state=open]:bg-red-800/75",
				title: "text-red-100",
				info: "text-red-300",
			}
		}

		case diff < 5: {
			return {
				bg: "bg-yellow-900/75 hover:bg-yellow-800/75 data-[state=open]:bg-yellow-800/75",
				title: "text-yellow-100",
				info: "text-yellow-300",
			}
		}

		case diff < 7: {
			return {
				bg: "bg-blue-900/75 hover:bg-blue-800/75 data-[state=open]:bg-blue-800/75",
				title: "text-blue-100",
				info: "text-blue-300",
			}
		}

		default: {
			return {
				bg: "bg-slate-900 hover:bg-slate-800 data-[state=open]:bg-slate-800",
				title: "text-white",
				info: "text-muted-foreground",
			}
		}
	}
}

type ListItemProps = {
	diff?: number
	value: string
	title: string | React.ReactNode
	content?: string | null | undefined
	notes?: string | null | undefined
	participants?: (string | User)[] | null | undefined
	children?: React.ReactNode
}

const ListItem = ({ diff, value, title, content, notes, participants, children }: ListItemProps) => {
	if (!diff) diff = 7

	if (!content && !notes && !participants) {
		return (
			<div className={cn("p-3 rounded-lg hover:no-underline transition-all", colors(diff).bg)}>
				<div className="flex flex-col gap-2 items-start">
					<h3 className={cn("font-medium text-xl", colors(diff).title)}>
						{title}
					</h3>
					<div className={cn("flex flex-wrap gap-3 mb-1 text-sm decoration-transparent", colors(diff).info)}>
						{children}
					</div>
				</div>
			</div>
		)
	}

	return (
		<Accordion type="single" collapsible>
			<AccordionItem className="border-none" value={value}>
				<AccordionTrigger className={cn("p-3 rounded-lg hover:no-underline", colors(diff).bg)}>
					<div className="flex flex-col gap-2 items-start">
						<h3 className={cn("font-medium text-xl", colors(diff).title)}>
							{title}
						</h3>
						<div className={cn("flex flex-wrap gap-3 mb-1 text-sm decoration-transparent", colors(diff).info)}>
							{children}
						</div>
					</div>
				</AccordionTrigger>
				<AccordionContent className="m-2 p-3 text-base flex flex-col gap-3 rounded-md bg-slate-900">
					{content
						&& (
							<div>
								<h4 className="mb-1 text-xl font-medium">Nội dung</h4>
								<p className="ml-2 whitespace-pre-wrap">{content}</p>
							</div>
						)}
					{notes
						&& (
							<div>
								<h4 className="mb-1 text-xl font-medium">Ghi chú</h4>
								<p className="ml-2 whitespace-pre-wrap">{notes}</p>
							</div>
						)}
					{participants
						&& (
							<div>
								<h4 className="mb-1 text-xl font-medium">Thành viên</h4>
								<ul className="ml-2 list-disc list-inside">
									{participants.map(p => <li key={typeof p === "string" ? p : p.id}>{typeof p === "string" ? p : p.name}</li>)}
								</ul>
							</div>
						)}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}

export default ListItem
