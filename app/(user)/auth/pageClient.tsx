"use client"

import { Alert, AlertDescription, AlertTitle } from "components/ui/alert"
import { Button } from "components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import { useAlert } from "hooks/alert"
import { useAuth } from "hooks/auth"
import { AlertCircle, UserCheck2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import styles from "../styles.module.css"
import SignIn from "./_components/signIn"
import SignUp from "./_components/signUp"
import { useTab } from "./tabContext"

const Auth = () => {
	const router = useRouter()
	const { isSignedIn, isLoading } = useAuth()
	const { alerts, removeAlert } = useAlert()
	const { tab, setTab } = useTab()

	if (isSignedIn && !isLoading) {
		setTimeout(() => router.push("/"), 500)
		return (
			<div className={styles.container}>
				<h1 className={styles.authMessage}>You are already signed in. Redirecting to dashboard...</h1>
			</div>
		)
	}

	return (
		<>
			<div className={styles.container}>
				<h1 className="text-center font-semibold">CTin2225 Study Hub</h1>
				<Tabs defaultValue="signin" value={tab} onValueChange={value => setTab(value)} className="max-w-[30rem] w-full mx-4">
					<TabsList className="grid grid-cols-2 w-full">
						<TabsTrigger value="signup">Sign Up</TabsTrigger>
						<TabsTrigger value="signin">Sign In</TabsTrigger>
					</TabsList>
					<TabsContent value="signup">
						<Card>
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
			</div>
			<div className="fixed top-0 right-0 p-6 m-0 max-w-sm flex flex-col items-end gap-4 overflow-auto max-h-screen">
				{alerts.slice().reverse().map(e => (
					<Alert
						className={`flex flex-row gap-2 max-w-max backdrop-blur-sm bg-opacity-30 ${
							e.type === "error" ? "bg-red-950" : "bg-slate-800"
						}`}
						variant={e.type === "error" ? "destructive" : "default"}
						key={e.id}
					>
						<div className="content flex-1">
							<AlertTitle>
								<div className="flex flex-row gap-2">
									{e.type === "error"
										? (
											<div>
												<AlertCircle className="absolute h-4 w-4 animate-[ping_1.5s_ease-out_infinite]" />
												<AlertCircle className="h-4 w-4" />
											</div>
										)
										: <UserCheck2 className="h-4 w-4" />}
									{e.type === "error" ? "Error" : "Success"}
								</div>
							</AlertTitle>
							<AlertDescription className="">{e.message}</AlertDescription>
						</div>
						<div className="flex items-center">
							<Button className="p-1 w-8 h-8" variant="ghost" onClick={() => removeAlert(e.id)}>
								<X />
							</Button>
						</div>
					</Alert>
				))}
			</div>
		</>
	)
}

export default Auth
