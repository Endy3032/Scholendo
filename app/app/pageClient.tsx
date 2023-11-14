"use client"

import { useRouter } from "next/navigation"

const Page = () => {
	const router = useRouter()
	router.replace("/app/homework")
}

export default Page
