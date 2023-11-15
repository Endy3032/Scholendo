"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
	const router = useRouter()
	useEffect(() => router.replace("/app/homework"), [router])
}

export default Page
