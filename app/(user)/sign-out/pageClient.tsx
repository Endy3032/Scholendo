"use client"

import { useRouter } from "next/navigation"
import { signOut } from "../_utils"
import styles from "../styles.module.css"

const SignOut = () => {
	const router = useRouter()

	signOut().then(() => setTimeout(() => router.push("/auth"), 500))

	return (
		<div className={styles.container}>
			<h1 className={styles.authMessage}>Signing out...</h1>
		</div>
	)
}

export default SignOut
