"use server"

import config from "@payload-config"
import { getPayload } from "payload"

export const getAssignments = async () => {
	const payload = await getPayload({ config })
	const assignments = await payload.find({ collection: "assignments", limit: 100 })
	return assignments
}
