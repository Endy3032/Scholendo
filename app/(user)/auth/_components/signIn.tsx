"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "components/ui/button"
import { Dialog, DialogTrigger } from "components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useAlert } from "hooks/alert"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { signIn } from "../../_utils"
import styles from "../../styles.module.css"
import ForgotPassword from "./forgotPassword"

const formSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
})

const SignIn = () => {
	const [loading, setLoading] = useState(false)
	const { addAlert } = useAlert()
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true)
		try {
			const result = await signIn(values.email, values.password)

			addAlert(`Welcome back, ${result.user.name}! Redirecting to dashboard...`)
			setTimeout(() => router.push("/"), 2000)
		} catch (e) {
			if (e.message.includes("email or password")) {
				form.setError("email", { type: "validate", message: e.message })
				form.setError("password", { type: "validate", message: e.message })
			} else addAlert(e.message, "error")
		}
		setLoading(false)
	}

	return (
		<Dialog>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
					<FormField control={form.control} name="email" render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="icyalmond@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />
					<FormField control={form.control} name="password" render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="••••••••" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />
					<DialogTrigger asChild>
						<div className="space-y-2">
							<button type="button" className={styles.formAction}>Forgot password?</button>
						</div>
					</DialogTrigger>
					<Button type="submit" disabled={loading}>
						{loading ? <Loader2 className="h-full animate-spin -ml-1 mr-2" /> : null}
						Sign in
					</Button>
				</form>
			</Form>
			<ForgotPassword />
		</Dialog>
	)
}

export default SignIn
