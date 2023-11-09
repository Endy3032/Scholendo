import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import getPayloadClient from "payload/client"
import { PaginatedDocs } from "payload/database"
import { Options } from "payload/dist/collections/operations/local/create"
import { User } from "payload/generated-types"

export async function POST(request: NextRequest) {
	const payload = await getPayloadClient()
	const { name, email, password } = await request.json() as Options<"users">["data"]

	let search: PaginatedDocs<User>

	search = await payload.find({
		collection: "users",
		where: { email: { equals: email } },
	})

	if (search.totalDocs > 0) {
		return NextResponse.json({
			field: "email",
			message: "The email address is already in use by another account",
		}, {
			status: 409,
			statusText: "Email address already in use",
		})
	}

	const user = await payload.create({
		collection: "users",
		data: {
			name,
			email,
			password,
			roles: ["student"],
			verified: false,
			verificationToken: crypto.randomBytes(32).toString("hex"),
		},
	})

	return NextResponse.json({ name: user.name, id: user.id })
}
