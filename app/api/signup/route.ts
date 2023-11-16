import { NextRequest, NextResponse } from "next/server"
import { PaginatedDocs } from "payload/database"
import { Options } from "payload/dist/collections/operations/local/create"
import { User } from "payload/generated-types"
import qs from "qs"

export async function POST(request: NextRequest) {
	const { name, email, password } = await request.json() as Options<"users">["data"]

	console.log(name, email, password)

	const searchQuery = qs.stringify({ where: { email: { equals: email } } })
	const searchResult = await fetch(`http://localhost:3000/api/users?${searchQuery}`)
	const { data: search } = await searchResult.json() as { data: PaginatedDocs<User> }

	return NextResponse.json(search)
}
