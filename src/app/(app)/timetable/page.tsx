import { Separator } from "@/components/ui/separator"
import config from "@payload-config"
import { inspect } from "node:util"
import { getPayload } from "payload"

export const dynamic = "force-dynamic"

export default async function Page() {
	const payload = await getPayload({ config })
	const timetable = await payload.find({
		collection: "timetable",
		limit: 1,
		sort: "-applicationDate",
	})

	return (
		<div className="flex h-full flex-1 flex-col gap-4">
			<div className="top-0">
				<h1 className="mx-2 mb-1 text-center sm:text-left">Timetable</h1>
				<Separator />
			</div>
			<div className="flex flex-1 flex-col gap-2">
				<pre>
					{inspect(timetable.docs[0], false, Infinity, false)}
				</pre>
				<span className="mt-auto">:)</span>
			</div>
		</div>
	)
}
