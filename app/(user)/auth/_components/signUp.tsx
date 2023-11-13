"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signUp } from "app/(user)/_utils"
import { Button } from "components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { useAlert } from "hooks/alert"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import styles from "../../styles.module.css"
import { useTab } from "../tabContext"

const formSchema = z.object({
	username: z.string().min(2).max(32),
	name: z.string().min(8).max(32),
	email: z.string().email(),
	password: z.string().min(8),
	confirmPassword: z.string().min(8),
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "Passwords do not match",
			path: ["confirmPassword"],
		})
	}
})

const SignUp = () => {
	const [loading, setLoading] = useState(false)
	const { addAlert } = useAlert()
	const { setTab } = useTab()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			username: "",
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	})
	const { setError } = form

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		setLoading(true)
		try {
			const result = await signUp(values.name, values.username, values.email, values.password)

			if (!result.ok) setError(result.field, { message: result.message })
			else {
				addAlert(`Successfully signed up as ${result.name}!`)
				setTab("signin")
			}
		} catch (e) {
			addAlert(e.message, "error")
		}
		setLoading(false)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<FormField control={form.control} name="username" render={({ field }) => (
					<FormItem>
						<FormLabel>Username</FormLabel>
						<FormControl>
							<Input placeholder="icyalmond" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="name" render={({ field }) => (
					<FormItem>
						<FormLabel>Name</FormLabel>
						<FormControl>
							<Input placeholder="Vũ Gia Bảo" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<FormField control={form.control} name="email" render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>
						<FormControl>
							<Input placeholder="icyalmond@example.com" type="email" {...field} />
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
				<FormField control={form.control} name="confirmPassword" render={({ field }) => (
					<FormItem>
						<FormLabel>Confirm password</FormLabel>
						<FormControl>
							<Input placeholder="••••••••" type="password" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)} />
				<div className="space-y-2">
					<button type="button" onClick={() => setTab("signin")} className={styles.formAction}>
						Already have an account?
					</button>
				</div>
				<Button type="submit" disabled={loading}>
					{loading ? <Loader2 className="h-full animate-spin -ml-1 mr-2" /> : null}
					Sign up
				</Button>
			</form>
		</Form>
	)
}

export default SignUp
