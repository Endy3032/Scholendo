import { useEffect, useState } from "react"

export function useAuth() {
	const [isSignedIn, setSignedIn] = useState(false)
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		fetch("/api/users/me")
			.then(r => r.json())
			.then(data => {
				if (data.user) setSignedIn(true)
				setLoading(false)
			})
	}, [])

	return { isSignedIn, isLoading }
}
