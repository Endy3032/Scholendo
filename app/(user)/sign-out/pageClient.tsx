"use client"

import { useAuth } from "/hooks/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "../styles.module.css"

const SignOut = () => {
	const router = useRouter()
	const { isSignedIn, isLoading } = useAuth()
	const [isSignedOut, setIsSignedOut] = useState(false)

	useEffect(() => {
		async function logout() {
			try {
				fetch(`/api/users/logout`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}).then(() => setIsSignedOut(true))
			} catch (e) {
				console.error(e)
			}
		}
		if (!isLoading) isSignedIn ? logout() : setIsSignedOut(true)
	}, [isSignedIn, isLoading, isSignedOut])

	if (isSignedOut) setTimeout(() => router.push("/auth"), 500)
	return (
		<div className={styles.container}>
			<h1 className={styles.authMessage}>Signing out...</h1>
		</div>
	)
}

export default SignOut
