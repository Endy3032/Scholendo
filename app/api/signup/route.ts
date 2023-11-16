import { NextRequest, NextResponse } from "next/server"
import getPayloadClient from "payload/client"
import { PaginatedDocs } from "payload/database"
import { Options } from "payload/dist/collections/operations/local/create"
import { User } from "payload/generated-types"
import qs from "qs"

export async function POST(request: NextRequest) {
	const payload = await getPayloadClient()
	console.log(payload)
	const { name, email, password } = await request.json() as Options<"users">["data"]

	console.log(name, email, password)

	const searchQuery = qs.stringify({ where: { email: { equals: email } } })
	const searchResult = await fetch(`${process.env.PAYLOAD_CMS_URL}/api/users?${searchQuery}`)
	const data = await searchResult.json()
	console.log(data)

	return NextResponse.json({ ok: true })
}
