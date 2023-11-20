"use server"

import crypto from "crypto"
import { cookies } from "next/headers"
import getPayloadClient from "payload/client"

type SignUpResult = { ok: false; field: "email"; message: string } | { ok: true; name: string; id: string }

export async function signUp(name: string, username: string, email: string, password: string): Promise<SignUpResult> {
	const payload = await getPayloadClient()

	const search = await payload.find({
		collection: "users",
		where: { email: { equals: email } },
	})

	if (search.totalDocs > 0) {
		return {
			ok: false,
			field: "email" as const,
			message: "The email address is already in use by another account",
		}
	}

	const user = await payload.create({
		collection: "users",
		data: {
			name,
			email,
			password,
			roles: ["Student"],
			verified: false,
			verificationToken: crypto.randomBytes(32).toString("hex"),
		},
	})

	return { ok: true, name: user.name, id: user.id }
}

export async function signIn(email: string, password: string) {
	const payload = await getPayloadClient()
	const result = await payload.login({
		collection: "users",
		data: {
			email,
			password,
		},
	})
	if (result.token) cookies().set("payload-token", result.token)
	return result
}

export async function signOut() {
	cookies().set("payload-token", "")
}

export async function forgotPassword(email: string) {
	const payload = await getPayloadClient()
	const result = await payload.forgotPassword({
		collection: "users",
		data: { email },
		expiration: 60 * 10,
	})
	return result
}
