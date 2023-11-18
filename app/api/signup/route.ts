import axios from "axios"
import { payloadApiUrl } from "lib/const"
import { NextRequest, NextResponse } from "next/server"
import { PaginatedDocs } from "payload/database"
import { Options } from "payload/dist/collections/operations/local/create"
import { User } from "payload/generated-types"
import qs from "qs"

export async function POST(request: NextRequest) {
	const { name, email, password } = await request.json() as Options<"users">["data"]

	const searchQuery = qs.stringify({ where: { email: { equals: email } } })

	const test = await axios.get(`${payloadApiUrl}/users?${searchQuery}`)
	console.log(test.data)

	const searchResult = await fetch(`${payloadApiUrl}/users?${searchQuery}`)
	const data = await searchResult.text()
	console.log(data)

	return NextResponse.json({ ok: true })
}
