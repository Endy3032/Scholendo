import axios, { AxiosResponse } from "axios"
import crypto from "crypto"
import { payloadApiUrl } from "lib/const"
import { CreateOptions, Optional } from "lib/types"
import { NextRequest, NextResponse } from "next/server"
import { PaginatedDocs } from "payload/database"
import { User } from "payload/generated-types"
import qs from "qs"

interface SignUpResult {
	message: string
	doc: User
}

export async function POST(request: NextRequest) {
	const { name, email, password } = await request.json() as CreateOptions<"users">

	const searchQuery = qs.stringify({ where: { email: { equals: email } } })

	const { data: search } = await axios.get<PaginatedDocs<User>>(`${payloadApiUrl}/users?${searchQuery}`)
	if (search.totalDocs > 0) {
		return NextResponse.json({
			field: "email",
			message: "The email address is already in use by another account",
		}, {
			status: 409,
			statusText: "Email address already in use",
		})
	}

	const { data: user } = await axios.post<SignUpResult, AxiosResponse<SignUpResult>, Optional<User>>(`${payloadApiUrl}/users`, {
		name,
		email,
		password,
		roles: ["student"],
		verified: false,
		verificationToken: crypto.randomBytes(32).toString("hex"),
	})

	return NextResponse.json({ name: user.doc.name, id: user.doc.id })
}
