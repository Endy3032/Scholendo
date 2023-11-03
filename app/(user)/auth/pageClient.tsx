"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/auth"
import { useRouter } from "next/navigation"
import SignIn from "./signIn"
import SignUp from "./signUp"

const Auth = () => {
	const router = useRouter()
	const { isSignedIn, isLoading } = useAuth()

	if (isSignedIn && !isLoading) {
		setTimeout(() => router.push("/"), 1000)
		return <h1>You are already signed in. Redirecting to dashboard...</h1>
	}

	return (
		<>
			<h1 className="text-center font-semibold">CTin2225 Study Hub</h1>
			<Tabs defaultValue="signin" className="max-w-[30rem] w-full mx-4">
				<TabsList className="grid grid-cols-2 w-full">
					<TabsTrigger value="signup">Sign Up</TabsTrigger>
					<TabsTrigger value="signin">Sign In</TabsTrigger>
				</TabsList>
				<TabsContent value="signup">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Sign Up</CardTitle>
							<CardDescription>Sign up for a new account</CardDescription>
						</CardHeader>
						<CardContent>
							<SignUp />
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="signin">
					<Card>
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>Sign in to an existing account</CardDescription>
						</CardHeader>
						<CardContent>
							<SignIn />
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</>
	)
}

export default Auth
