import config from "@payload-config"
import { getPayload } from "payload"
import { Assignments } from "./client"

export const dynamic = "force-dynamic"

export default async function Page() {
	const payload = await getPayload({ config })
	const assignments = await payload.find({
		collection: "assignments",
		limit: 100,
		where: { deadline: { greater_than_equal: new Date().setHours(0, 0, 0, 0) } },
		sort: "deadline",
	})

	return <Assignments assignments={assignments.docs} />
}
